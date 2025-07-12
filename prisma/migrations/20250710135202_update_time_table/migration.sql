/*
  Warnings:

  - Added the required column `session` to the `time` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "time" ADD COLUMN     "session" TEXT NOT NULL;
