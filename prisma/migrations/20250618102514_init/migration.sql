/*
  Warnings:

  - Added the required column `no_telp` to the `teacher` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "teacher" ADD COLUMN     "no_telp" TEXT NOT NULL,
ALTER COLUMN "nip" DROP NOT NULL;
