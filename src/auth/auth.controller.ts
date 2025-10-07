import { Body, Controller, Post, Res, Req, UseGuards, Get, Query } from '@nestjs/common';
import { Response, Request } from 'express';
import { AuthGuard } from './auth.guard';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { decodeAndValidateToken } from 'src/common/utils/decodeAndValidate';
import * as jwt from 'jsonwebtoken';
import { signAndSendError } from 'src/common/utils/signAndSendError';
import { RegisterDoc } from 'src/common/docs/auth/register.docs';
import { LoginDoc } from 'src/common/docs/auth/login.docs';
import { LogoutDoc } from 'src/common/docs/auth/logout.docs';
import { RefreshTokenDoc } from 'src/common/docs/auth/refresh.docs';
import * as bcrypt from 'bcrypt';

@ApiTags('Auth')
@Controller('v1/auth/')
export class AuthController {

  constructor(private authService: AuthService) { }

  @RegisterDoc()
  @Post('register')
  async register(
    @Res() res: Response,
    @Body() body: any
  ) {
    try {
      const payload = body;

      const register = await this.authService.register(payload);

      const responsePayload = {
        message: register.message,
        auth_token: register.auth_token
      };

      const token = jwt.sign(responsePayload, process.env.AUTH_SECRET, {
        expiresIn: '1h',
      });

      const statusCode = register.code !== 0 ? 400 : 200;
      return res.status(statusCode).json({ result: responsePayload });
    } catch (error) {
      return signAndSendError(res, error, process.env.AUTH_SECRET);
    }
  }

  @LoginDoc()
  @Post('login')
  async login(
    @Res() res: Response,
    @Body() body: any
  ) {
    try {
      const payload = body;

      const login = await this.authService.login(payload);

      const responsePayload = {
        message: login.message,
        auth_token: login.auth_token,
      };

      const token = jwt.sign(responsePayload, process.env.AUTH_SECRET, {
        expiresIn: '1h',
      });

      const statusCode = login.code !== 0 ? 400 : 200;
      return res.status(statusCode).json({ result: responsePayload });
    } catch (error) {
      return signAndSendError(res, error, process.env.AUTH_SECRET);
    }
  }

  @LogoutDoc()
  @Post('logout')
  @UseGuards(AuthGuard)
  async logout(@Req() req: Request, @Res() res: Response) {
    try {
      const user = req.user as any;

      const logout = await this.authService.logout(user.id);

      const statusCode = logout.code !== 0 ? 400 : 200;

      const responsePayload = {
        message: logout.message,
      };

      const token = jwt.sign(responsePayload, process.env.AUTH_SECRET, {
        expiresIn: '1h',
      });

      return res.status(statusCode).json({ result: token });
    } catch (error) {
      return signAndSendError(res, error, process.env.AUTH_SECRET);
    }
  }

  @RefreshTokenDoc()
  @Post('refresh')
  @UseGuards(AuthGuard)
  async refreshToken(@Req() req: Request, @Res() res: Response) {
    try {
      const user = req.user as any;

      const refresh = await this.authService.refreshToken(user.id);

      const statusCode = refresh.code !== 0 ? 400 : 200;

      const responsePayload = {
        message: refresh.message,
        auth_token: refresh.auth_token,
      };

      const token = jwt.sign(responsePayload, process.env.AUTH_SECRET, {
        expiresIn: '1h',
      });

      return res.status(statusCode).json({ result: token });
    } catch (error) {
      return signAndSendError(res, error, process.env.AUTH_SECRET);
    }
  }

  @Post('verify-email')
  async verifyEmail(@Res() res: Response, @Body() body: any) {
    try {
      //const payload = decodeAndValidateToken(body.token, process.env.AUTH_SECRET, RegisterDto);
      const payload = body;

      const result = await this.authService.sendVerificationEmail(
        payload.email,
        payload.firstname,
        payload.lastname,
        payload.password
      );

      const responsePayload = {
        message: result.message,
      };

      const token = jwt.sign(responsePayload, process.env.AUTH_SECRET, {
        expiresIn: '1h',
      });

      const statusCode = result.code !== 0 ? 400 : 200;
      return res.status(statusCode).json({ result: responsePayload });
    } catch (error) {
      return signAndSendError(res, error, process.env.AUTH_SECRET);
    }
  }


  @Get('confirm-email')
  async confirmEmail(@Res() res: Response, @Query() query: any) {
    try {
      const payload = decodeAndValidateToken(query.token, process.env.AUTH_SECRET, RegisterDto);

      const result = await this.authService.register(payload);

      const statusCode = result.code !== 0 ? 400 : 200;
      return res.status(statusCode).json({ result: result.message });
    } catch (error) {
      return res.status(400).send(`
      <html>
        <head><title>Verification Failed</title></head>
        <body style="font-family: Arial; text-align: center; padding: 40px; color: red;">
          <h2>❌ Verification failed</h2>
          <p>${error.message}</p>
        </body>
      </html>
    `);
    }
  }





}
