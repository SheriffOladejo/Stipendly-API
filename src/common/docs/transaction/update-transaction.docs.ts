import { applyDecorators } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { TransactionDto } from 'src/transaction/dto/transaction.dto';

export function UpdateTransactionDoc() {
  return applyDecorators(
    ApiBody({ type: TransactionDto }),
    ApiOperation({ summary: 'Update an existing transaction' }),
    ApiResponse({ status: 200, description: 'Transaction updated successfully' }),
    ApiResponse({ status: 400, description: 'Invalid data or transaction not found' }),
  );
}
