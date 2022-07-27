/*
  Warnings:

  - You are about to drop the column `volunteerId` on the `Center` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Center" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);
INSERT INTO "new_Center" ("id", "name") SELECT "id", "name" FROM "Center";
DROP TABLE "Center";
ALTER TABLE "new_Center" RENAME TO "Center";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
