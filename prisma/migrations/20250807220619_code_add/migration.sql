/*
  Warnings:

  - Added the required column `Code` to the `City` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "City" ADD COLUMN     "Code" TEXT NOT NULL;
