-- CreateTable
CREATE TABLE "User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Profile" (
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "bio" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "homePhoneNumber" TEXT,
    "workPhoneNumber" TEXT,
    "cellPhoneNumber" TEXT,
    "email" TEXT NOT NULL,
    "education" TEXT NOT NULL,
    "currentLicenses" TEXT NOT NULL,
    "driversLicenseOnFile" BOOLEAN NOT NULL,
    "socialSecurityOnFile" BOOLEAN NOT NULL,
    "approvalStatus" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    CONSTRAINT "Profile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Availability" (
    "volunteerId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    CONSTRAINT "Availability_volunteerId_fkey" FOREIGN KEY ("volunteerId") REFERENCES "Profile" ("userId") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "VolunteerPrefers" (
    "volunteerId" INTEGER NOT NULL,
    "centerName" TEXT NOT NULL,
    CONSTRAINT "VolunteerPrefers_volunteerId_fkey" FOREIGN KEY ("volunteerId") REFERENCES "Profile" ("userId") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "VolunteerPrefers_centerName_fkey" FOREIGN KEY ("centerName") REFERENCES "Center" ("name") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Center" (
    "name" TEXT NOT NULL PRIMARY KEY,
    "volunteerId" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "EmergencyContactInfo" (
    "contactName" TEXT NOT NULL,
    "contactHomePhoneNumber" TEXT,
    "contactWorkPhoneNumber" TEXT,
    "contactEmail" TEXT,
    "contactAddress" TEXT,
    "userId" INTEGER NOT NULL,
    CONSTRAINT "EmergencyContactInfo_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Profile" ("userId") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Profile_userId_key" ON "Profile"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "VolunteerPrefers_volunteerId_key" ON "VolunteerPrefers"("volunteerId");

-- CreateIndex
CREATE UNIQUE INDEX "VolunteerPrefers_centerName_key" ON "VolunteerPrefers"("centerName");

-- CreateIndex
CREATE UNIQUE INDEX "Center_volunteerId_key" ON "Center"("volunteerId");

-- CreateIndex
CREATE UNIQUE INDEX "EmergencyContactInfo_userId_key" ON "EmergencyContactInfo"("userId");
