-- DropForeignKey
ALTER TABLE "DrinkOrder" DROP CONSTRAINT "DrinkOrder_commandId_fkey";

-- AddForeignKey
ALTER TABLE "DrinkOrder" ADD CONSTRAINT "DrinkOrder_commandId_fkey" FOREIGN KEY ("commandId") REFERENCES "DumbPiCommand"("id") ON DELETE CASCADE ON UPDATE CASCADE;
