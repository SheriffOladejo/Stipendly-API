/*
  Warnings:

  - You are about to drop the column `createdAt` on the `Otp` table. All the data in the column will be lost.
  - You are about to drop the column `expiresAt` on the `Otp` table. All the data in the column will be lost.
  - Added the required column `active` to the `Otp` table without a default value. This is not possible if the table is not empty.
  - Added the required column `expires_at` to the `Otp` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `Otp_expiresAt_idx` ON `Otp`;

-- AlterTable
ALTER TABLE `Otp` DROP COLUMN `createdAt`,
    DROP COLUMN `expiresAt`,
    ADD COLUMN `active` VARCHAR(191) NOT NULL,
    ADD COLUMN `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `expires_at` DATETIME(3) NOT NULL;

-- CreateTable
CREATE TABLE `Budget` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `budget_amount` DECIMAL(15, 2) NOT NULL,
    `cycle` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `start_date` DATETIME(3) NOT NULL,
    `end_date` DATETIME(3) NOT NULL,
    `pay_freq` VARCHAR(191) NOT NULL,
    `stip_amount` DECIMAL(10, 2) NOT NULL,
    `pay_settings` JSON NOT NULL,

    UNIQUE INDEX `Budget_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE INDEX `Otp_expires_at_idx` ON `Otp`(`expires_at`);
