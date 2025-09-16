/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `ClassSchedule` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "student" ADD COLUMN     "class_schedule_id" INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "ClassSchedule_name_key" ON "ClassSchedule"("name");

-- AddForeignKey
ALTER TABLE "student" ADD CONSTRAINT "student_class_schedule_id_fkey" FOREIGN KEY ("class_schedule_id") REFERENCES "ClassSchedule"("id") ON DELETE SET NULL ON UPDATE CASCADE;
