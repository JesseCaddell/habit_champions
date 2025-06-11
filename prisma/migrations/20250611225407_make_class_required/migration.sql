/*
  Warnings:

  - Made the column `archetypeClass` on table `Champion` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Champion" ALTER COLUMN "archetypeClass" SET NOT NULL;
