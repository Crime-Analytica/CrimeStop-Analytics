/*
  Warnings:

  - You are about to drop the column `userId` on the `Forum` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Forum" DROP CONSTRAINT "Forum_userId_fkey";

-- AlterTable
ALTER TABLE "Forum" DROP COLUMN "userId";

-- CreateTable
CREATE TABLE "ForumMembership" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "civilianId" TEXT NOT NULL,
    "forumId" INTEGER NOT NULL,

    CONSTRAINT "ForumMembership_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ForumMembership" ADD CONSTRAINT "ForumMembership_civilianId_fkey" FOREIGN KEY ("civilianId") REFERENCES "Civilian"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ForumMembership" ADD CONSTRAINT "ForumMembership_forumId_fkey" FOREIGN KEY ("forumId") REFERENCES "Forum"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
