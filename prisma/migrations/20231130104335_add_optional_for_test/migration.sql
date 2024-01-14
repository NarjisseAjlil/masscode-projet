/*
  Warnings:

  - You are about to drop the column `userId` on the `Snippet` table. All the data in the column will be lost.
  - Added the required column `user_id` to the `Category` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `Snippet` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Snippet` DROP FOREIGN KEY `Snippet_userId_fkey`;

-- AlterTable
ALTER TABLE `Category` ADD COLUMN `user_id` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `Snippet` DROP COLUMN `userId`,
    ADD COLUMN `user_id` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Snippet` ADD CONSTRAINT `Snippet_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
