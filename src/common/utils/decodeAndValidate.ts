
import * as jwt from 'jsonwebtoken';
import { plainToInstance } from 'class-transformer';
import { validateSync } from 'class-validator';

export function decodeAndValidateToken<T>(token: string, secret: string, dtoClass: new () => T): T {
  try {
    const decoded = jwt.verify(token, secret);
    
    const dtoObject = plainToInstance(dtoClass, decoded, {
      excludeExtraneousValues: true,
    });
    
    const errors = validateSync(dtoObject as object, { skipMissingProperties: true });

    if (errors.length > 0) {
      const errorMessages = errors.flatMap(err =>
        Object.values(err.constraints || {})
      );
      throw new Error(errorMessages.join(', '));
    }

    return dtoObject;
  } catch (error) {
    throw new Error(error?.message);
  }
}
