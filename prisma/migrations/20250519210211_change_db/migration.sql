/*
  Warnings:

  - A unique constraint covering the columns `[day]` on the table `day` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `attendance` to the `attendance` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `account_number` on the `bank_account` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Made the column `bill` on table `bill` required. This step will fail if there are existing NULL values in that column.
  - Made the column `remain_bill` on table `bill` required. This step will fail if there are existing NULL values in that column.
  - Made the column `user_id` on table `enrollment` required. This step will fail if there are existing NULL values in that column.
  - Made the column `class_id` on table `enrollment` required. This step will fail if there are existing NULL values in that column.
  - Made the column `teacher_id` on table `schedule` required. This step will fail if there are existing NULL values in that column.
  - Made the column `day_id` on table `schedule` required. This step will fail if there are existing NULL values in that column.
  - Made the column `time_id` on table `schedule` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `value` to the `score` table without a default value. This is not possible if the table is not empty.
  - Made the column `teacher_id` on table `task` required. This step will fail if there are existing NULL values in that column.
  - Made the column `task` on table `task` required. This step will fail if there are existing NULL values in that column.
  - Made the column `bill_id` on table `transaction` required. This step will fail if there are existing NULL values in that column.
  - Made the column `transaction_type_id` on table `transaction` required. This step will fail if there are existing NULL values in that column.
  - Made the column `transaction_status_id` on table `transaction` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "AttendanceStatus" AS ENUM ('ABSENT', 'PRESENT', 'EXCUSED');

-- DropForeignKey
ALTER TABLE "enrollment" DROP CONSTRAINT "enrollment_class_id_fkey";

-- DropForeignKey
ALTER TABLE "enrollment" DROP CONSTRAINT "enrollment_user_id_fkey";

-- DropForeignKey
ALTER TABLE "schedule" DROP CONSTRAINT "schedule_day_id_fkey";

-- DropForeignKey
ALTER TABLE "schedule" DROP CONSTRAINT "schedule_teacher_id_fkey";

-- DropForeignKey
ALTER TABLE "schedule" DROP CONSTRAINT "schedule_time_id_fkey";

-- DropForeignKey
ALTER TABLE "task" DROP CONSTRAINT "task_teacher_id_fkey";

-- DropForeignKey
ALTER TABLE "transaction" DROP CONSTRAINT "transaction_bill_id_fkey";

-- DropForeignKey
ALTER TABLE "transaction" DROP CONSTRAINT "transaction_transaction_status_id_fkey";

-- DropForeignKey
ALTER TABLE "transaction" DROP CONSTRAINT "transaction_transaction_type_id_fkey";

-- AlterTable
ALTER TABLE "attendance" ADD COLUMN     "attendance" "AttendanceStatus" NOT NULL;

-- AlterTable
ALTER TABLE "bank_account" DROP COLUMN "account_number",
ADD COLUMN     "account_number" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "bill" ALTER COLUMN "bill" SET NOT NULL,
ALTER COLUMN "remain_bill" SET NOT NULL;

-- AlterTable
ALTER TABLE "enrollment" ALTER COLUMN "user_id" SET NOT NULL,
ALTER COLUMN "class_id" SET NOT NULL;

-- AlterTable
ALTER TABLE "schedule" ALTER COLUMN "teacher_id" SET NOT NULL,
ALTER COLUMN "day_id" SET NOT NULL,
ALTER COLUMN "time_id" SET NOT NULL;

-- AlterTable
ALTER TABLE "score" ADD COLUMN     "value" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "task" ALTER COLUMN "teacher_id" SET NOT NULL,
ALTER COLUMN "task" SET NOT NULL;

-- AlterTable
ALTER TABLE "transaction" ALTER COLUMN "bill_id" SET NOT NULL,
ALTER COLUMN "transaction_type_id" SET NOT NULL,
ALTER COLUMN "transaction_status_id" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "day_day_key" ON "day"("day");

-- AddForeignKey
ALTER TABLE "schedule" ADD CONSTRAINT "schedule_teacher_id_fkey" FOREIGN KEY ("teacher_id") REFERENCES "teacher"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "schedule" ADD CONSTRAINT "schedule_day_id_fkey" FOREIGN KEY ("day_id") REFERENCES "day"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "schedule" ADD CONSTRAINT "schedule_time_id_fkey" FOREIGN KEY ("time_id") REFERENCES "time"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "task" ADD CONSTRAINT "task_teacher_id_fkey" FOREIGN KEY ("teacher_id") REFERENCES "teacher"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transaction" ADD CONSTRAINT "transaction_bill_id_fkey" FOREIGN KEY ("bill_id") REFERENCES "bill"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transaction" ADD CONSTRAINT "transaction_transaction_type_id_fkey" FOREIGN KEY ("transaction_type_id") REFERENCES "transaction_type"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transaction" ADD CONSTRAINT "transaction_transaction_status_id_fkey" FOREIGN KEY ("transaction_status_id") REFERENCES "transaction_status"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "enrollment" ADD CONSTRAINT "enrollment_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "enrollment" ADD CONSTRAINT "enrollment_class_id_fkey" FOREIGN KEY ("class_id") REFERENCES "class"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
