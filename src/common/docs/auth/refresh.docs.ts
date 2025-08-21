import { ApiOperation, ApiHeader, ApiResponse } from '@nestjs/swagger';
import { applyDecorators } from '@nestjs/common';

export function RefreshTokenDoc() {
  return applyDecorators(
    ApiHeader({
      name: 'Authorization',
      description: 'Bearer AUTH_TOKEN',
      required: true,
    }),
    ApiOperation({ summary: 'Refresh auth token' }),
    ApiResponse({ status: 200, description: 'Auth token refreshed successfully' }),
    ApiResponse({ status: 400, description: 'Refresh token error' }),
  );
}