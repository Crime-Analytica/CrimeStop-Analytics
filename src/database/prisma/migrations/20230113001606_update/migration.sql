/*
  Warnings:

  - A unique constraint covering the columns `[username]` on the table `Civilian` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email]` on the table `Police` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `email` to the `Police` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `Police` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Police" ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "password" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Civilian_username_key" ON "Civilian"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Police_email_key" ON "Police"("email");
