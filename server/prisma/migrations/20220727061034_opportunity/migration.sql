/*
  Warnings:

  - The primary key for the `Center` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `centerName` on the `VolunteerPrefers` table. All the data in the column will be lost.
  - Added the required column `id` to the `Center` table without a default value. This is not possible if the table is not empty.
  - Added the required column `centerId` to the `VolunteerPrefers` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "Opportunity" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "startTime" TEXT NOT NULL,
    "endTime" TEXT NOT NULL,
    "location" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    CONSTRAINT "Opportunity_location_fkey" FOREIGN KEY ("location") REFERENCES "Center" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Center" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "volunteerId" INTEGER NOT NULL
);
INSERT INTO "new_Center" ("name", "volunteerId") SELECT "name", "volunteerId" FROM "Center";
DROP TABLE "Center";
ALTER TABLE "new_Center" RENAME TO "Center";
CREATE UNIQUE INDEX "Center_volunteerId_key" ON "Center"("volunteerId");
CREATE TABLE "new_VolunteerPrefers" (
    "volunteerId" INTEGER NOT NULL,
    "centerId" INTEGER NOT NULL,
    CONSTRAINT "VolunteerPrefers_volunteerId_fkey" FOREIGN KEY ("volunteerId") REFERENCES "Profile" ("userId") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "VolunteerPrefers_centerId_fkey" FOREIGN KEY ("centerId") REFERENCES "Center" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_VolunteerPrefers" ("volunteerId") SELECT "volunteerId" FROM "VolunteerPrefers";
DROP TABLE "VolunteerPrefers";
ALTER TABLE "new_VolunteerPrefers" RENAME TO "VolunteerPrefers";
CREATE UNIQUE INDEX "VolunteerPrefers_volunteerId_key" ON "VolunteerPrefers"("volunteerId");
CREATE UNIQUE INDEX "VolunteerPrefers_centerId_key" ON "VolunteerPrefers"("centerId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "Opportunity_location_key" ON "Opportunity"("location");
