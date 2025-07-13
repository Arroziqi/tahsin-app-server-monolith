/*
  Warnings:

  - You are about to drop the column `createdAt` on the `academic_period` table. All the data in the column will be lost.
  - You are about to drop the column `createdBy` on the `academic_period` table. All the data in the column will be lost.
  - You are about to drop the column `deletedAt` on the `academic_period` table. All the data in the column will be lost.
  - You are about to drop the column `deletedBy` on the `academic_period` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `academic_period` table. All the data in the column will be lost.
  - You are about to drop the column `updatedBy` on the `academic_period` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "academic_period" DROP COLUMN "createdAt",
DROP COLUMN "createdBy",
DROP COLUMN "deletedAt",
DROP COLUMN "deletedBy",
DROP COLUMN "updatedAt",
DROP COLUMN "updatedBy",
ADD COLUMN     "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "created_by" INTEGER,
ADD COLUMN     "updated_at" TIMESTAMP(3),
ADD COLUMN     "updated_by" INTEGER;
