-- DropForeignKey
ALTER TABLE `Snippet` DROP FOREIGN KEY `Snippet_categoryId_fkey`;

-- DropForeignKey
ALTER TABLE `Snippet` DROP FOREIGN KEY `Snippet_user_id_fkey`;

-- AlterTable
ALTER TABLE `Snippet` MODIFY `user_id` INTEGER NULL;
