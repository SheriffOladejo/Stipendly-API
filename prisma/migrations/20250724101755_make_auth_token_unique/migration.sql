/*
  Warnings:

  - A unique constraint covering the columns `[auth_token]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `User_auth_token_key` ON `User`(`auth_token`);
