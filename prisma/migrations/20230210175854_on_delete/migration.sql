-- DropForeignKey
ALTER TABLE "Class" DROP CONSTRAINT "Class_classTeacherId_fkey";

-- DropForeignKey
ALTER TABLE "Class" DROP CONSTRAINT "Class_subjectListId_fkey";

-- DropForeignKey
ALTER TABLE "Class" DROP CONSTRAINT "Class_substituteClassTeacherId_fkey";

-- AddForeignKey
ALTER TABLE "Class" ADD CONSTRAINT "Class_subjectListId_fkey" FOREIGN KEY ("subjectListId") REFERENCES "SubjectList"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Class" ADD CONSTRAINT "Class_classTeacherId_fkey" FOREIGN KEY ("classTeacherId") REFERENCES "Employee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Class" ADD CONSTRAINT "Class_substituteClassTeacherId_fkey" FOREIGN KEY ("substituteClassTeacherId") REFERENCES "Employee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
