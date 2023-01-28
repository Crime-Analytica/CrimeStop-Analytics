-- CreateTable
CREATE TABLE "addMissingPerson" (
    "id" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "lastSeen" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,

    CONSTRAINT "addMissingPerson_pkey" PRIMARY KEY ("id")
);
