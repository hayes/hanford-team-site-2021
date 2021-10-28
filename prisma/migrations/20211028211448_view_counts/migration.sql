-- CreateTable
CREATE TABLE "ViewCount" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "count" INTEGER NOT NULL DEFAULT 1,

    CONSTRAINT "ViewCount_pkey" PRIMARY KEY ("id")
);
