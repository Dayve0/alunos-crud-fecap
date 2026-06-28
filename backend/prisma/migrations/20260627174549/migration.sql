/*
  Warnings:

  - Added the required column `age` to the `students` table without a default value. This is not possible if the table is not empty.
  - Added the required column `course` to the `students` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `students` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "users" ADD COLUMN "updatedAt" DATETIME DEFAULT CURRENT_TIMESTAMP;

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_students" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "age" INTEGER NOT NULL,
    "course" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME DEFAULT CURRENT_TIMESTAMP,
    "deletedAt" DATETIME
);
INSERT INTO "new_students" ("createdAt", "email", "id", "name") SELECT "createdAt", "email", "id", "name" FROM "students";
DROP TABLE "students";
ALTER TABLE "new_students" RENAME TO "students";
CREATE UNIQUE INDEX "students_email_key" ON "students"("email");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
