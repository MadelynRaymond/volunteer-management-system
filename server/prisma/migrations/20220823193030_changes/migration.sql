/*
  Warnings:

  - Added the required column `date` to the `Opportunity` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Opportunity" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "startTime" TEXT NOT NULL,
    "endTime" TEXT NOT NULL,
    "date" DATETIME NOT NULL,
    "centerId" INTEGER NOT NULL,
    "location" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    CONSTRAINT "Opportunity_centerId_fkey" FOREIGN KEY ("centerId") REFERENCES "Center" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Opportunity" ("centerId", "description", "endTime", "id", "location", "name", "startTime") SELECT "centerId", "description", "endTime", "id", "location", "name", "startTime" FROM "Opportunity";
DROP TABLE "Opportunity";
ALTER TABLE "new_Opportunity" RENAME TO "Opportunity";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
