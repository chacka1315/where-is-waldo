/*
  Warnings:

  - You are about to drop the `_BoardToCharacter` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_BoardToCharacter" DROP CONSTRAINT "_BoardToCharacter_A_fkey";

-- DropForeignKey
ALTER TABLE "_BoardToCharacter" DROP CONSTRAINT "_BoardToCharacter_B_fkey";

-- DropTable
DROP TABLE "_BoardToCharacter";
