/*
  Warnings:

  - Changed the type of `feeType` on the `payment_fee` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "FeeType" AS ENUM ('FULL_TUITION', 'DOWN_PAYMENT', 'FINAL_INSTALLMENT');

-- AlterTable
ALTER TABLE "payment_fee" DROP COLUMN "feeType",
ADD COLUMN     "feeType" "FeeType" NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "payment_fee_academic_period_id_feeType_key" ON "payment_fee"("academic_period_id", "feeType");
