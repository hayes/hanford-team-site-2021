-- CreateTable
CREATE TABLE "DrinkOrder" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT NOT NULL,
    "commandId" TEXT NOT NULL,

    CONSTRAINT "DrinkOrder_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "DrinkOrder_createdAt_key" ON "DrinkOrder"("createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "DrinkOrder_commandId_key" ON "DrinkOrder"("commandId");

-- AddForeignKey
ALTER TABLE "DrinkOrder" ADD CONSTRAINT "DrinkOrder_commandId_fkey" FOREIGN KEY ("commandId") REFERENCES "DumbPiCommand"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
