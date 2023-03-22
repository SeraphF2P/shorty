/*
  Warnings:

  - A unique constraint covering the columns `[link]` on the table `Link` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[shortLink]` on the table `Link` will be added. If there are existing duplicate values, this will fail.
  - Made the column `link` on table `Link` required. This step will fail if there are existing NULL values in that column.
  - Made the column `shortLink` on table `Link` required. This step will fail if there are existing NULL values in that column.
  - Made the column `userId` on table `Link` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Link" DROP CONSTRAINT "Link_userId_fkey";

-- AlterTable
ALTER TABLE "Link" ALTER COLUMN "link" SET NOT NULL,
ALTER COLUMN "shortLink" SET NOT NULL,
ALTER COLUMN "userId" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Link_link_key" ON "Link"("link");

-- CreateIndex
CREATE UNIQUE INDEX "Link_shortLink_key" ON "Link"("shortLink");

-- AddForeignKey
ALTER TABLE "Link" ADD CONSTRAINT "Link_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
