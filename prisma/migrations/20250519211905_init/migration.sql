-- AlterTable
ALTER TABLE "admin" ALTER COLUMN "no_admin" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "bank_account" ALTER COLUMN "account_number" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "teacher" ALTER COLUMN "nip" SET DATA TYPE TEXT,
ALTER COLUMN "account_number" SET DATA TYPE TEXT;
