import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { applyDecorators } from '@nestjs/common';
import { LoginDto } from 'src/auth/dto/login.dto';

export function LoginDoc() {
  return applyDecorators(
    ApiOperation({ summary: 'Login user and receive token' }),
    ApiBody({ type: LoginDto }),
    ApiResponse({ status: 200, description: 'Login successful' }),
    ApiResponse({ status: 400, description: 'Login error' }),
  );
}