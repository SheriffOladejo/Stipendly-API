import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class LoginDto {

    @Expose()
    @ApiProperty()
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @Expose()
    @ApiProperty()
    @IsNotEmpty()
    password: string;
    
}