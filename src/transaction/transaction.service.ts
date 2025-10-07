import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { TransactionDto } from './dto/transaction.dto';

@Injectable()
export class TransactionService {

    constructor(private prisma: PrismaService) { }

    async createTransaction(
        data: any,
    ) {
        try {
            const transaction = await this.prisma.transaction.create({
                data
            });
            return {
                code: 0,
                message: 'Transaction created successfully',
                data: transaction
            };
        }
        catch (error) {
            console.log("Create transaction error: ", error);
            return {
                code: -1,
                message: error?.message
            };
        }
    }

    async updateTransaction(id: number, data: any) {
        try {
            const transaction = await this.prisma.transaction.update({
                where: { id },
                data: {
                    ...data,
                    updated_at: new Date(),
                },
            });

            return {
                code: 0,
                message: 'Transaction updated successfully',
                data: transaction,
            };
        } catch (error) {
            console.log("Update transaction error: ", error);
            return {
                code: -1,
                message: error?.message || 'Failed to update transaction',
            };
        }
    }


    async getTransactions(user_id: any, payload: any): Promise<{ code: number; message: string; data?: TransactionDto[] }> {
        try {
            const whereClause: any = { user_id: user_id };

            if (payload.budget_id) whereClause.budget_id = payload.budget_id;
            if (payload.type) whereClause.type = payload.type;
            if (payload.category) whereClause.category = payload.category;
            if (payload.status) whereClause.status = payload.status;

            const transactions = await this.prisma.transaction.findMany({
                where: whereClause,
                orderBy: { created_at: 'desc' },
            });

            const mapped: TransactionDto[] = transactions.map((t) => ({
                id: t.id,
                user_id: t.user_id,
                amount: Number(t.amount),
                currency: t.currency,
                type: t.type as TransactionDto['type'],
                category: t.category ?? null,
                description: t.description ?? null,
                reference: t.reference ?? null,
                status: t.status as TransactionDto['status'],
                created_at: t.created_at,
                updated_at: t.updated_at,
            }));

            return {
                code: 0,
                message: 'Transactions fetched successfully',
                data: mapped,
            };
        } catch (error) {
            return {
                code: 1,
                message: error.message || 'Failed to fetch transactions',
            };
        }
    }



}
