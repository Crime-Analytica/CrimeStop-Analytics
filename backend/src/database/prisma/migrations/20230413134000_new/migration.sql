/*
  Warnings:

  - You are about to drop the `ForumMembership` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ForumMembership" DROP CONSTRAINT "ForumMembership_civilianId_fkey";

-- DropForeignKey
ALTER TABLE "ForumMembership" DROP CONSTRAINT "ForumMembership_forumId_fkey";

-- DropTable
DROP TABLE "ForumMembership";
