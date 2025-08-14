/*
  Warnings:

  - Added the required column `pickUpAddress` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pickUpCityId` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pickUpDate` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pickUpName` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pickUpPhone` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "pickUpAddress" TEXT NOT NULL,
ADD COLUMN     "pickUpCityId" INTEGER NOT NULL,
ADD COLUMN     "pickUpDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "pickUpName" TEXT NOT NULL,
ADD COLUMN     "pickUpPhone" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_pickUpCityId_fkey" FOREIGN KEY ("pickUpCityId") REFERENCES "City"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
