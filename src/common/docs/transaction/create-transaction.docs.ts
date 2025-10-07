import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { applyDecorators } from '@nestjs/common';
import { TransactionDto } from 'src/transaction/dto/transaction.dto';

export function CreateTransactionDoc() {
  return applyDecorators(
    ApiOperation({ summary: 'Create a new transaction' }),
    ApiBody({ type: TransactionDto }),
    ApiResponse({ status: 200, description: 'Transaction created successfully' }),
    ApiResponse({ status: 400, description: 'Transaction creation failed' }),
  );
}
