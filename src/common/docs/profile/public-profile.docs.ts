import { ApiBody, ApiHeader, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { applyDecorators } from '@nestjs/common';
import { ProfileDto } from 'src/profile/dto/profile.dto';

export function UpdateProfileDocs() {
  return applyDecorators(
    ApiHeader({
      name: 'Authorization',
      description: 'Bearer AUTH_TOKEN',
      required: true,
    }),
    ApiOperation({ summary: 'Updates own profile info with specified data' }),
    ApiBody({ type: ProfileDto }),
    ApiResponse({ status: 200, description: 'User profile updated successfully' }),
    ApiResponse({ status: 400, description: 'User profile update failed due to validation or server error.' }),
  );
}