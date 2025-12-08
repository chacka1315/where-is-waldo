/*
  Warnings:

  - Changed the type of `complexity` on the `Board` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `level` on the `Board` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "Complexity" AS ENUM ('Easy', 'Normal', 'Hard');

-- AlterTable
ALTER TABLE "Board" DROP COLUMN "complexity",
ADD COLUMN     "complexity" "Complexity" NOT NULL,
DROP COLUMN "level",
ADD COLUMN     "level" INTEGER NOT NULL;
