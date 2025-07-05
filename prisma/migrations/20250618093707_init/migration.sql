-- CreateTable
CREATE TABLE "announcement" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "created_by" INTEGER,
    "updated_at" TIMESTAMP(3),
    "updated_by" INTEGER,

    CONSTRAINT "announcement_pkey" PRIMARY KEY ("id")
);
