/*
  Warnings:

  - You are about to drop the column `policeId` on the `Report` table. All the data in the column will be lost.
  - You are about to drop the `_ForumUser` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `userId` to the `Forum` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Report" DROP CONSTRAINT "Report_policeId_fkey";

-- DropForeignKey
ALTER TABLE "_ForumUser" DROP CONSTRAINT "_ForumUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_ForumUser" DROP CONSTRAINT "_ForumUser_B_fkey";

-- AlterTable
ALTER TABLE "Forum" ADD COLUMN     "userId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Report" DROP COLUMN "policeId";

-- DropTable
DROP TABLE "_ForumUser";

-- AddForeignKey
ALTER TABLE "Forum" ADD CONSTRAINT "Forum_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Civilian"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
