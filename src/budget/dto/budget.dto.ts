import { Expose, Type } from 'class-transformer';
import {
    OptionalString,
    OptionalEnum, 
    OptionalDate, 
    OptionalJson, 
    OptionalDecimal, 
    OptionalInt
} from 'src/common/decorators/dto.decorator';
import { BudgetCycle } from 'src/common/enums/budget-cycle';
import { BudgetStatus } from 'src/common/enums/budget-status';
import { PayoutFrequency } from 'src/common/enums/payout-frequency';

export class BudgetDto {

    @OptionalInt("Budget ID", 456)
    id: number;

    @Expose()
    @OptionalString("Name of the budget")
    name?: string;

    @Expose()
    @OptionalDecimal("Total budget amount")
    amount?: number;

    @Expose()
    @OptionalDecimal("Total amount spent from budget")
    spent?: number;

    @Expose()
    @OptionalDecimal("Total amount remaining in budget")
    remaining?: number;

    @Type(() => Date)
    @Expose()
    @OptionalDate("Date when budget starts counting to next payout")
    start_date?: Date;

    @Type(() => Date)
    @Expose()
    @OptionalDate("Date when budget is expected to be exhausted")
    end_date?: Date;

    @Expose()
    @OptionalDecimal("Expected stipend amount per disbursement")
    stipend?: number;

    @Expose()
    @OptionalJson("Budget settings in JSON")
    settings?: Record<string, any>;

    @Expose()
    @OptionalEnum(PayoutFrequency, "Stipend disbursement frequency", PayoutFrequency.MONTHLY)
    pay_freq?: PayoutFrequency;

    @Expose()
    @OptionalEnum(BudgetStatus, "Budget status", BudgetStatus.PAUSED)
    status?: BudgetStatus;

    @Expose()
    @OptionalEnum(BudgetCycle, "Budget renewal cycle", BudgetCycle.CUSTOM)
    cycle?: BudgetCycle;
}