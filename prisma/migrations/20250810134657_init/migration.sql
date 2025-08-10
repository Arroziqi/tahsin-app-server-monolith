/*
  Warnings:

  - Added the required column `academic_period_id` to the `enrollment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "enrollment" ADD COLUMN     "academic_period_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "enrollment" ADD CONSTRAINT "enrollment_academic_period_id_fkey" FOREIGN KEY ("academic_period_id") REFERENCES "academic_period"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
