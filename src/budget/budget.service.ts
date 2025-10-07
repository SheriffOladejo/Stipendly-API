import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class BudgetService {

    constructor(private prisma: PrismaService) { }

    // async createBudget(
    //     data: any,
    // ) {
    //     try {
    //         const budget = await this.prisma.budget.create({
    //             data
    //         });
    //         await this.prisma.transaction.create({
    //             data: {
    //                 user_id: budget.user_id,
    //                 //budget_id: budget.id,
    //                 amount: budget.amount ?? 0,
    //                 currency: 'NGN',
    //                 //type: 'Budget',
    //                 category: 'Funding',
    //                 description: `Budget "${budget.name}" created and funded`,
    //                 //payment_method: 'card', 
    //                 reference: `BUDGET-${budget.id}-${Date.now()}`,
    //                 //status: 'completed',
    //                 updated_at: new Date(),
    //             }
    //         });
    //         return {
    //             code: 0,
    //             message: 'Budget created successfully',
    //             data: budget
    //         }
    //     }
    //     catch (error) {
    //         console.log("Create budget error: ", error);
    //         return {
    //             code: -1,
    //             message: error?.message
    //         };
    //     }

    // }

    async updateBudget(
        data: any,
    ) {
        try {
            const budget = await this.prisma.budget.update({
                where: { id: data.id },
                data
            });
            return {
                code: 0,
                message: 'Budget updated successfully',
                data: budget
            }
        }
        catch (error) {
            console.log("Update budget error: ", error);
            return {
                code: -1,
                message: error?.message
            };
        }
    }

}
