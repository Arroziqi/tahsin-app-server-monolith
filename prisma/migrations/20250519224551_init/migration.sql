/*
  Warnings:

  - You are about to drop the column `student_id` on the `transaction` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "transaction" DROP CONSTRAINT "transaction_student_id_fkey";

-- AlterTable
ALTER TABLE "transaction" DROP COLUMN "student_id";
