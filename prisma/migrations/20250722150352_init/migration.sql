-- CreateTable
CREATE TABLE "payment_fee" (
    "id" SERIAL NOT NULL,
    "academic_period_id" INTEGER NOT NULL,
    "feeType" TEXT NOT NULL,
    "amount" DECIMAL(65,30) NOT NULL,
    "description" TEXT,
    "due_date" TIMESTAMP(3) NOT NULL,
    "is_invoiced" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "created_by" INTEGER,
    "updated_at" TIMESTAMP(3),
    "updated_by" INTEGER,

    CONSTRAINT "payment_fee_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "payment_fee_academic_period_id_feeType_key" ON "payment_fee"("academic_period_id", "feeType");

-- AddForeignKey
ALTER TABLE "payment_fee" ADD CONSTRAINT "payment_fee_academic_period_id_fkey" FOREIGN KEY ("academic_period_id") REFERENCES "academic_period"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
