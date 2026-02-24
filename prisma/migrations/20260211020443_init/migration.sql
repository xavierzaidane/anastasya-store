-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "items" TEXT[] DEFAULT ARRAY[]::TEXT[];
