/*
  Warnings:

  - Added the required column `ntpId` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ntpStatus` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Made the column `orderId` on table `Order` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "ntpId" TEXT NOT NULL,
ADD COLUMN     "ntpStatus" TEXT NOT NULL,
ALTER COLUMN "orderId" SET NOT NULL;
