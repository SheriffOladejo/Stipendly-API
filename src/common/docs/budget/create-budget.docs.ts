import { ApiBody, ApiHeader, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { applyDecorators } from '@nestjs/common';
import { BudgetDto } from 'src/budget/dto/budget.dto';

export function CreateBudgetDoc() {
  return applyDecorators(
    ApiHeader({
      name: 'Authorization',
      description: 'Bearer AUTH_TOKEN',
      required: true,
    }),
    ApiOperation({
      summary: 'Create a new budget',
      description:
        'Creates a new budget with the provided data. \
The `status`, `cycle`, and `pay_freq` fields accept only predefined enum values. \
The `settings` field should be valid JSON.',
    }),
    ApiBody({ type: BudgetDto }),
    ApiResponse({
      status: 200,
      description: 'Budget created successfully',
    }),
    ApiResponse({
      status: 400,
      description: 'Budget creation failed due to validation error or bad request data.',
    }),
    ApiResponse({
      status: 401,
      description: 'Unauthorized. Bearer token is missing or invalid.',
    }),
    ApiResponse({
      status: 500,
      description: 'Internal server error.',
    }),
  );
}
