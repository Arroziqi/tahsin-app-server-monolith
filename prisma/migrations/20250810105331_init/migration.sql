-- DropForeignKey
ALTER TABLE "student" DROP CONSTRAINT "student_class_id_fkey";

-- AlterTable
ALTER TABLE "student" ALTER COLUMN "class_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "student" ADD CONSTRAINT "student_class_id_fkey" FOREIGN KEY ("class_id") REFERENCES "class"("id") ON DELETE SET NULL ON UPDATE CASCADE;
