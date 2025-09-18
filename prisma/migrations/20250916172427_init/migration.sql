/*
  Warnings:

  - You are about to drop the column `class_id` on the `enrollment` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "enrollment" DROP CONSTRAINT "enrollment_class_id_fkey";

-- AlterTable
ALTER TABLE "enrollment" DROP COLUMN "class_id",
ADD COLUMN     "class_schedule_id" INTEGER;

-- AddForeignKey
ALTER TABLE "enrollment" ADD CONSTRAINT "enrollment_class_schedule_id_fkey" FOREIGN KEY ("class_schedule_id") REFERENCES "ClassSchedule"("id") ON DELETE SET NULL ON UPDATE CASCADE;
