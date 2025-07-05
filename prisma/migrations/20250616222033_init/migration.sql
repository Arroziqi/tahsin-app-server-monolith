-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'ADMIN', 'STUDENT', 'TEACHER');

-- AlterTable
ALTER TABLE "user" ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'USER';
