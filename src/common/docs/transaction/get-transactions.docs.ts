import { ApiQuery, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { applyDecorators } from '@nestjs/common';
import { TransactionDto } from 'src/transaction/dto/transaction.dto';

export function GetTransactionsDoc() {
  return applyDecorators(
    ApiOperation({ summary: 'Get list of transactions for a user' }),
    ApiQuery({
      name: 'token',
      type: String,
      required: true,
      description: 'Signed token with user_id and optional filters',
    }),
    ApiBody({ type: TransactionDto }),
    ApiResponse({ status: 200, description: 'Transactions fetched successfully' }),
    ApiResponse({ status: 400, description: 'Error fetching transactions' }),
  );
}
