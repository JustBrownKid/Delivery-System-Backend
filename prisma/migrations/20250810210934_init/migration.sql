-- CreateTable
CREATE TABLE "orderDetails" (
    "id" SERIAL NOT NULL,
    "kg" INTEGER NOT NULL,
    "cm" INTEGER NOT NULL,
    "OrderId" INTEGER NOT NULL,
    "Images" TEXT[],

    CONSTRAINT "orderDetails_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "orderDetails" ADD CONSTRAINT "orderDetails_OrderId_fkey" FOREIGN KEY ("OrderId") REFERENCES "Order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
