/*
  Warnings:

  - Added the required column `boardId` to the `ranking` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ranking" ADD COLUMN     "boardId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "ranking" ADD CONSTRAINT "ranking_boardId_fkey" FOREIGN KEY ("boardId") REFERENCES "Board"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
