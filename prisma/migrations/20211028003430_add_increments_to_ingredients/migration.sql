-- AlterTable
ALTER TABLE "DrinkIngredient" ADD COLUMN     "increment" INTEGER NOT NULL DEFAULT 1,
ADD COLUMN     "max" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "multiplier" INTEGER NOT NULL DEFAULT 1;