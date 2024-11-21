/*
  Warnings:

  - Added the required column `height` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `length` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `weight` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `width` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "height" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "length" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "weight" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "width" DOUBLE PRECISION NOT NULL;

-- CreateTable
CREATE TABLE "Order" (
    "id" TEXT NOT NULL,
    "orderId" TEXT,
    "amount" DOUBLE PRECISION NOT NULL,
    "code" TEXT NOT NULL,
    "message" TEXT,
    "nptID" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "operationDate" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Order_orderId_key" ON "Order"("orderId");

-- CreateIndex
CREATE UNIQUE INDEX "Order_code_key" ON "Order"("code");

-- CreateIndex
CREATE UNIQUE INDEX "Order_nptID_key" ON "Order"("nptID");
