import { Expose, Type } from 'class-transformer';
import {
  OptionalString,
  OptionalEnum,
  OptionalDate,
  OptionalDecimal,
  OptionalInt,
} from 'src/common/decorators/dto.decorator';
import { TransactionType } from 'src/common/enums/transaction-type';
import { TransactionStatus } from 'src/common/enums/transaction-status';

export class UpdateTransactionDto {
  @Expose()
  @OptionalInt('Transaction ID', 101)
  id: number;

  @OptionalInt('User ID associated with the transaction', 45)
  user_id?: number; // usually not exposed (controlled by auth), but left optional

  @Expose()
  @OptionalInt('Budget ID associated with the transaction', 12)
  budget_id?: number;

  @Expose()
  @OptionalDecimal('Transaction amount', 5000.0)
  amount?: number;

  @Expose()
  @OptionalString('Transaction currency code', 'NGN')
  currency?: string;

  @Expose()
  @OptionalEnum(
    TransactionType,
    'Type of transaction',
    TransactionType.EXPENSE,
  )
  type?: TransactionType;

  @Expose()
  @OptionalString('Category of the transaction', 'Food')
  category?: string;

  @Expose()
  @OptionalString('Description or notes for the transaction', 'Lunch at KFC')
  description?: string;

  @Expose()
  @OptionalString('Payment method used', 'card')
  payment_method?: string;

  @Expose()
  @OptionalString('Unique transaction reference code', 'TXN-123456789')
  reference?: string;

  @Expose()
  @OptionalEnum(
    TransactionStatus,
    'Transaction status',
    TransactionStatus.COMPLETED,
  )
  status?: TransactionStatus;

  @Type(() => Date)
  @Expose()
  @OptionalDate('Transaction creation date')
  created_at?: Date;

  @Type(() => Date)
  @Expose()
  @OptionalDate('Transaction last update date')
  updated_at?: Date;
}
