/*
  Warnings:

  - You are about to drop the column `time` on the `time` table. All the data in the column will be lost.
  - Added the required column `endTime` to the `time` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startTime` to the `time` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "time" DROP COLUMN "time",
ADD COLUMN     "endTime" INTEGER NOT NULL,
ADD COLUMN     "startTime" INTEGER NOT NULL;
