-- CreateTable
CREATE TABLE "DumbPiCommand" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "command" TEXT NOT NULL,
    "type" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "DrinkIngredient" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "DrinkPump" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "pin" INTEGER NOT NULL,
    "enabled" BOOLEAN NOT NULL DEFAULT true,
    "ingredientId" TEXT NOT NULL,
    CONSTRAINT "DrinkPump_ingredientId_fkey" FOREIGN KEY ("ingredientId") REFERENCES "DrinkIngredient" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "DumbPiCommand_createdAt_key" ON "DumbPiCommand"("createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "DrinkIngredient_createdAt_key" ON "DrinkIngredient"("createdAt");
