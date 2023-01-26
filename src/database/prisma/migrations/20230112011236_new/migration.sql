/*
  Warnings:

  - You are about to drop the `criminal` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable

-- CreateTable
CREATE TABLE "Criminal" (
    "id" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "wantedFor" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,

    CONSTRAINT "Criminal_pkey" PRIMARY KEY ("id")
);
