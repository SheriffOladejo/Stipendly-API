import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { applyDecorators } from '@nestjs/common';
import { RegisterDto } from 'src/auth/dto/register.dto';

export function RegisterDoc() {
  return applyDecorators(
    ApiOperation({ summary: 'Creates a new account and receive token' }),
    ApiBody({ type: RegisterDto }),
    ApiResponse({ status: 200, description: 'User created successfully' }),
    ApiResponse({ status: 400, description: 'User creation failed due to validation or server error.' }),
  );
}