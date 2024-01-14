/*
  Warnings:

  - You are about to drop the column `user_id` on the `Category` table. All the data in the column will be lost.
  - Added the required column `categoryId` to the `Snippet` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Snippet` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Category` DROP COLUMN `user_id`;

-- AlterTable
ALTER TABLE `Snippet` ADD COLUMN `categoryId` INTEGER NOT NULL,
    ADD COLUMN `userId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Snippet` ADD CONSTRAINT `Snippet_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `Category`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Snippet` ADD CONSTRAINT `Snippet_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
