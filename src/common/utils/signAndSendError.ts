import * as jwt from 'jsonwebtoken';
import { Response } from 'express';

export function signAndSendError(
  res: Response,
  error: any,
  secret: string,
  statusCode = 400,
  expiresIn = '10m'
) {
  const errorPayload = {
    message: error?.message || 'Something went wrong',
    timestamp: new Date().toISOString(),
  };

  const signedError = jwt.sign(errorPayload, secret, { expiresIn });

  return res.status(statusCode).json({ error: errorPayload });
}
