// filename: db-reset.ts

// use: npx ts-node db-reset.ts

// add more tables if Required

const tableNames = [
  'User',
  'Employee',
  'Subject',
  'Employee_Subject',
  'SubjectList',
  'Subject_SubjectList',
  'Class',
  'Employee_Subject_Class',
  'Student',
  'SchoolYear',
  'Grade',
  'SchoolHour',
  'Classroom',
  'Lesson',
  'Absence',
  'Event',
  'Event_Employee',
  'Event_Class',
  'EmployeeGrade',
];

import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function main() {
  for (const tableName of tableNames)
    await prisma.$queryRawUnsafe(
      `Truncate "${tableName}" restart identity cascade;`,
    );
}

main().finally(async () => {
  await prisma.$disconnect();
});
