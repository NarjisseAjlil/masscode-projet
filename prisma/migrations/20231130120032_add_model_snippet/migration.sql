/*
  Warnings:

  - You are about to drop the column `categoryId` on the `Snippet` table. All the data in the column will be lost.
  - Added the required column `category_id` to the `Snippet` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Snippet` DROP FOREIGN KEY `Snippet_categoryId_fkey`;

-- AlterTable
ALTER TABLE `Snippet` DROP COLUMN `categoryId`,
    ADD COLUMN `category_id` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Snippet` ADD CONSTRAINT `Snippet_category_id_fkey` FOREIGN KEY (`category_id`) REFERENCES `Category`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
