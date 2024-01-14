/*
  Warnings:

  - Made the column `user_id` on table `Category` required. This step will fail if there are existing NULL values in that column.
  - Made the column `user_id` on table `Snippet` required. This step will fail if there are existing NULL values in that column.

*/
-- DropIndex
DROP INDEX `Snippet_categoryId_fkey` ON `Snippet`;

-- DropIndex
DROP INDEX `Snippet_user_id_fkey` ON `Snippet`;

-- AlterTable
ALTER TABLE `Category` MODIFY `user_id` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `Snippet` MODIFY `user_id` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Snippet` ADD CONSTRAINT `Snippet_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `Category`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Snippet` ADD CONSTRAINT `Snippet_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
