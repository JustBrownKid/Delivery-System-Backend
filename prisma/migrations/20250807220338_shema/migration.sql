-- AlterTable
ALTER TABLE "Shipper" ADD COLUMN     "cityId" INTEGER;

-- CreateTable
CREATE TABLE "Order" (
    "id" SERIAL NOT NULL,
    "cusName" TEXT NOT NULL,
    "cusPhone" TEXT NOT NULL,
    "cusAddress" TEXT NOT NULL,
    "cod" DOUBLE PRECISION NOT NULL,
    "note" TEXT NOT NULL,
    "cityId" INTEGER,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "State" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "State_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "City" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "stateId" INTEGER NOT NULL,
    "status" BOOLEAN NOT NULL,

    CONSTRAINT "City_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "State_name_key" ON "State"("name");

-- AddForeignKey
ALTER TABLE "Shipper" ADD CONSTRAINT "Shipper_cityId_fkey" FOREIGN KEY ("cityId") REFERENCES "City"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_cityId_fkey" FOREIGN KEY ("cityId") REFERENCES "City"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "City" ADD CONSTRAINT "City_stateId_fkey" FOREIGN KEY ("stateId") REFERENCES "State"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
