-- CreateTable
CREATE TABLE "ranking" (
    "id" SERIAL NOT NULL,
    "playerName" VARCHAR(50) NOT NULL,
    "time" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ranking_pkey" PRIMARY KEY ("id")
);
