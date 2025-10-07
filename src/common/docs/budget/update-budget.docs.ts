import { ApiBody, ApiHeader, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { applyDecorators } from '@nestjs/common';
import { BudgetDto } from 'src/budget/dto/budget.dto';

export function UpdateBudgetDoc() {
  return applyDecorators(
    ApiHeader({
      name: 'Authorization',
      description: 'Bearer AUTH_TOKEN',
      required: true,
    }),
    ApiOperation({
      summary: 'Update an existing budget',
      description:
        'Updates an existing budget with the provided data. \
The `status`, `cycle`, and `pay_freq` fields accept only predefined enum values. \
The `settings` field should be valid JSON.',
    }),
    ApiBody({ type: BudgetDto }),
    ApiResponse({
      status: 200,
      description: 'Budget updated successfully',
    }),
    ApiResponse({
      status: 400,
      description: 'Budget update failed due to validation error or bad request data.',
    }),
    ApiResponse({
      status: 401,
      description: 'Unauthorized. Bearer token is missing or invalid.',
    }),
    ApiResponse({
      status: 404,
      description: 'Budget not found.',
    }),
    ApiResponse({
      status: 500,
      description: 'Internal server error.',
    }),
  );
}
