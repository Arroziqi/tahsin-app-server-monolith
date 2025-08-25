/*
  Warnings:

  - You are about to drop the column `transaction_status_id` on the `transaction` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "TransactionStatusEnum" AS ENUM ('PENDING', 'SUCCESS', 'FAILED', 'CANCELLED');

-- DropForeignKey
ALTER TABLE "transaction" DROP CONSTRAINT "transaction_transaction_status_id_fkey";

-- AlterTable
ALTER TABLE "transaction" DROP COLUMN "transaction_status_id",
ADD COLUMN     "transaction_status" "TransactionStatusEnum" NOT NULL DEFAULT 'PENDING';
