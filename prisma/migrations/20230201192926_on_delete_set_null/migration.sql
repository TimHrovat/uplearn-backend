-- DropForeignKey
ALTER TABLE "Student" DROP CONSTRAINT "Student_className_fkey";

-- AddForeignKey
ALTER TABLE "Student" ADD CONSTRAINT "Student_className_fkey" FOREIGN KEY ("className") REFERENCES "Class"("name") ON DELETE SET NULL ON UPDATE CASCADE;
