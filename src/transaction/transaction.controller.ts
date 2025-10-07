import { Body, Controller, Post, Get, Res, UseGuards, Query, Patch, Req } from '@nestjs/common';
import { Response } from 'express';
import { TransactionService } from './transaction.service';
import { ApiTags } from '@nestjs/swagger';
import { signAndSendError } from 'src/common/utils/signAndSendError';
import { AuthGuard } from 'src/auth/auth.guard';
import { decodeAndValidateToken } from 'src/common/utils/decodeAndValidate';
import { TransactionDto } from './dto/transaction.dto';
import * as jwt from 'jsonwebtoken';
import { CreateTransactionDoc } from 'src/common/docs/transaction/create-transaction.docs';
import { GetTransactionsDoc } from 'src/common/docs/transaction/get-transactions.docs';
import { UpdateTransactionDoc } from 'src/common/docs/transaction/update-transaction.docs';
import { RequestWithUser } from 'src/types/request-with-user';
import { UpdateTransactionDto } from './dto/update-transaction.dto';

@ApiTags('Transactions')
@Controller('v1/transaction/')
export class TransactionController {

  constructor(private readonly transactionService: TransactionService) {}

  @CreateTransactionDoc()
  @Post('new')
  @UseGuards(AuthGuard)
  async newTransaction(
    @Res() res: Response,
    @Body() body: any
  ) {
    try {
      const payload = decodeAndValidateToken(body.token, process.env.TRANSACTION_SECRET, TransactionDto);
      const new_transaction = await this.transactionService.createTransaction(payload);
      const responsePayload = {
        message: new_transaction.message,
        data: new_transaction.data
      };
      
      const token = jwt.sign(responsePayload, process.env.TRANSACTION_SECRET, {
        expiresIn: '1h',
      });

      const statusCode = new_transaction.code !== 0 ? 400 : 200;
      return res.status(statusCode).json({ result: token });
    }
    catch (error) {
      return signAndSendError(res, error, process.env.TRANSACTION_SECRET);
    }
  }

  @UpdateTransactionDoc()
  @Patch('update')
  @UseGuards(AuthGuard)
  async updateTransaction(
    @Res() res: Response,
    @Body() body: any
  ) {
    try {
      const payload = decodeAndValidateToken(
        body.token,
        process.env.TRANSACTION_SECRET,
        UpdateTransactionDto
      );

      const updated_transaction = await this.transactionService.updateTransaction(
        payload.id,
        payload
      );

      const responsePayload = {
        message: updated_transaction.message,
        data: updated_transaction.data
      };

      const token = jwt.sign(responsePayload, process.env.TRANSACTION_SECRET, {
        expiresIn: '1h',
      });

      const statusCode = updated_transaction.code !== 0 ? 400 : 200;
      return res.status(statusCode).json({ result: token });
    }
    catch (error) {
      return signAndSendError(res, error, process.env.TRANSACTION_SECRET);
    }
  }

  @GetTransactionsDoc()
  @Get('list')
  @UseGuards(AuthGuard)
  async getTransactions(
    @Res() res: Response,
    @Req() req: RequestWithUser,
    @Query() query: any
  ) {
    try {
      const payload = decodeAndValidateToken(query.token, process.env.TRANSACTION_SECRET, TransactionDto);
      const user = req.user;
      const transactions = await this.transactionService.getTransactions(user.id, payload);
      const responsePayload = {
        message: transactions.message,
        data: transactions.data
      };
      
      const token = jwt.sign(responsePayload, process.env.TRANSACTION_SECRET, {
        expiresIn: '1h',
      });

      const statusCode = transactions.code !== 0 ? 400 : 200;
      return res.status(statusCode).json({ result: token });
    }
    catch (error) {
      return signAndSendError(res, error, process.env.TRANSACTION_SECRET);
    }
  }
}
