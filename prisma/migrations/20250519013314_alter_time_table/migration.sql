/*
  Warnings:

  - Changed the type of `time` on the `time` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "time" DROP COLUMN "time",
ADD COLUMN     "time" TIMESTAMP(3) NOT NULL;
