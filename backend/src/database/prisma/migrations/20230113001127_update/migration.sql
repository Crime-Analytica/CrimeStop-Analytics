/*
  Warnings:

  - Added the required column `rank` to the `Police` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Police" ADD COLUMN     "rank" TEXT NOT NULL;
