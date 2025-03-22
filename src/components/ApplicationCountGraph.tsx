"use client";

import React, { useState, useEffect } from "react";
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer
} from "recharts";
import { GetApplicationCountPerDayRow } from "@/lib/sqlc/admin_sql";

export default function ApplicationCountGraph({applicationCountData}: {
    applicationCountData: GetApplicationCountPerDayRow[]
}) {
    const [interval, setInterval] = useState(1);

    const formatDate = (date: number) => {
        const d = new Date(date);
        return d.toLocaleDateString("en-CA");
    };

    const data = applicationCountData.map((day) => {
        return {
            date: day.date.getTime(),
            count: parseInt(day.count),
        };
    });

    const fullData: any[] = [];
    for (let i = 0; i < data.length; i++) {
        if (i === 0) {
            fullData.push(data[i]);
        } else {
            const prev = data[i - 1];
            const curr = data[i];
            const prevDate = new Date(prev.date);
            const currDate = new Date(curr.date);
            const diff = (currDate.getTime() - prevDate.getTime()) / (1000 * 60 * 60 * 24);
            if (diff > 1) {
                for (let j = 1; j < diff; j++) {
                    const newDate = new Date(prevDate.getTime() + j * 1000 * 60 * 60 * 24);
                    fullData.push({
                        date: newDate.getTime(),
                        count: 0,
                    });
                }
            }
            fullData.push(curr);
        }
    }

    // Add cumulative count
    let cumulativeCount = 0;
    for (let i = 0; i < fullData.length; i++) {
        cumulativeCount += fullData[i].count;
        fullData[i].cumulativeCount = cumulativeCount;
    }

    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth;
            if (width < 768) {
                setInterval(Math.floor(fullData.length / 3));
            } else {
                setInterval(Math.floor(fullData.length / 6));
            }
        };

        window.addEventListener("resize", handleResize);
        handleResize();

        return () => window.removeEventListener("resize", handleResize);
    }, [fullData.length]);

    return (
        <ResponsiveContainer width="100%" height={400}>
            <AreaChart width={1200} height={400} data={fullData} margin={{top: 5, right: 40, left: 5, bottom: 30}}>
                <CartesianGrid strokeDasharray="12 12" stroke="#ccc"/>
                <Area name="Cumulative count" type="linear" dataKey="cumulativeCount" fill="#38bdf8" stroke="#38bdf8"
                      strokeWidth={2}/>
                <Area name="Count" type="linear" dataKey="count" fill="#6d46e1" stroke="#6d46e1"/>
                <XAxis dataKey="date" type="number" className="text-xs lg:text-sm" tickFormatter={formatDate}
                       tickMargin={4}
                       domain={["dataMin", "dataMax"]} scale={"time"} interval={interval}
                       label={{value: "Date", position: "bottom", offset: 10, fontSize: 18}}/>
                <YAxis dataKey="cumulativeCount" type="number" className="text-xs lg:text-sm" tickMargin={4}
                       label={{value: "Count", position: "insideLeft", angle: -90, offset: 10, fontSize: 18}}/>
                <Tooltip labelFormatter={formatDate} animationEasing="ease-in-out" animationDuration={50}/>
                <Legend verticalAlign="top" height={36}/>
            </AreaChart>
        </ResponsiveContainer>
    );
}