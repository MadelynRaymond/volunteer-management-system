/*
  Warnings:

  - The primary key for the `Availability` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `volunteerId` on the `Availability` table. All the data in the column will be lost.
  - Added the required column `id` to the `Availability` table without a default value. This is not possible if the table is not empty.
  - Added the required column `time` to the `Availability` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "IsAvailable" (
    "volunteerId" INTEGER NOT NULL,
    "availabilityId" INTEGER NOT NULL,
    CONSTRAINT "IsAvailable_volunteerId_fkey" FOREIGN KEY ("volunteerId") REFERENCES "Profile" ("userId") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "IsAvailable_availabilityId_fkey" FOREIGN KEY ("availabilityId") REFERENCES "Availability" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Availability" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "time" TEXT NOT NULL
);
DROP TABLE "Availability";
ALTER TABLE "new_Availability" RENAME TO "Availability";
CREATE UNIQUE INDEX "Availability_time_key" ON "Availability"("time");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "IsAvailable_volunteerId_availabilityId_key" ON "IsAvailable"("volunteerId", "availabilityId");
