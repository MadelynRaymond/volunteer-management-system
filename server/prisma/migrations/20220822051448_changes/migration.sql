/*
  Warnings:

  - A unique constraint covering the columns `[volunteerId,centerId]` on the table `VolunteerPrefers` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "VolunteerPrefers_centerId_key";

-- DropIndex
DROP INDEX "VolunteerPrefers_volunteerId_key";

-- CreateIndex
CREATE UNIQUE INDEX "VolunteerPrefers_volunteerId_centerId_key" ON "VolunteerPrefers"("volunteerId", "centerId");
