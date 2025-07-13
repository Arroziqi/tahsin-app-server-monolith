/*
  Warnings:

  - You are about to drop the column `class_id` on the `schedule` table. All the data in the column will be lost.
  - You are about to drop the column `teacher_id` on the `schedule` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "schedule" DROP CONSTRAINT "schedule_class_id_fkey";

-- DropForeignKey
ALTER TABLE "schedule" DROP CONSTRAINT "schedule_teacher_id_fkey";

-- AlterTable
ALTER TABLE "schedule" DROP COLUMN "class_id",
DROP COLUMN "teacher_id",
ADD COLUMN     "classId" INTEGER,
ADD COLUMN     "classType" "ClassType" NOT NULL DEFAULT 'OFFLINE',
ADD COLUMN     "teacherId" INTEGER;

-- AddForeignKey
ALTER TABLE "schedule" ADD CONSTRAINT "schedule_teacherId_fkey" FOREIGN KEY ("teacherId") REFERENCES "teacher"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "schedule" ADD CONSTRAINT "schedule_classId_fkey" FOREIGN KEY ("classId") REFERENCES "class"("id") ON DELETE SET NULL ON UPDATE CASCADE;
