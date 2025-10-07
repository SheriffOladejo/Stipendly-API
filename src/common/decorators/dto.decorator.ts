import { applyDecorators } from '@nestjs/common';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { 
    IsOptional, 
    IsEnum, 
    IsDate, 
    IsObject, 
    IsString, 
    IsDecimal, 
    IsInt, 
    IsEmail 
} from 'class-validator';

export function OptionalEnum<T extends object>(
  enumType: T,
  description?: string,
  example?: T[keyof T]
) {
  return applyDecorators(
    IsOptional(),
    IsEnum(enumType, {
      message: `Value must be one of: ${Object.values(enumType).join(', ')}`,
    }),
    ApiPropertyOptional({
      description,
      enum: enumType,
      example,
    })
  );
}


export function OptionalString(description?: string, example?: any) {
    return applyDecorators(
        IsOptional(),
        IsString(),
        ApiPropertyOptional(description ? { description } : {})
    );
}

export function OptionalDate(description?: string) {
    return applyDecorators(
        IsOptional(),
        IsDate(),
        ApiPropertyOptional(description ? { description } : {})
    );
}

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

export function OptionalDecimal(description?: string, example?: any) {
    return applyDecorators(
        IsOptional(),
        IsDecimal(),
        ApiPropertyOptional({
            description,
            example,
        })
    );
}

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

export function OptionalJson(description?: string) {
    return applyDecorators(
        IsOptional(),
        IsObject(),
        ApiPropertyOptional(description ? { description } : {})
    );
}
