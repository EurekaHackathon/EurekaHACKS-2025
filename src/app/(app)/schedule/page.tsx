"use client";

import TimeTable from "@/components/TimeTable/TimeTable";
import { timeTableData } from "@/components/TimeTable/TimeTableEvents";

export default function SchedulePage() {
    return (
        <div className="py-24 px-20 flex flex-col items-center gap-4">
            <div className="flex flex-row gap-4 items-stretch">
                <div className="flex flex-row gap-2 items-center justify-center">
                    <div className="bg-terminal-green w-6 h-6 rounded-md"></div>
                    <span>Important Events</span>
                </div>
                <div className="flex flex-row gap-2 items-center justify-center">
                    <div className="bg-terminal-blue w-6 h-6 rounded-md"></div>
                    <span>Workshops</span>
                </div>
                <div className="flex flex-row gap-2 items-center justify-center">
                    <div className="bg-terminal-red w-6 h-6 rounded-md"></div>
                    <span>Fun Activitites</span>
                </div>
                <div className="flex flex-row gap-2 items-center justify-center">
                    <div className="bg-terminal-yellow w-6 h-6 rounded-md"></div>
                    <span>Judging Deadline</span>
                </div>
            </div>
            <TimeTable {...timeTableData} />
        </div>
    )
}