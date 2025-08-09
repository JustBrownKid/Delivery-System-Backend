/*
  Warnings:

  - A unique constraint covering the columns `[trackingId]` on the table `Order` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `shipperId` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Made the column `cityId` on table `Order` required. This step will fail if there are existing NULL values in that column.
  - Made the column `cityId` on table `Shipper` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_cityId_fkey";

-- DropForeignKey
ALTER TABLE "Shipper" DROP CONSTRAINT "Shipper_cityId_fkey";

-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "shipperId" INTEGER NOT NULL,
ALTER COLUMN "cityId" SET NOT NULL;

-- AlterTable
ALTER TABLE "Shipper" ALTER COLUMN "cityId" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Order_trackingId_key" ON "Order"("trackingId");

-- AddForeignKey
ALTER TABLE "Shipper" ADD CONSTRAINT "Shipper_cityId_fkey" FOREIGN KEY ("cityId") REFERENCES "City"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_shipperId_fkey" FOREIGN KEY ("shipperId") REFERENCES "Shipper"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_cityId_fkey" FOREIGN KEY ("cityId") REFERENCES "City"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
