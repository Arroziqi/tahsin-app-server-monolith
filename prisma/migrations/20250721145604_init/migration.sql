-- CreateTable
CREATE TABLE "academic_calendar" (
    "id" SERIAL NOT NULL,
    "academic_period_id" INTEGER NOT NULL,
    "event_id" INTEGER NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "created_by" INTEGER,
    "updated_at" TIMESTAMP(3),
    "updated_by" INTEGER,

    CONSTRAINT "academic_calendar_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "academic_calendar" ADD CONSTRAINT "academic_calendar_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "academic_calendar" ADD CONSTRAINT "academic_calendar_academic_period_id_fkey" FOREIGN KEY ("academic_period_id") REFERENCES "academic_period"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
