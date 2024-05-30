/*
  Warnings:

  - You are about to drop the column `content` on the `Todo` table. All the data in the column will be lost.
  - You are about to drop the column `disclaimer` on the `Todo` table. All the data in the column will be lost.
  - You are about to drop the column `quote` on the `Todo` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `Todo` table. All the data in the column will be lost.
  - Added the required column `body` to the `Todo` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Todo" DROP COLUMN "content",
DROP COLUMN "disclaimer",
DROP COLUMN "quote",
DROP COLUMN "title",
ADD COLUMN     "body" TEXT NOT NULL,
ADD COLUMN     "done" BOOLEAN NOT NULL DEFAULT false;
