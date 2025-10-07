import { Body, Controller, Post, Patch, Res, UseGuards } from '@nestjs/common';
import { Response, Request } from 'express';
import { BudgetService } from './budget.service';
import { ApiTags } from '@nestjs/swagger';
import { signAndSendError } from 'src/common/utils/signAndSendError';
import { AuthGuard } from 'src/auth/auth.guard';
import { decodeAndValidateToken } from 'src/common/utils/decodeAndValidate';
import { BudgetDto } from './dto/budget.dto';
import * as jwt from 'jsonwebtoken';
import { CreateBudgetDoc } from 'src/common/docs/budget/create-budget.docs';
import { UpdateBudgetDoc } from 'src/common/docs/budget/update-budget.docs';

@ApiTags('Budgets')
@Controller('v1/budget/')
export class BudgetController {

  constructor(private readonly budgetService: BudgetService) {}

  @CreateBudgetDoc()
  @Post('new')
  @UseGuards(AuthGuard)
  async newBudget (
    @Res() res: Response,
    @Body() body: any
  ) {
    try {
      const payload = decodeAndValidateToken(body.token, process.env.BUDGET_SECRET, BudgetDto);
      //const new_budget = await this.budgetService.createBudget(payload);
      const new_budget = {code: 0, data: 0, message: 0};
      const responsePayload = {
        message: new_budget.message,
        data: new_budget.data
      };
      
      const token = jwt.sign(responsePayload, process.env.BUDGET_SECRET, {
        expiresIn: '1h',
      });

      const statusCode = new_budget.code !== 0 ? 400 : 200;
      return res.status(statusCode).json({ result: token });
    }
    catch (error) {
      return signAndSendError(res, error, process.env.BUDGET_SECRET);
    }
  }

  @UpdateBudgetDoc()
  @Patch('update')
  @UseGuards(AuthGuard)
  async updateBudget (
    @Res() res: Response,
    @Body() body: any
  ) {
    try {
      const payload = decodeAndValidateToken(body.token, process.env.BUDGET_SECRET, BudgetDto);
      // Assuming updateBudget method exists in BudgetService
      const updated_budget = await this.budgetService.updateBudget(payload);
      const responsePayload = {
        message: updated_budget.message,
        data: updated_budget.data
      };
      
      const token = jwt.sign(responsePayload, process.env.BUDGET_SECRET, {
        expiresIn: '1h',
      });

      const statusCode = updated_budget.code !== 0 ? 400 : 200;
      return res.status(statusCode).json({ result: token });
    }
    catch (error) {
      return signAndSendError(res, error, process.env.BUDGET_SECRET);
    }
  }

}
