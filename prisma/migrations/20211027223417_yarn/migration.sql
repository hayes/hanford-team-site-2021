-- CreateTable
CREATE TABLE "CommentThread" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CommentThread_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Comment" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "threadId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "comment" TEXT NOT NULL,

    CONSTRAINT "Comment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DumbPiCommand" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "command" TEXT NOT NULL,
    "type" TEXT NOT NULL,

    CONSTRAINT "DumbPiCommand_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DrinkIngredient" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT NOT NULL,

    CONSTRAINT "DrinkIngredient_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DrinkPump" (
    "id" TEXT NOT NULL,
    "pin" INTEGER NOT NULL,
    "enabled" BOOLEAN NOT NULL DEFAULT true,
    "ingredientId" TEXT NOT NULL,

    CONSTRAINT "DrinkPump_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "DumbPiCommand_createdAt_key" ON "DumbPiCommand"("createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "DrinkIngredient_createdAt_key" ON "DrinkIngredient"("createdAt");

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_threadId_fkey" FOREIGN KEY ("threadId") REFERENCES "CommentThread"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DrinkPump" ADD CONSTRAINT "DrinkPump_ingredientId_fkey" FOREIGN KEY ("ingredientId") REFERENCES "DrinkIngredient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
