/*
  Warnings:

  - You are about to drop the column `isActive` on the `class_schedule` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "ClassScheduleStatus" AS ENUM ('DRAFT', 'PUBLISHED');

-- AlterTable
ALTER TABLE "class_schedule" DROP COLUMN "isActive",
ADD COLUMN     "is_active" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "status" "ClassScheduleStatus" NOT NULL DEFAULT 'DRAFT';
