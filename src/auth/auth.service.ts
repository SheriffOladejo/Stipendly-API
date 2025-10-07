import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { isValidEmail, isEmpty } from 'src/common/utils/validators';
import { randomBytes, randomInt } from 'crypto';
import { addMinutes } from 'date-fns';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import * as jwt from 'jsonwebtoken';
import * as nodemailer from 'nodemailer';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class AuthService {

  constructor(private prisma: PrismaService) { }

  async register(payload: RegisterDto) {

    console.log(payload);

    const email = payload.email;
    const referral_code = payload.referral_code;
    const password = payload.password;
    const first_name = payload.firstname;
    const last_name = payload.lastname;


    if (isEmpty(email) || isEmpty(password)) {
      return {
        code: -1, message: 'Email and password are required'
      };
    }
    else if (!isValidEmail(email)) {
      return {
        code: -1, message: 'Invalid email'
      };
    }
    try {
      const existingUser = await this.prisma.user.findUnique({
        where: { email },
      });

      if (existingUser) {
        return {
          code: -1, message: 'This email has been taken by another user please use another email.',
        };
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const auth_token = randomBytes(32).toString('hex');

      await this.prisma.user.create({
        data: {
          email,
          password: hashedPassword,
          referral_code,
          auth_token,
          first_name,
          last_name
        },
      });
      return {
        code: 0,
        message: 'User registered successfully',
        auth_token: auth_token
      };
    }
    catch (error: any) {
      console.log("Signup error: ", error);
      return {
        code: -1,
        message: error?.message
      };
    }
  }

  async login(payload: LoginDto) {

    const email = payload.email;
    const password = payload.password;

    if (isEmpty(email) || isEmpty(password)) {
      return { code: -1, message: 'Email and password are required' };
    }

    try {
      const user = await this.prisma.user.findUnique({ where: { email } });

      if (!user) {
        return { code: -1, message: 'Invalid email or password' };
      }

      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        return { code: -1, message: 'Invalid email or password' };
      }

      const auth_token = randomBytes(32).toString('hex');
      await this.prisma.user.update({
        where: { email },
        data: { auth_token: auth_token },
      });

      return {
        code: 0,
        message: 'Login successful',
        auth_token: auth_token
      };
    }
    catch (error: any) {
      console.log('Login error:', error);
      return { code: -1, message: error?.message };
    }

  }

  async logout(userId: number) {
    try {
      await this.prisma.user.update({
        where: { id: userId },
        data: { auth_token: null },
      });

      return {
        code: 0,
        message: 'Logout successful',
      };
    } catch (error: any) {
      console.log('Logout error:', error);
      return {
        code: -1,
        message: error?.message,
      };
    }
  }

  async refreshToken(userId: number) {
    try {
      const auth_token = randomBytes(32).toString('hex');

      await this.prisma.user.update({
        where: { id: userId },
        data: { auth_token },
      });

      return {
        code: 0,
        message: 'Auth token refreshed successfully',
        auth_token,
      };
    } catch (error: any) {
      console.log('Refresh token error:', error);
      return {
        code: -1,
        message: error?.message,
      };
    }
  }

  async generateOtp(medium: 'email' | 'phone', value: string) {
    try {
      const code = randomInt(100000, 999999).toString();
      const expires_at = addMinutes(new Date(), 5);



      return {
        code: 0,
        message: 'OTP generated successfully'
      };
    } catch (error: any) {
      console.log('Generate OTP error:', error);
      return {
        code: -1,
        message: error?.message || 'Something went wrong',
      };
    }
  }

  async sendVerificationEmail(email: string, first_name: string, last_name: string, password: string) {
    try {

      const user = await this.prisma.user.findUnique({
        where: { email },
      });

      if (user) {
        return { code: -1, message: 'This email is already registered' };
      }

      const token = jwt.sign(
        { firstname: first_name, lastname: last_name, email: email, password: password },
        process.env.AUTH_SECRET,
        { expiresIn: '15m' }
      );

      const verifyUrl = `${process.env.APP_URL}/v1/auth/confirm-email?token=${token}`;

      const templatePath = '/var/www/html/verify_email_template.html';
      let html = fs.readFileSync(templatePath, 'utf-8');

      html = html.replace('[First Name]', first_name || 'there');
      html = html.replace('href="#"', `href="${verifyUrl}"`);

      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: parseInt(process.env.SMTP_PORT, 10),
        secure: false,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS, 
        },
      });

      await transporter.sendMail({
        from: '"Stipendly" <hello@stipendly.app>',
        to: email,
        subject: 'Verify your Stipendly email', 
        html,
      });

      return { code: 0, message: 'Verification email sent' };
    } catch (error) {
      return { code: 1, message: error.message };
    }
  }

}
