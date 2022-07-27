-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_VolunteerPrefers" (
    "volunteerId" INTEGER NOT NULL,
    "centerName" TEXT NOT NULL,
    CONSTRAINT "VolunteerPrefers_volunteerId_fkey" FOREIGN KEY ("volunteerId") REFERENCES "Profile" ("userId") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "VolunteerPrefers_centerName_fkey" FOREIGN KEY ("centerName") REFERENCES "Center" ("name") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_VolunteerPrefers" ("centerName", "volunteerId") SELECT "centerName", "volunteerId" FROM "VolunteerPrefers";
DROP TABLE "VolunteerPrefers";
ALTER TABLE "new_VolunteerPrefers" RENAME TO "VolunteerPrefers";
CREATE UNIQUE INDEX "VolunteerPrefers_volunteerId_key" ON "VolunteerPrefers"("volunteerId");
CREATE UNIQUE INDEX "VolunteerPrefers_centerName_key" ON "VolunteerPrefers"("centerName");
CREATE TABLE "new_Availability" (
    "volunteerId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    CONSTRAINT "Availability_volunteerId_fkey" FOREIGN KEY ("volunteerId") REFERENCES "Profile" ("userId") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Availability" ("volunteerId") SELECT "volunteerId" FROM "Availability";
DROP TABLE "Availability";
ALTER TABLE "new_Availability" RENAME TO "Availability";
CREATE TABLE "new_EmergencyContactInfo" (
    "contactName" TEXT NOT NULL,
    "contactHomePhoneNumber" TEXT NOT NULL,
    "contactWorkPhoneNumber" TEXT,
    "contactEmail" TEXT,
    "contactAddress" TEXT,
    "userId" INTEGER NOT NULL,
    CONSTRAINT "EmergencyContactInfo_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Profile" ("userId") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_EmergencyContactInfo" ("contactAddress", "contactEmail", "contactHomePhoneNumber", "contactName", "contactWorkPhoneNumber", "userId") SELECT "contactAddress", "contactEmail", "contactHomePhoneNumber", "contactName", "contactWorkPhoneNumber", "userId" FROM "EmergencyContactInfo";
DROP TABLE "EmergencyContactInfo";
ALTER TABLE "new_EmergencyContactInfo" RENAME TO "EmergencyContactInfo";
CREATE UNIQUE INDEX "EmergencyContactInfo_userId_key" ON "EmergencyContactInfo"("userId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
