/*
  Warnings:

  - You are about to drop the column `class` on the `Champion` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Champion" DROP COLUMN "class",
ADD COLUMN     "archetypeClass" TEXT;
