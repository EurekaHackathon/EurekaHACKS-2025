import { Fragment, useState, useRef, useEffect } from "react";
import styles from "./TimeTable.module.css";
import { motion, AnimatePresence } from "framer-motion";
import Image, { StaticImageData } from "next/image";

type Time = {
    hour: number;
    minute: number;
}

type Event = {
    name: string;
    color: string;
    start: Time;
    column: number;
    duration: number;
    images?: StaticImageData[] | undefined;
    description: string;
}

interface TimeTableProps {
    startTime: Time;
    endTime: Time;
    timeInc: number;
    columnNames: string[];
    events: Event[]
}


export default function TimeTable({
    startTime,
    endTime,
    timeInc,
    columnNames,
    events,
}: TimeTableProps) {
    const times = [startTime];
    const [selectedEvent, setSelectedEvent] = useState<number | null>(null);
    const popUpRef = useRef(null);

    function handleOutside(event: MouseEvent) {
        // @ts-expect-error Typescript is stupid and thinks this evaluates to never
        if (popUpRef.current && !popUpRef.current.contains(event.target)) {
            setSelectedEvent(null);
        }
    }

    useEffect(() => {
        document.addEventListener("mousedown", handleOutside);

        return () => {
            document.removeEventListener("mousedown", handleOutside);
        };
    }, []);

    for (;;) {
        const prevTime = times.at(-1)!;
        const nextTime = {
            hour: prevTime.hour,
            minute: prevTime.minute + timeInc,
        };

        if (nextTime.minute >= 60) {
            nextTime.hour += Math.floor(nextTime.minute / 60);
            nextTime.minute %= 60;
        }

        if (prevTime.hour >= endTime.hour && prevTime.minute >= endTime.minute)
            break;

        times.push(nextTime);
    }

    return (
        <>
            <div className={`${styles.table}`}>
                {columnNames.map((name, index) => {
                    return (
                        <p key={index + 200000} className={styles.columnName}>
                            {name}
                        </p>
                    );
                })}
                {times.map((time, index) => {
                    const isHour = !time.minute;

                    return (
                        <Fragment key={index}>
                            <div className={styles.marker}>
                                <p
                                    className={
                                        isHour ? styles.isHour : styles.isMinute
                                    }
                                >
                                    {time.hour <= 12
                                        ? time.hour
                                        : time.hour - 12}
                                    :{isHour ? "00" : time.minute}
                                </p>
                            </div>
                            <div className={styles.divider} />
                        </Fragment>
                    );
                })}
                {events.map((event, index) => {
                    const rowSpan = Math.floor((event.duration / timeInc) * 2);
                    const rowStart = Math.floor(
                        (((event.start.hour - startTime.hour) * 60 +
                            event.start.minute -
                            startTime.minute) /
                            timeInc) *
                            2 +
                            2,
                    );
                    const endTime = {
                        hour:
                            event.start.minute + (event.duration % 60) >= 60
                                ? event.start.hour +
                                  Math.floor(event.duration / 60) +
                                  1
                                : event.start.hour +
                                  Math.floor(event.duration / 60),
                        minute:
                            (event.start.minute + (event.duration % 60)) % 60,
                    };

                    return (
                        <motion.div
                            key={index + 1}
                            className={styles.slot}
                            style={{
                                backgroundColor: event.color,
                                gridRow: `${rowStart} / span ${rowSpan}`,
                                gridColumn: event.column,
                            }}
                            layoutId={(index + 1).toString()}
                            onClick={() => setSelectedEvent(index + 1)}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            transition={{
                                duration: 0.2,
                            }}
                        >
                            <motion.p>{event.name}</motion.p>
                            <motion.p>
                                {event.start.hour <= 12
                                    ? event.start.hour
                                    : event.start.hour - 12}
                                :
                                {event.start.minute == 0
                                    ? "00"
                                    : event.start.minute}
                                -
                                {endTime.hour <= 12
                                    ? endTime.hour
                                    : endTime.hour - 12}
                                :{endTime.minute == 0 ? "00" : endTime.minute}
                            </motion.p>
                        </motion.div>
                    );
                })}
            </div>
            <AnimatePresence>
                {selectedEvent && (
                    <motion.div
                        className={styles.filter}
                        transition={{
                            duration: 0.5,
                        }}
                        initial={{ backgroundColor: "#00000000" }}
                        animate={{ backgroundColor: "#00000088" }}
                        exit={{ backgroundColor: "#00000000" }}
                    >
                        <motion.div
                            layoutId={selectedEvent.toString()}
                            className={styles.opened}
                            style={{
                                borderTopColor: events[selectedEvent - 1].color,
                            }}
                            ref={popUpRef}
                        >
                            <motion.h3>
                                {events[selectedEvent - 1].name}
                            </motion.h3>
                            <motion.p className={styles.text}>
                                {events[selectedEvent - 1].description}
                            </motion.p>
                            {events[selectedEvent - 1].images?.[0] && (
                                <Image
                                    src={events[selectedEvent - 1].images?.[0] ?? ""}
                                    alt={events[selectedEvent - 1].name}
                                    width={500}
                                    className={styles.image}
                                />
                            )}
                            <motion.p className={styles.time}>
                                {events[selectedEvent - 1].start.hour > 12
                                    ? events[selectedEvent - 1].start.hour - 12
                                    : events[selectedEvent - 1].start.hour}
                                :
                                {events[selectedEvent - 1].start.minute == 0
                                    ? "00"
                                    : events[selectedEvent - 1].start.minute}
                                -
                                {events[selectedEvent - 1].start.minute +
                                    (events[selectedEvent - 1].duration % 60) >=
                                60
                                    ? events[selectedEvent - 1].start.hour +
                                      Math.floor(
                                          events[selectedEvent - 1].duration /
                                              60,
                                      ) +
                                      1
                                    : events[selectedEvent - 1].start.hour +
                                          Math.floor(
                                              events[selectedEvent - 1]
                                                  .duration / 60,
                                          ) >
                                      12
                                    ? events[selectedEvent - 1].start.hour +
                                      Math.floor(
                                          events[selectedEvent - 1].duration /
                                              60,
                                      ) -
                                      12
                                    : events[selectedEvent - 1].start.hour +
                                      Math.floor(
                                          events[selectedEvent - 1].duration /
                                              60,
                                      )}
                                :
                                {(events[selectedEvent - 1].start.minute +
                                    (events[selectedEvent - 1].duration % 60)) %
                                    60 ==
                                0
                                    ? "00"
                                    : (events[selectedEvent - 1].start.minute +
                                          (events[selectedEvent - 1].duration %
                                              60)) %
                                      60}
                            </motion.p>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}