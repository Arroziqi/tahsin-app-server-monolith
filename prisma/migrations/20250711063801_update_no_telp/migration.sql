/*
  Warnings:

  - A unique constraint covering the columns `[no_telp]` on the table `enrollment` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[no_telp]` on the table `teacher` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "enrollment_no_telp_key" ON "enrollment"("no_telp");

-- CreateIndex
CREATE UNIQUE INDEX "teacher_no_telp_key" ON "teacher"("no_telp");
