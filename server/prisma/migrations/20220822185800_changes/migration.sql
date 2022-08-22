-- CreateTable
CREATE TABLE "Skill" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "HasSkill" (
    "volunteerId" INTEGER NOT NULL,
    "skillId" INTEGER NOT NULL,
    CONSTRAINT "HasSkill_skillId_fkey" FOREIGN KEY ("skillId") REFERENCES "Skill" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "HasSkill_volunteerId_fkey" FOREIGN KEY ("volunteerId") REFERENCES "Profile" ("userId") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Skill_name_key" ON "Skill"("name");

-- CreateIndex
CREATE UNIQUE INDEX "HasSkill_volunteerId_skillId_key" ON "HasSkill"("volunteerId", "skillId");
