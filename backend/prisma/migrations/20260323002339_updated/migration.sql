/*
  Warnings:

  - A unique constraint covering the columns `[userId,teamId]` on the table `Invitation` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Invitation_userId_teamId_key" ON "Invitation"("userId", "teamId");
