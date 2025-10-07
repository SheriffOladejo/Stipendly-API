/*
  Warnings:

  - You are about to drop the column `budget_amount` on the `Budget` table. All the data in the column will be lost.
  - You are about to drop the column `pay_settings` on the `Budget` table. All the data in the column will be lost.
  - You are about to drop the column `stip_amount` on the `Budget` table. All the data in the column will be lost.
  - Added the required column `amount` to the `Budget` table without a default value. This is not possible if the table is not empty.
  - Added the required column `remaining` to the `Budget` table without a default value. This is not possible if the table is not empty.
  - Added the required column `settings` to the `Budget` table without a default value. This is not possible if the table is not empty.
  - Added the required column `spent` to the `Budget` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `Budget` table without a default value. This is not possible if the table is not empty.
  - Added the required column `stipend` to the `Budget` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Budget` DROP COLUMN `budget_amount`,
    DROP COLUMN `pay_settings`,
    DROP COLUMN `stip_amount`,
    ADD COLUMN `amount` DECIMAL(15, 2) NOT NULL,
    ADD COLUMN `remaining` DECIMAL(15, 2) NOT NULL,
    ADD COLUMN `settings` JSON NOT NULL,
    ADD COLUMN `spent` DECIMAL(15, 2) NOT NULL,
    ADD COLUMN `status` VARCHAR(191) NOT NULL,
    ADD COLUMN `stipend` DECIMAL(10, 2) NOT NULL;
