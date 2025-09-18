-- AlterTable
ALTER TABLE "student" ADD COLUMN     "preferred_schedule_id" INTEGER;

-- AddForeignKey
ALTER TABLE "student" ADD CONSTRAINT "student_preferred_schedule_id_fkey" FOREIGN KEY ("preferred_schedule_id") REFERENCES "schedule"("id") ON DELETE SET NULL ON UPDATE CASCADE;
