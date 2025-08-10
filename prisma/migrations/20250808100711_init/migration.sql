/*
  Warnings:

  - You are about to drop the column `student_status_id` on the `student` table. All the data in the column will be lost.
  - You are about to drop the `student_status` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "StudentStatusEnum" AS ENUM ('ACTIVE', 'INACTIVE', 'DROP_OUT', 'GRADUATED', 'ON_LEAVE');

-- DropForeignKey
ALTER TABLE "student" DROP CONSTRAINT "student_student_status_id_fkey";

-- AlterTable
ALTER TABLE "student" DROP COLUMN "student_status_id",
ADD COLUMN     "student_status" "StudentStatusEnum" DEFAULT 'INACTIVE';

-- DropTable
DROP TABLE "student_status";
