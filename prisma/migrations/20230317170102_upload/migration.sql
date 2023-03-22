/*
  Warnings:

  - A unique constraint covering the columns `[userId,link]` on the table `Link` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Link_link_key";

-- CreateIndex
CREATE UNIQUE INDEX "Link_userId_link_key" ON "Link"("userId", "link");
