"use client";

import { useState, useEffect } from "react";

export function DeadlineCountdown() {
    const deadline = new Date("2025-03-22T23:59:59-05:00").getTime();
    const [daysLeft, setDaysLeft] = useState(calculateDaysLeft());

    function calculateDaysLeft() {
        const now = new Date().getTime();
        const difference = deadline - now;
        return Math.max(Math.floor(difference / (1000 * 60 * 60 * 24)), 0); // Ensure it doesn't go negative
    }

    useEffect(() => {
        const timer = setInterval(() => {
            setDaysLeft(calculateDaysLeft());
        }, 1000);

        return () => clearInterval(timer); // Cleanup on unmount
    }, []);

    return (
        <h1 className="text-secondary-600 font-bold text-5xl pt-6">
            {daysLeft} day{daysLeft !== 1 ? "s" : ""}
        </h1>
    );
}