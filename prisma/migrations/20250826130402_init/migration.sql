-- AlterTable
ALTER TABLE "transaction" ADD COLUMN     "student_id" INTEGER;

-- AddForeignKey
ALTER TABLE "transaction" ADD CONSTRAINT "transaction_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "student"("id") ON DELETE SET NULL ON UPDATE CASCADE;
