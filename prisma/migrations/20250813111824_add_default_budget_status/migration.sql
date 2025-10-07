/*
  Warnings:

  - You are about to drop the column `email` on the `Otp` table. All the data in the column will be lost.
  - You are about to drop the column `phone` on the `Otp` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX `Otp_email_idx` ON `Otp`;

-- DropIndex
DROP INDEX `Otp_expires_at_idx` ON `Otp`;

-- DropIndex
DROP INDEX `Otp_phone_idx` ON `Otp`;

-- AlterTable
ALTER TABLE `Budget` MODIFY `status` VARCHAR(191) NULL DEFAULT 'active';

-- AlterTable
ALTER TABLE `Otp` DROP COLUMN `email`,
    DROP COLUMN `phone`,
    ADD COLUMN `medium` VARCHAR(191) NULL;

-- CreateIndex
CREATE INDEX `Otp_medium_idx` ON `Otp`(`medium`);
