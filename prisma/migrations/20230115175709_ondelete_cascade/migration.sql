-- DropForeignKey
ALTER TABLE "Absence" DROP CONSTRAINT "Absence_lessonId_fkey";

-- DropForeignKey
ALTER TABLE "Absence" DROP CONSTRAINT "Absence_schoolYearId_fkey";

-- DropForeignKey
ALTER TABLE "Absence" DROP CONSTRAINT "Absence_studentId_fkey";

-- DropForeignKey
ALTER TABLE "Class" DROP CONSTRAINT "Class_subjectListId_fkey";

-- DropForeignKey
ALTER TABLE "ClassTeacher" DROP CONSTRAINT "ClassTeacher_className_fkey";

-- DropForeignKey
ALTER TABLE "ClassTeacher" DROP CONSTRAINT "ClassTeacher_employeeId_fkey";

-- DropForeignKey
ALTER TABLE "Employee" DROP CONSTRAINT "Employee_userId_fkey";

-- DropForeignKey
ALTER TABLE "Employee_Subject" DROP CONSTRAINT "Employee_Subject_employeeId_fkey";

-- DropForeignKey
ALTER TABLE "Employee_Subject" DROP CONSTRAINT "Employee_Subject_subjectAbbreviation_fkey";

-- DropForeignKey
ALTER TABLE "Employee_Subject_Class" DROP CONSTRAINT "Employee_Subject_Class_className_fkey";

-- DropForeignKey
ALTER TABLE "Employee_Subject_Class" DROP CONSTRAINT "Employee_Subject_Class_employeeId_subjectAbbreviation_fkey";

-- DropForeignKey
ALTER TABLE "Grade" DROP CONSTRAINT "Grade_schoolYearId_fkey";

-- DropForeignKey
ALTER TABLE "Grade" DROP CONSTRAINT "Grade_studentId_fkey";

-- DropForeignKey
ALTER TABLE "Lesson" DROP CONSTRAINT "Lesson_className_fkey";

-- DropForeignKey
ALTER TABLE "Lesson" DROP CONSTRAINT "Lesson_classroomName_fkey";

-- DropForeignKey
ALTER TABLE "Lesson" DROP CONSTRAINT "Lesson_employeeId_subjectAbbreviation_fkey";

-- DropForeignKey
ALTER TABLE "Lesson" DROP CONSTRAINT "Lesson_schoolHourNum_fkey";

-- DropForeignKey
ALTER TABLE "Student" DROP CONSTRAINT "Student_className_fkey";

-- DropForeignKey
ALTER TABLE "Student" DROP CONSTRAINT "Student_userId_fkey";

-- DropForeignKey
ALTER TABLE "Subject_SubjectList" DROP CONSTRAINT "Subject_SubjectList_classSubjectListId_fkey";

-- DropForeignKey
ALTER TABLE "Subject_SubjectList" DROP CONSTRAINT "Subject_SubjectList_subjectAbbreviation_fkey";

-- DropForeignKey
ALTER TABLE "SubstituteClassTeacher" DROP CONSTRAINT "SubstituteClassTeacher_className_fkey";

-- DropForeignKey
ALTER TABLE "SubstituteClassTeacher" DROP CONSTRAINT "SubstituteClassTeacher_employeeId_fkey";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "firstPasswordReplaced" BOOLEAN NOT NULL DEFAULT false;

-- AddForeignKey
ALTER TABLE "Employee" ADD CONSTRAINT "Employee_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Employee_Subject" ADD CONSTRAINT "Employee_Subject_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employee"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Employee_Subject" ADD CONSTRAINT "Employee_Subject_subjectAbbreviation_fkey" FOREIGN KEY ("subjectAbbreviation") REFERENCES "Subject"("abbreviation") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Subject_SubjectList" ADD CONSTRAINT "Subject_SubjectList_subjectAbbreviation_fkey" FOREIGN KEY ("subjectAbbreviation") REFERENCES "Subject"("abbreviation") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Subject_SubjectList" ADD CONSTRAINT "Subject_SubjectList_classSubjectListId_fkey" FOREIGN KEY ("classSubjectListId") REFERENCES "SubjectList"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Class" ADD CONSTRAINT "Class_subjectListId_fkey" FOREIGN KEY ("subjectListId") REFERENCES "SubjectList"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Employee_Subject_Class" ADD CONSTRAINT "Employee_Subject_Class_employeeId_subjectAbbreviation_fkey" FOREIGN KEY ("employeeId", "subjectAbbreviation") REFERENCES "Employee_Subject"("employeeId", "subjectAbbreviation") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Employee_Subject_Class" ADD CONSTRAINT "Employee_Subject_Class_className_fkey" FOREIGN KEY ("className") REFERENCES "Class"("name") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClassTeacher" ADD CONSTRAINT "ClassTeacher_className_fkey" FOREIGN KEY ("className") REFERENCES "Class"("name") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClassTeacher" ADD CONSTRAINT "ClassTeacher_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employee"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SubstituteClassTeacher" ADD CONSTRAINT "SubstituteClassTeacher_className_fkey" FOREIGN KEY ("className") REFERENCES "Class"("name") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SubstituteClassTeacher" ADD CONSTRAINT "SubstituteClassTeacher_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employee"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Student" ADD CONSTRAINT "Student_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Student" ADD CONSTRAINT "Student_className_fkey" FOREIGN KEY ("className") REFERENCES "Class"("name") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Grade" ADD CONSTRAINT "Grade_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Grade" ADD CONSTRAINT "Grade_schoolYearId_fkey" FOREIGN KEY ("schoolYearId") REFERENCES "SchoolYear"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Lesson" ADD CONSTRAINT "Lesson_employeeId_subjectAbbreviation_fkey" FOREIGN KEY ("employeeId", "subjectAbbreviation") REFERENCES "Employee_Subject"("employeeId", "subjectAbbreviation") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Lesson" ADD CONSTRAINT "Lesson_className_fkey" FOREIGN KEY ("className") REFERENCES "Class"("name") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Lesson" ADD CONSTRAINT "Lesson_classroomName_fkey" FOREIGN KEY ("classroomName") REFERENCES "Classroom"("name") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Lesson" ADD CONSTRAINT "Lesson_schoolHourNum_fkey" FOREIGN KEY ("schoolHourNum") REFERENCES "SchoolHour"("num") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Absence" ADD CONSTRAINT "Absence_lessonId_fkey" FOREIGN KEY ("lessonId") REFERENCES "Lesson"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Absence" ADD CONSTRAINT "Absence_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Absence" ADD CONSTRAINT "Absence_schoolYearId_fkey" FOREIGN KEY ("schoolYearId") REFERENCES "SchoolYear"("id") ON DELETE CASCADE ON UPDATE CASCADE;
