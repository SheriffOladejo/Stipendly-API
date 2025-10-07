import { Expose, Type } from 'class-transformer';
import { OptionalString, OptionalDate, OptionalEmail, OptionalInt } from 'src/common/decorators/dto.decorator';

export class ProfileDto {

    @OptionalInt("User ID", 123)
    id: number;

    @OptionalEmail("Provided during registration", "hello@stipendly.app")
    email?: string;

    @OptionalString("Authentication token")
    auth_token?: string;

    @Expose()
    @OptionalString("User password")
    password?: string;

    @Expose()
    @OptionalString("Usually the username of the account owner. Will be used for invitation links")
    referral_code?: string;

    @Expose()
    @OptionalString("User's first name")
    first_name?: string;

    @Expose()
    @OptionalString("User's last name")
    last_name?: string;

    @Type(() => Date)
    @Expose()
    @OptionalDate("Date of birth")
    dob?: Date;

    @Expose()
    @OptionalString("User's phone number")
    phone_number?: string; 

    @Expose()
    @OptionalString("Bank Verification Number in bcrypt")
    bvn?: string;

    @Expose()
    @OptionalString("Username")
    username?: string;

    @Expose()
    @OptionalString("Transaction PIN")
    trx_pin?: string;  

}
