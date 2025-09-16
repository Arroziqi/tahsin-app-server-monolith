/*
  Warnings:

  - You are about to drop the column `time_of_study` on the `enrollment` table. All the data in the column will be lost.
  - Added the required column `time_of_study_id` to the `enrollment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "enrollment" DROP COLUMN "time_of_study",
ADD COLUMN     "time_of_study_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "enrollment" ADD CONSTRAINT "enrollment_time_of_study_id_fkey" FOREIGN KEY ("time_of_study_id") REFERENCES "schedule"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
