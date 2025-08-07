-- AlterTable
ALTER TABLE "User" ADD COLUMN     "userType" TEXT NOT NULL DEFAULT 'user';

-- CreateTable
CREATE TABLE "Shipper" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "shipperId" TEXT NOT NULL,

    CONSTRAINT "Shipper_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Shipper_email_key" ON "Shipper"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Shipper_shipperId_key" ON "Shipper"("shipperId");
