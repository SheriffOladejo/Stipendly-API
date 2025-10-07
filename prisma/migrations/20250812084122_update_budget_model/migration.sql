-- AlterTable
ALTER TABLE `Budget` MODIFY `name` VARCHAR(191) NULL,
    MODIFY `cycle` VARCHAR(191) NULL,
    MODIFY `start_date` DATETIME(3) NULL,
    MODIFY `end_date` DATETIME(3) NULL,
    MODIFY `pay_freq` VARCHAR(191) NULL,
    MODIFY `amount` DECIMAL(15, 2) NULL,
    MODIFY `remaining` DECIMAL(15, 2) NULL,
    MODIFY `settings` JSON NULL,
    MODIFY `spent` DECIMAL(15, 2) NULL,
    MODIFY `status` VARCHAR(191) NULL,
    MODIFY `stipend` DECIMAL(10, 2) NULL;
