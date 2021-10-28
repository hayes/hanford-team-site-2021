/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `ViewCount` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "ViewCount_name_key" ON "ViewCount"("name");
