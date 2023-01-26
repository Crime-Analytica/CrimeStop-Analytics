/*
  Warnings:

  - The `wantedFor` column on the `Criminal` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `imageUrl` column on the `Criminal` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Civilian" ADD COLUMN     "role" TEXT NOT NULL DEFAULT 'civilian';

-- AlterTable
ALTER TABLE "Criminal" DROP COLUMN "wantedFor",
ADD COLUMN     "wantedFor" TEXT[],
DROP COLUMN "imageUrl",
ADD COLUMN     "imageUrl" TEXT[];

-- CreateTable
CREATE TABLE "Police" (
    "id" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "badgeNumber" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'police-admin',

    CONSTRAINT "Police_pkey" PRIMARY KEY ("id")
);
