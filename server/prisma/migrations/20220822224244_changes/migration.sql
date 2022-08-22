-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_HasSkill" (
    "volunteerId" INTEGER NOT NULL,
    "skillId" INTEGER NOT NULL,
    CONSTRAINT "HasSkill_skillId_fkey" FOREIGN KEY ("skillId") REFERENCES "Skill" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "HasSkill_volunteerId_fkey" FOREIGN KEY ("volunteerId") REFERENCES "Profile" ("userId") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_HasSkill" ("skillId", "volunteerId") SELECT "skillId", "volunteerId" FROM "HasSkill";
DROP TABLE "HasSkill";
ALTER TABLE "new_HasSkill" RENAME TO "HasSkill";
CREATE UNIQUE INDEX "HasSkill_volunteerId_skillId_key" ON "HasSkill"("volunteerId", "skillId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
