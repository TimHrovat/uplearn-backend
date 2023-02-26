-- CreateTable
CREATE TABLE "Event_Teacher" (
    "eventId" TEXT NOT NULL,
    "employeeId" TEXT NOT NULL,

    CONSTRAINT "Event_Teacher_pkey" PRIMARY KEY ("eventId","employeeId")
);

-- AddForeignKey
ALTER TABLE "Event_Teacher" ADD CONSTRAINT "Event_Teacher_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Event_Teacher" ADD CONSTRAINT "Event_Teacher_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employee"("id") ON DELETE CASCADE ON UPDATE CASCADE;
