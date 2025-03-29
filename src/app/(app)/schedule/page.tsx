"use client";

import TimeTable from "@/components/TimeTable/TimeTable";
import { timeTableData } from "@/components/TimeTable/TimeTableEvents";

export default function SchedulePage() {
    return (
        <div className="py-20 px-20">
            <TimeTable {...timeTableData} />
        </div>
    )
}