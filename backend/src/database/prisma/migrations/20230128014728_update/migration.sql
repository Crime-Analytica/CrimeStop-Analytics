/*
  Warnings:

  - You are about to drop the `addMissingPerson` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "addMissingPerson";

-- CreateTable
CREATE TABLE "MissingPerson" (
    "id" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "age" INTEGER NOT NULL,
    "lastSeen" TEXT NOT NULL,
    "dateMissing" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,

    CONSTRAINT "MissingPerson_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DistressSignal" (
    "id" TEXT NOT NULL,
    "latitude" DOUBLE PRECISION NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "DistressSignal_pkey" PRIMARY KEY ("id")
);
