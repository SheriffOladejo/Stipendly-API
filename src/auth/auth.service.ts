import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { isValidEmail, isEmpty } from 'src/common/utils/validators';
import { randomBytes } from 'crypto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) { }

  async register(email: string, password: string, referral_code: string) {
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
      await this.prisma.user.deleteMany({});
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
          auth_token
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

  async login(email: string, password: string) {
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


}
