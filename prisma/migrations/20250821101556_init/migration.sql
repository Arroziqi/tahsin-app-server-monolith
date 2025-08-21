-- DropForeignKey
ALTER TABLE "transaction" DROP CONSTRAINT "transaction_bank_account_id_fkey";

-- AlterTable
ALTER TABLE "transaction" ALTER COLUMN "bank_account_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "transaction" ADD CONSTRAINT "transaction_bank_account_id_fkey" FOREIGN KEY ("bank_account_id") REFERENCES "bank_account"("id") ON DELETE SET NULL ON UPDATE CASCADE;
