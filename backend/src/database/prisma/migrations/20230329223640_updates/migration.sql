/*
  Warnings:

  - You are about to drop the column `userId` on the `Forum` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Forum" DROP CONSTRAINT "Forum_userId_fkey";

-- AlterTable
ALTER TABLE "Civilian" ADD COLUMN     "forumId" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "Forum" DROP COLUMN "userId";

-- AddForeignKey
ALTER TABLE "Civilian" ADD CONSTRAINT "Civilian_forumId_fkey" FOREIGN KEY ("forumId") REFERENCES "Forum"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
