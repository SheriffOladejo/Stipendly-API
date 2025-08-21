import { applyDecorators } from '@nestjs/common';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, IsInt, IsEmail } from 'class-validator';

/**
 * Marks a field as an optional string with Swagger metadata
 */
export function OptionalString(description?: string) {
    return applyDecorators(
        IsOptional(),
        IsString(),
        ApiPropertyOptional(description ? { description } : {})
    );
}

/**
 * Marks a field as an optional integer with Swagger metadata
 */
export function OptionalInt(description?: string, example?: any) {
    return applyDecorators(
        IsOptional(),
        IsInt(),
        ApiPropertyOptional({
            description,
            example,
        })
    );
}

/**
 * Marks a field as an optional email with Swagger metadata
 */
export function OptionalEmail(description?: string, example?: string) {
    return applyDecorators(
        IsOptional(),
        IsEmail(),
        ApiPropertyOptional({
            description,
            example,
        })
    );
}
