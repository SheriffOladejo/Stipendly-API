import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ProfileModule } from './profile/profile.module';
import { PrismaModule } from './prisma/prisma.module';
import { WebhookModule } from './webhook/webhook.module';
import { TransactionModule } from './transaction/transaction.module';
import { BudgetModule } from './budget/budget.module';
import { CardModule } from './card/card.module';

@Module({
  imports: [AuthModule, ProfileModule, PrismaModule, WebhookModule, TransactionModule, BudgetModule, CardModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
