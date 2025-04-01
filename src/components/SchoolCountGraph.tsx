"use client";

import {
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer, BarChart, Bar
} from "recharts";
import { GetNumberOfApplicationsPerSchoolRow } from "@/lib/sqlc/admin_sql";

export default function SchoolCountGraph({schoolCountData}: {
    schoolCountData: GetNumberOfApplicationsPerSchoolRow[]
}) {
    const data: any[] = [];
    const numberOfSchoolsToShow = 6;
    const topSchools = schoolCountData.slice(0, numberOfSchoolsToShow);
    const otherSchools = schoolCountData.slice(numberOfSchoolsToShow);
    const otherCount = otherSchools.reduce((acc, curr) => acc + parseInt(curr.count), 0);
    for (let i = 0; i < topSchools.length; i++) {
        const school = topSchools[i];
        data.push({
            school: school.school,
            count: school.count,
        });
    }
    data.push({
        school: "Other",
        count: otherCount,
    });

    return (
        <ResponsiveContainer width="100%" height={400}>
            <BarChart width={1200} height={400} data={data}
                      margin={{top: 5, right: 40, left: 5, bottom: 30}}>
                <CartesianGrid strokeDasharray="12 12" stroke="#ccc"/>
                <Tooltip animationEasing="ease-in-out" animationDuration={50}/>
                <Bar name="Count" dataKey="count" fill="#38bdf8"/>
                <XAxis dataKey="school" type="category" className="text-xs lg:text-sm"
                       tickMargin={10}
                       angle={-60} textAnchor="end" height={200}
                       label={{value: "School", position: "bottom", offset: 10, fontSize: 18}}/>
                <YAxis dataKey="count" type="number" className="text-xs lg:text-sm" tickMargin={4}
                       label={{value: "Count", position: "insideLeft", angle: -90, offset: 10, fontSize: 18}}/>
            </BarChart>
        </ResponsiveContainer>
    );
}