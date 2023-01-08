-- CreateEnum
CREATE TYPE "GradeType" AS ENUM ('ORAL', 'WRITTEN', 'OTHER');

-- CreateEnum
CREATE TYPE "ClassroomType" AS ENUM ('NORMAL', 'LAB', 'GYM', 'COMPUTER');

-- CreateEnum
CREATE TYPE "LessonType" AS ENUM ('NORMAL', 'SUBSTITUTE', 'GRADING');

-- CreateTable
CREATE TABLE "Employee" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Employee_pkey" PRIMARY KEY ("id","userId")
);

-- CreateTable
CREATE TABLE "Subject" (
    "abbreviation" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,

    CONSTRAINT "Subject_pkey" PRIMARY KEY ("abbreviation")
);

-- CreateTable
CREATE TABLE "Employee_Subject" (
    "employeeId" TEXT NOT NULL,
    "employeeUserId" TEXT NOT NULL,
    "subjectAbbreviation" TEXT NOT NULL,

    CONSTRAINT "Employee_Subject_pkey" PRIMARY KEY ("employeeId","subjectAbbreviation")
);

-- CreateTable
CREATE TABLE "SubjectList" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "SubjectList_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Subject_SubjectList" (
    "subjectAbbreviation" TEXT NOT NULL,
    "classSubjectListId" TEXT NOT NULL,
    "lessonsPerWeek" INTEGER NOT NULL,

    CONSTRAINT "Subject_SubjectList_pkey" PRIMARY KEY ("subjectAbbreviation","classSubjectListId")
);

-- CreateTable
CREATE TABLE "Class" (
    "name" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "subjectListId" TEXT,

    CONSTRAINT "Class_pkey" PRIMARY KEY ("name")
);

-- CreateTable
CREATE TABLE "Employee_Subject_Class" (
    "employeeId" TEXT NOT NULL,
    "subjectAbbreviation" TEXT NOT NULL,
    "className" TEXT NOT NULL,

    CONSTRAINT "Employee_Subject_Class_pkey" PRIMARY KEY ("employeeId","subjectAbbreviation","className")
);

-- CreateTable
CREATE TABLE "ClassTeacher" (
    "className" TEXT NOT NULL,
    "employeeId" TEXT NOT NULL,
    "employeeUserId" TEXT NOT NULL,

    CONSTRAINT "ClassTeacher_pkey" PRIMARY KEY ("className","employeeId","employeeUserId")
);

-- CreateTable
CREATE TABLE "SubstituteClassTeacher" (
    "className" TEXT NOT NULL,
    "employeeId" TEXT NOT NULL,
    "employeeUserId" TEXT NOT NULL,

    CONSTRAINT "SubstituteClassTeacher_pkey" PRIMARY KEY ("className","employeeId","employeeUserId")
);

-- CreateTable
CREATE TABLE "Student" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "className" TEXT,

    CONSTRAINT "Student_pkey" PRIMARY KEY ("id","userId")
);

-- CreateTable
CREATE TABLE "SchoolYear" (
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SchoolYear_pkey" PRIMARY KEY ("startDate","endDate")
);

-- CreateTable
CREATE TABLE "Grade" (
    "id" TEXT NOT NULL,
    "value" INTEGER NOT NULL,
    "type" "GradeType" NOT NULL,
    "description" TEXT,
    "studentId" TEXT NOT NULL,
    "studentUserId" TEXT NOT NULL,
    "schoolYearStartDate" TIMESTAMP(3) NOT NULL,
    "schoolYearEndDate" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Grade_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SchoolHour" (
    "num" INTEGER NOT NULL,
    "startTime" TIMESTAMP(3) NOT NULL,
    "endTime" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SchoolHour_pkey" PRIMARY KEY ("num")
);

-- CreateTable
CREATE TABLE "Classroom" (
    "name" TEXT NOT NULL,
    "type" "ClassroomType" NOT NULL DEFAULT 'NORMAL',

    CONSTRAINT "Classroom_pkey" PRIMARY KEY ("name")
);

-- CreateTable
CREATE TABLE "Lesson" (
    "id" TEXT NOT NULL,
    "description" TEXT,
    "date" TIMESTAMP(3) NOT NULL,
    "type" "LessonType" NOT NULL DEFAULT 'NORMAL',
    "employeeId" TEXT NOT NULL,
    "subjectAbbreviation" TEXT NOT NULL,
    "className" TEXT NOT NULL,
    "classroomName" TEXT NOT NULL,
    "schoolHourNum" INTEGER NOT NULL,

    CONSTRAINT "Lesson_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Absence" (
    "id" TEXT NOT NULL,
    "description" TEXT,
    "lessonId" TEXT NOT NULL,
    "studentId" TEXT NOT NULL,
    "studentUserId" TEXT NOT NULL,

    CONSTRAINT "Absence_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Employee_userId_key" ON "Employee"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "ClassTeacher_className_key" ON "ClassTeacher"("className");

-- CreateIndex
CREATE UNIQUE INDEX "ClassTeacher_employeeId_employeeUserId_key" ON "ClassTeacher"("employeeId", "employeeUserId");

-- CreateIndex
CREATE UNIQUE INDEX "SubstituteClassTeacher_className_key" ON "SubstituteClassTeacher"("className");

-- CreateIndex
CREATE UNIQUE INDEX "SubstituteClassTeacher_employeeId_employeeUserId_key" ON "SubstituteClassTeacher"("employeeId", "employeeUserId");

-- CreateIndex
CREATE UNIQUE INDEX "Student_userId_key" ON "Student"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "SchoolHour_startTime_key" ON "SchoolHour"("startTime");

-- CreateIndex
CREATE UNIQUE INDEX "SchoolHour_endTime_key" ON "SchoolHour"("endTime");

-- AddForeignKey
ALTER TABLE "Employee" ADD CONSTRAINT "Employee_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Employee_Subject" ADD CONSTRAINT "Employee_Subject_employeeId_employeeUserId_fkey" FOREIGN KEY ("employeeId", "employeeUserId") REFERENCES "Employee"("id", "userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Employee_Subject" ADD CONSTRAINT "Employee_Subject_subjectAbbreviation_fkey" FOREIGN KEY ("subjectAbbreviation") REFERENCES "Subject"("abbreviation") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Subject_SubjectList" ADD CONSTRAINT "Subject_SubjectList_subjectAbbreviation_fkey" FOREIGN KEY ("subjectAbbreviation") REFERENCES "Subject"("abbreviation") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Subject_SubjectList" ADD CONSTRAINT "Subject_SubjectList_classSubjectListId_fkey" FOREIGN KEY ("classSubjectListId") REFERENCES "SubjectList"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Class" ADD CONSTRAINT "Class_subjectListId_fkey" FOREIGN KEY ("subjectListId") REFERENCES "SubjectList"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Employee_Subject_Class" ADD CONSTRAINT "Employee_Subject_Class_employeeId_subjectAbbreviation_fkey" FOREIGN KEY ("employeeId", "subjectAbbreviation") REFERENCES "Employee_Subject"("employeeId", "subjectAbbreviation") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Employee_Subject_Class" ADD CONSTRAINT "Employee_Subject_Class_className_fkey" FOREIGN KEY ("className") REFERENCES "Class"("name") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClassTeacher" ADD CONSTRAINT "ClassTeacher_className_fkey" FOREIGN KEY ("className") REFERENCES "Class"("name") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClassTeacher" ADD CONSTRAINT "ClassTeacher_employeeId_employeeUserId_fkey" FOREIGN KEY ("employeeId", "employeeUserId") REFERENCES "Employee"("id", "userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SubstituteClassTeacher" ADD CONSTRAINT "SubstituteClassTeacher_className_fkey" FOREIGN KEY ("className") REFERENCES "Class"("name") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SubstituteClassTeacher" ADD CONSTRAINT "SubstituteClassTeacher_employeeId_employeeUserId_fkey" FOREIGN KEY ("employeeId", "employeeUserId") REFERENCES "Employee"("id", "userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Student" ADD CONSTRAINT "Student_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Student" ADD CONSTRAINT "Student_className_fkey" FOREIGN KEY ("className") REFERENCES "Class"("name") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Grade" ADD CONSTRAINT "Grade_studentId_studentUserId_fkey" FOREIGN KEY ("studentId", "studentUserId") REFERENCES "Student"("id", "userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Grade" ADD CONSTRAINT "Grade_schoolYearStartDate_schoolYearEndDate_fkey" FOREIGN KEY ("schoolYearStartDate", "schoolYearEndDate") REFERENCES "SchoolYear"("startDate", "endDate") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Lesson" ADD CONSTRAINT "Lesson_employeeId_subjectAbbreviation_fkey" FOREIGN KEY ("employeeId", "subjectAbbreviation") REFERENCES "Employee_Subject"("employeeId", "subjectAbbreviation") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Lesson" ADD CONSTRAINT "Lesson_className_fkey" FOREIGN KEY ("className") REFERENCES "Class"("name") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Lesson" ADD CONSTRAINT "Lesson_classroomName_fkey" FOREIGN KEY ("classroomName") REFERENCES "Classroom"("name") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Lesson" ADD CONSTRAINT "Lesson_schoolHourNum_fkey" FOREIGN KEY ("schoolHourNum") REFERENCES "SchoolHour"("num") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Absence" ADD CONSTRAINT "Absence_lessonId_fkey" FOREIGN KEY ("lessonId") REFERENCES "Lesson"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Absence" ADD CONSTRAINT "Absence_studentId_studentUserId_fkey" FOREIGN KEY ("studentId", "studentUserId") REFERENCES "Student"("id", "userId") ON DELETE RESTRICT ON UPDATE CASCADE;
