import { Expose } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class RegisterDto {
    @Expose()
    @ApiProperty()
    @IsEmail()
    email: string;

    @Expose()
    @IsString()
    @ApiProperty()
    password: string;

    @Expose()
    @IsString()
    @ApiPropertyOptional()
    referral_code?: string;
}