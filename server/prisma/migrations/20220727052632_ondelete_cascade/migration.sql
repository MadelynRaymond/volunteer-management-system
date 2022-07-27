-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Profile" (
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "bio" TEXT,
    "address" TEXT NOT NULL,
    "homePhoneNumber" TEXT,
    "workPhoneNumber" TEXT,
    "cellPhoneNumber" TEXT,
    "email" TEXT NOT NULL,
    "education" TEXT,
    "currentLicenses" TEXT,
    "driversLicenseOnFile" BOOLEAN NOT NULL,
    "socialSecurityOnFile" BOOLEAN NOT NULL,
    "approvalStatus" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    CONSTRAINT "Profile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Profile" ("address", "approvalStatus", "bio", "cellPhoneNumber", "currentLicenses", "driversLicenseOnFile", "education", "email", "firstName", "homePhoneNumber", "lastName", "socialSecurityOnFile", "userId", "workPhoneNumber") SELECT "address", "approvalStatus", "bio", "cellPhoneNumber", "currentLicenses", "driversLicenseOnFile", "education", "email", "firstName", "homePhoneNumber", "lastName", "socialSecurityOnFile", "userId", "workPhoneNumber" FROM "Profile";
DROP TABLE "Profile";
ALTER TABLE "new_Profile" RENAME TO "Profile";
CREATE UNIQUE INDEX "Profile_userId_key" ON "Profile"("userId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
