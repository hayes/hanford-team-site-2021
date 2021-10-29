-- DropForeignKey
ALTER TABLE "DrinkPump" DROP CONSTRAINT "DrinkPump_ingredientId_fkey";

-- AlterTable
ALTER TABLE "DrinkPump" ALTER COLUMN "ingredientId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "DrinkPump" ADD CONSTRAINT "DrinkPump_ingredientId_fkey" FOREIGN KEY ("ingredientId") REFERENCES "DrinkIngredient"("id") ON DELETE SET NULL ON UPDATE CASCADE;
