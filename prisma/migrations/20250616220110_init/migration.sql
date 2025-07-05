/*
  Warnings:

  - Added the required column `class_type` to the `enrollment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `date_of_birth` to the `enrollment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `enrollment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `full_name` to the `enrollment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `last_education` to the `enrollment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `motivation` to the `enrollment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `no_telp` to the `enrollment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `program` to the `enrollment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `time_of_study` to the `enrollment` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Education" AS ENUM ('SMA', 'SARJANA', 'MAGISTER');

-- CreateEnum
CREATE TYPE "Program" AS ENUM ('DASAR', 'MENENGAH', 'LANJUTAN');

-- CreateEnum
CREATE TYPE "ClassType" AS ENUM ('ONLINE', 'OFFLINE');

-- CreateEnum
CREATE TYPE "TimeOfStudy" AS ENUM ('MORNING', 'AFTERNOON');

-- AlterTable
ALTER TABLE "enrollment" ADD COLUMN     "class_type" "ClassType" NOT NULL,
ADD COLUMN     "date_of_birth" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "date_of_reservation" TIMESTAMP(3),
ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "full_name" TEXT NOT NULL,
ADD COLUMN     "last_education" "Education" NOT NULL,
ADD COLUMN     "motivation" TEXT NOT NULL,
ADD COLUMN     "no_telp" TEXT NOT NULL,
ADD COLUMN     "program" "Program" NOT NULL,
ADD COLUMN     "time_of_study" "TimeOfStudy" NOT NULL,
ADD COLUMN     "voice_recording" TEXT;
