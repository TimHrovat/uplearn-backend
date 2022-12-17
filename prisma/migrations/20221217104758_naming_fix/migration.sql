/*
  Warnings:

  - You are about to drop the `class_teacher` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `teaches` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Lesson" DROP CONSTRAINT "Lesson_employeeID_subjectID_fkey";

-- DropForeignKey
ALTER TABLE "TeachesClass" DROP CONSTRAINT "TeachesClass_employeeID_subjectID_fkey";

-- DropForeignKey
ALTER TABLE "class_teacher" DROP CONSTRAINT "class_teacher_classID_fkey";

-- DropForeignKey
ALTER TABLE "class_teacher" DROP CONSTRAINT "class_teacher_employeeID_fkey";

-- DropForeignKey
ALTER TABLE "teaches" DROP CONSTRAINT "teaches_employeeID_fkey";

-- DropForeignKey
ALTER TABLE "teaches" DROP CONSTRAINT "teaches_subjectID_fkey";

-- AlterTable
ALTER TABLE "TeachesClass" ADD CONSTRAINT "TeachesClass_pkey" PRIMARY KEY ("employeeID", "subjectID", "classID");

-- DropTable
DROP TABLE "class_teacher";

-- DropTable
DROP TABLE "teaches";

-- CreateTable
CREATE TABLE "TeachesSubject" (
    "employeeID" INTEGER NOT NULL,
    "subjectID" INTEGER NOT NULL,

    CONSTRAINT "TeachesSubject_pkey" PRIMARY KEY ("employeeID","subjectID")
);

-- CreateTable
CREATE TABLE "ClassTeacher" (
    "classID" INTEGER NOT NULL,
    "employeeID" INTEGER NOT NULL,

    CONSTRAINT "ClassTeacher_pkey" PRIMARY KEY ("classID","employeeID")
);

-- CreateIndex
CREATE UNIQUE INDEX "TeachesSubject_employeeID_key" ON "TeachesSubject"("employeeID");

-- CreateIndex
CREATE UNIQUE INDEX "TeachesSubject_subjectID_key" ON "TeachesSubject"("subjectID");

-- CreateIndex
CREATE UNIQUE INDEX "ClassTeacher_classID_key" ON "ClassTeacher"("classID");

-- CreateIndex
CREATE UNIQUE INDEX "ClassTeacher_employeeID_key" ON "ClassTeacher"("employeeID");

-- AddForeignKey
ALTER TABLE "TeachesSubject" ADD CONSTRAINT "TeachesSubject_employeeID_fkey" FOREIGN KEY ("employeeID") REFERENCES "Employee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TeachesSubject" ADD CONSTRAINT "TeachesSubject_subjectID_fkey" FOREIGN KEY ("subjectID") REFERENCES "Subject"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TeachesClass" ADD CONSTRAINT "TeachesClass_employeeID_subjectID_fkey" FOREIGN KEY ("employeeID", "subjectID") REFERENCES "TeachesSubject"("employeeID", "subjectID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClassTeacher" ADD CONSTRAINT "ClassTeacher_classID_fkey" FOREIGN KEY ("classID") REFERENCES "Class"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClassTeacher" ADD CONSTRAINT "ClassTeacher_employeeID_fkey" FOREIGN KEY ("employeeID") REFERENCES "Employee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Lesson" ADD CONSTRAINT "Lesson_employeeID_subjectID_fkey" FOREIGN KEY ("employeeID", "subjectID") REFERENCES "TeachesSubject"("employeeID", "subjectID") ON DELETE RESTRICT ON UPDATE CASCADE;
