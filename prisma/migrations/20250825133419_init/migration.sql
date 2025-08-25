/*
  Warnings:

  - You are about to drop the column `transaction_type_id` on the `transaction` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "transaction" DROP CONSTRAINT "transaction_transaction_type_id_fkey";

-- AlterTable
ALTER TABLE "transaction" DROP COLUMN "transaction_type_id",
ADD COLUMN     "transactionTypeId" INTEGER,
ADD COLUMN     "transaction_type" "FeeType" NOT NULL DEFAULT 'DOWN_PAYMENT';

-- AddForeignKey
ALTER TABLE "transaction" ADD CONSTRAINT "transaction_transactionTypeId_fkey" FOREIGN KEY ("transactionTypeId") REFERENCES "transaction_type"("id") ON DELETE SET NULL ON UPDATE CASCADE;
