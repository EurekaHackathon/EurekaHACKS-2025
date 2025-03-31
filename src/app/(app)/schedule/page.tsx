"use client";

import TimeTable from "@/components/TimeTable/TimeTable";
import { timeTableData } from "@/components/TimeTable/TimeTableEvents";

export default function SchedulePage() {
    return (
        <div className="py-24 px-20 flex flex-col gap-4">
            <div className="flex flex-row gap-4 self-center flex-wrap">
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
                    <span>Fun Activities</span>
                </div>
                <div className="flex flex-row gap-2 items-center justify-center">
                    <div className="bg-terminal-yellow w-6 h-6 rounded-md"></div>
                    <span>Judging Deadline</span>
                </div>
            </div>
            <div className="">
                <TimeTable {...timeTableData} />
            </div>
        </div>
    )
}