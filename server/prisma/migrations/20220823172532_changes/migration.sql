-- CreateTable
CREATE TABLE "HasSkillTag" (
    "opportunityId" INTEGER NOT NULL,
    "skillId" INTEGER NOT NULL,
    CONSTRAINT "HasSkillTag_skillId_fkey" FOREIGN KEY ("skillId") REFERENCES "Skill" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "HasSkillTag_opportunityId_fkey" FOREIGN KEY ("opportunityId") REFERENCES "Opportunity" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "HasSkillTag_opportunityId_skillId_key" ON "HasSkillTag"("opportunityId", "skillId");
