/*
  Warnings:

  - You are about to drop the column `amount` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `code` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `message` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `nptID` on the `Order` table. All the data in the column will be lost.
  - Added the required column `billingCounty` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `billingEmail` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `billingFirstName` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `billingLastName` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `billingLocality` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `billingPhone` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `billingStreet` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `billingStreetNo` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `billingZipCode` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `paymentMethod` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `productsCost` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `shippingCounty` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `shippingEmail` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `shippingFirstName` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `shippingLastName` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `shippingLocality` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `shippingPhone` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `shippingStreet` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `shippingStreetNo` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `shippingZipCode` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalCost` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalWeight` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Order_code_key";

-- DropIndex
DROP INDEX "Order_nptID_key";

-- AlterTable
ALTER TABLE "Order" DROP COLUMN "amount",
DROP COLUMN "code",
DROP COLUMN "message",
DROP COLUMN "nptID",
ADD COLUMN     "billingCounty" TEXT NOT NULL,
ADD COLUMN     "billingEmail" TEXT NOT NULL,
ADD COLUMN     "billingFirstName" TEXT NOT NULL,
ADD COLUMN     "billingLastName" TEXT NOT NULL,
ADD COLUMN     "billingLocality" TEXT NOT NULL,
ADD COLUMN     "billingPhone" TEXT NOT NULL,
ADD COLUMN     "billingStreet" TEXT NOT NULL,
ADD COLUMN     "billingStreetNo" TEXT NOT NULL,
ADD COLUMN     "billingZipCode" TEXT NOT NULL,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "paymentMethod" TEXT NOT NULL,
ADD COLUMN     "productsCost" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "shippingApartment" TEXT,
ADD COLUMN     "shippingBuilding" TEXT,
ADD COLUMN     "shippingCounty" TEXT NOT NULL,
ADD COLUMN     "shippingEmail" TEXT NOT NULL,
ADD COLUMN     "shippingEntrance" TEXT,
ADD COLUMN     "shippingFirstName" TEXT NOT NULL,
ADD COLUMN     "shippingFloor" TEXT,
ADD COLUMN     "shippingLastName" TEXT NOT NULL,
ADD COLUMN     "shippingLocality" TEXT NOT NULL,
ADD COLUMN     "shippingPhone" TEXT NOT NULL,
ADD COLUMN     "shippingStreet" TEXT NOT NULL,
ADD COLUMN     "shippingStreetNo" TEXT NOT NULL,
ADD COLUMN     "shippingZipCode" TEXT NOT NULL,
ADD COLUMN     "totalCost" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "totalWeight" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- CreateTable
CREATE TABLE "OrderProduct" (
    "orderId" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "OrderProduct_pkey" PRIMARY KEY ("orderId","productId")
);

-- AddForeignKey
ALTER TABLE "OrderProduct" ADD CONSTRAINT "OrderProduct_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderProduct" ADD CONSTRAINT "OrderProduct_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;
