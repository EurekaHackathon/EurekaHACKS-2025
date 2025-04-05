"use client";

import { useState, useEffect } from "react";

const calculateTimeLeft = (eventDate: number) => {
    const now = new Date().getTime();
    const difference = eventDate - now;

    if (difference <= 0) {
        return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    return { days, hours, minutes, seconds };
};

export function CountdownTimer() {
    const eventDate = new Date("2025-04-05T08:00:00-05:00").getTime();
    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(eventDate));

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft(eventDate));
        }, 1000);

        return () => clearInterval(timer); // Cleanup on unmount
    }, []);

    return (
        <div className="flex gap-2 text-secondary-600 font-bold text-3xl md:text-5xl pt-6 flex-wrap">
            <div>
                <h1 className="">{String(timeLeft.days).padStart(2, "0")}</h1>
                <h2 className="text-center text-xs md:text-base lg:text-lg font-semibold">Days</h2>
            </div>
            <h1>:</h1>
            <div>
                <h1 className="">{String(timeLeft.hours).padStart(2, "0")}</h1>
                <h2 className="text-center text-xs md:text-base lg:text-lg font-semibold">Hours</h2>
            </div>
            <h1>:</h1>
            <div>
                <h1 className="">{String(timeLeft.minutes).padStart(2, "0")}</h1>
                <h2 className="text-center text-xs md:text-base lg:text-lg font-semibold">Minutes</h2>
            </div>
            <h1>:</h1>
            <div>
                <h1 className="">{String(timeLeft.seconds).padStart(2, "0")}</h1>
                <h2 className="text-center text-xs md:text-base lg:text-lg font-semibold">Seconds</h2>
            </div>
        </div>
    );
}