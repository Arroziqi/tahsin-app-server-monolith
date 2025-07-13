-- CreateTable
CREATE TABLE "academic_period" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "description" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdBy" INTEGER,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "updatedBy" INTEGER,
    "deletedAt" TIMESTAMP(3),
    "deletedBy" INTEGER,

    CONSTRAINT "academic_period_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_AcademicPeriodToSchedule" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_AcademicPeriodToSchedule_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "academic_period_name_key" ON "academic_period"("name");

-- CreateIndex
CREATE INDEX "_AcademicPeriodToSchedule_B_index" ON "_AcademicPeriodToSchedule"("B");

-- AddForeignKey
ALTER TABLE "_AcademicPeriodToSchedule" ADD CONSTRAINT "_AcademicPeriodToSchedule_A_fkey" FOREIGN KEY ("A") REFERENCES "academic_period"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AcademicPeriodToSchedule" ADD CONSTRAINT "_AcademicPeriodToSchedule_B_fkey" FOREIGN KEY ("B") REFERENCES "schedule"("id") ON DELETE CASCADE ON UPDATE CASCADE;
