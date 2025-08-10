-- DropForeignKey
ALTER TABLE "enrollment" DROP CONSTRAINT "enrollment_class_id_fkey";

-- AlterTable
ALTER TABLE "enrollment" ALTER COLUMN "class_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "enrollment" ADD CONSTRAINT "enrollment_class_id_fkey" FOREIGN KEY ("class_id") REFERENCES "class"("id") ON DELETE SET NULL ON UPDATE CASCADE;
