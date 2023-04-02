/*
  Warnings:

  - You are about to drop the column `forumId` on the `Civilian` table. All the data in the column will be lost.
  - Added the required column `userId` to the `Forum` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Civilian" DROP CONSTRAINT "Civilian_forumId_fkey";

-- AlterTable
ALTER TABLE "Civilian" DROP COLUMN "forumId";

-- AlterTable
ALTER TABLE "Forum" ADD COLUMN     "userId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Forum" ADD CONSTRAINT "Forum_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Civilian"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
