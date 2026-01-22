-- CreateTable
CREATE TABLE "_BoardToCharacter" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_BoardToCharacter_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_BoardToCharacter_B_index" ON "_BoardToCharacter"("B");

-- AddForeignKey
ALTER TABLE "_BoardToCharacter" ADD CONSTRAINT "_BoardToCharacter_A_fkey" FOREIGN KEY ("A") REFERENCES "Board"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BoardToCharacter" ADD CONSTRAINT "_BoardToCharacter_B_fkey" FOREIGN KEY ("B") REFERENCES "Character"("id") ON DELETE CASCADE ON UPDATE CASCADE;
