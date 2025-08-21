import { ApiOperation, ApiHeader, ApiResponse } from '@nestjs/swagger';
import { applyDecorators } from '@nestjs/common';

export function LogoutDoc() {
  return applyDecorators(
    ApiHeader({
      name: 'Authorization',
      description: 'Bearer AUTH_TOKEN',
      required: true,
    }),
    ApiOperation({ summary: 'Logout user and invalidate token' }),
    ApiResponse({ status: 200, description: 'Logout successful' }),
    ApiResponse({ status: 400, description: 'Logout error' }),
  );
}