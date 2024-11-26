/*
  Warnings:

  - Added the required column `category` to the `OrderProduct` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `OrderProduct` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "OrderProduct" ADD COLUMN     "category" TEXT NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL;
