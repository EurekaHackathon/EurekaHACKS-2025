"use client";

import Link from "next/link";
import { Icon } from "@iconify/react";
import { CountdownTimer } from "@/components/CountdownTimer";
import { DeadlineCountdown } from "@/components/DeadlineCountdown";
import { useDashboardCtx } from "@/lib/dashboard-ctx";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";
import { Confetti } from "@neoconfetti/react";
import { useRouter, useSearchParams } from "next/navigation";

export default function DashboardHome() {
    const {user, applicationStatus} = useDashboardCtx();
    const [rsvpStatus, setRsvpStatus] = useState(useDashboardCtx().rsvpStatus);
    const initialRsvpStatus = useDashboardCtx().rsvpStatus;
    const [rsvpLoading, setRsvpLoading] = useState(false);
    const playConfetti = useSearchParams().get("play") !== "false";
    const router = useRouter();

    const rsvp = async () => {
        setRsvpLoading(true);

        const response = await fetch("/api/rsvp", {
            method: "POST",
        });

        setRsvpLoading(false);

        if (response.ok) {
            setRsvpStatus(true);
            router.refresh();
            toast({
                variant: "success",
                title: "Success",
                description: "RSVP successful",
            });
        } else {
            toast({
                variant: "error",
                title: "Error",
                description: "Failed to RSVP",
            });
        }
    };

    const cancelRsvp = async () => {
        setRsvpLoading(true);

        const response = await fetch("/api/cancel-rsvp", {
            method: "POST",
        });

        if (response.ok) {
            setRsvpStatus(false);
            router.replace("/dashboard?play=false");
            router.refresh();
            toast({
                variant: "success",
                title: "Success",
                description: "RSVP canceled",
            });
        } else {
            toast({
                variant: "error",
                title: "Error",
                description: "Failed to cancel RSVP",
            });
        }
        setRsvpLoading(false);
    };

    const firstName = user?.firstName ? user?.firstName : "Hacker";
    return (
        <div className="flex flex-col items-stretch py-[10vh] px-8 xl:px-16">
            <h1 className="text-5xl font-bold text-gray-700">
                Welcome,&nbsp;
                <span className="block md:inline text-secondary-600">{firstName}</span>
            </h1>
            <div className="border border-gray-300 mt-12 rounded-lg bg-gray-50 py-8 px-12">
                <div className="flex justify-between">
                    <h2 className="text-gray-600 font-semibold text-2xl">Application status</h2>
                    <Icon icon="fluent:form-multiple-48-filled" className="text-gray-500 text-4xl"/>
                </div>
                {(applicationStatus?.status === "unsubmitted" || !applicationStatus) &&
                    <>
                        <h1 className="text-secondary-600 font-bold text-4xl md:text-5xl pt-6">Not submitted</h1>
                        <p className="text-gray-600 text-lg pt-2 pb-8 font-medium">
                            You haven't started your application yet. Click the button below to start your application.
                        </p>
                        <Link href="/dashboard/application"
                              className="bg-secondary-600 text-xl py-2 px-4 rounded-lg text-gray-100 font-medium hover:bg-[#815eeb] duration-200">
                            Open application
                        </Link>
                    </>
                }
                {applicationStatus?.status === "submitted" &&
                    <>
                        <h1 className="text-secondary-600 font-bold text-4xl md:text-5xl pt-6">Submitted</h1>
                        <p className="text-gray-600 text-lg pt-2 pb-8 font-medium">
                            Your application has been submitted. We will review your application and get back to you
                            soon.
                        </p>
                    </>
                }
                {applicationStatus?.status === "accepted" &&
                    <>
                        <h1 className="text-secondary-600 font-bold text-4xl md:text-5xl pt-6">Accepted</h1>
                        {!initialRsvpStatus && playConfetti &&
                            <>
                                <div className="flex justify-center w-40">
                                    <Confetti particleCount={200} force={1}/>
                                </div>
                            </>
                        }
                        <p className="text-gray-600 text-lg pt-2 pb-8 font-medium">
                            Congratulations! Your application has been
                            accepted. {rsvpStatus ? "You have RSVP'd and your spot is confirmed." : "Please RSVP to confirm your spot."}
                        </p>
                        {rsvpStatus &&
                            <button onClick={cancelRsvp} disabled={rsvpLoading}
                                    className="flex justify-center items-center bg-secondary-600 text-xl py-2 px-4 h-12 w-40 rounded-lg text-gray-100 font-medium hover:bg-[#815eeb] duration-200">
                                {!rsvpLoading && "Cancel RSVP"}
                                {rsvpLoading && <Icon icon="eos-icons:loading" className="text-2xl animate-spin"/>}
                            </button>
                        }
                        {!rsvpStatus &&
                            <button onClick={rsvp} disabled={rsvpLoading}
                                    className="flex justify-center items-center bg-secondary-600 text-xl py-2 px-4 h-12 w-40 rounded-lg text-gray-100 font-medium hover:bg-[#815eeb] duration-200">
                                {!rsvpLoading && "RSVP"}
                                {rsvpLoading && <Icon icon="eos-icons:loading" className="text-2xl animate-spin"/>}
                            </button>
                        }
                    </>
                }
                {applicationStatus?.status === "rejected" &&
                    <>
                        <h1 className="text-secondary-600 font-bold text-4xl md:text-5xl pt-6">Rejected</h1>
                        <p className="text-gray-600 text-lg pt-2 pb-8 font-medium">
                            We're sorry, but your application has been rejected.
                        </p>
                    </>
                }
            </div>
            <div className="flex 2xl:flex-row flex-col gap-8 mt-8">
                <div className="border border-gray-300 rounded-lg bg-gray-50 py-8 px-12 flex-1 overflow-hidden">
                    <div className="flex justify-between">
                        <h2 className="text-gray-500 font-semibold text-2xl">Time until application deadline</h2>
                        <Icon icon="fluent:clock-12-filled" className="text-gray-500 text-4xl"/>
                    </div>
                    <DeadlineCountdown/>
                    <p className="text-gray-600 text-lg pt-2 pb-8 font-medium">
                        Applications will remain open until the day of the hackathon.<br/>They are due on April 4th,
                        2025 at 11:59 PM EST.
                    </p>
                </div>
                <div className="border border-gray-300 rounded-lg bg-gray-50 py-8 px-12 flex-1 overflow-hidden">
                    <div className="flex justify-between">
                        <h2 className="text-gray-500 font-semibold text-2xl">Time until Hackathon</h2>
                        <Icon icon="fluent:hourglass-half-16-regular" className="text-gray-500 text-4xl"/>
                    </div>
                    <CountdownTimer/>
                </div>
            </div>
            <div className="flex flex-col md:flex-row gap-8 mt-8">
                <div className="border border-gray-300 rounded-lg bg-gray-50 py-8 px-12 flex-1 overflow-hidden">
                    <div className="flex justify-between">
                        <h2 className="text-gray-600 font-semibold text-2xl">Discord server</h2>
                        <Icon icon="ic:baseline-discord" className="text-gray-500 text-4xl"/>
                    </div>
                    <h1 className="text-secondary-600 font-bold text-5xl pt-6">Our Discord server</h1>
                    <p className="text-gray-600 text-lg pt-2 pb-8 font-medium">
                        Join our Discord to connect with hackers and receive important announcements.
                    </p>
                    {applicationStatus?.status === "accepted" &&
                        <a href="https://discord.gg/ApEmE7g7GB" target="_blank" rel="noopener noreferrer"
                           className="bg-secondary-600 text-xl py-2 px-4 rounded-lg text-gray-100 font-medium hover:bg-[#815eeb] duration-200">
                            Discord
                        </a>
                    }
                    {applicationStatus?.status !== "accepted" &&
                        <a href="https://discord.gg/ApEmE7g7GB" target="_blank" rel="noopener noreferrer"
                           aria-disabled="true" tabIndex={-1}
                           className="pointer-events-none bg-secondary-300 text-xl py-2 px-4 rounded-lg text-gray-100 font-medium hover:bg-[#815eeb] duration-200">
                            Coming soon
                        </a>
                    }
                </div>
                <div className="border border-gray-300 rounded-lg bg-gray-50 py-8 px-12 flex-1 overflow-hidden">
                    <div className="flex justify-between">
                        <h2 className="text-gray-600 font-semibold text-2xl">Hacker package</h2>
                        <Icon icon="fluent:book-information-20-filled" className="text-gray-500 text-4xl"/>
                    </div>
                    <h1 className="text-secondary-600 font-bold text-5xl pt-6">View hacker package</h1>
                    <p className="text-gray-600 text-lg pt-2 pb-8 font-medium">
                        View the hacker package, complete with event info and schedules for EurekaHACKS 2025.
                    </p>
                    {applicationStatus?.status === "accepted" &&
                        <Link
                            className="bg-secondary-600 text-xl py-2 px-4 rounded-lg text-gray-100 font-medium hover:bg-[#815eeb] duration-200"
                            href="/hacker-package.pdf" target="_blank" rel="noopener noreferrer">
                            View
                        </Link>
                    }
                    {applicationStatus?.status !== "accepted" &&
                        <Link href="/dashboard" aria-disabled="true" tabIndex={-1}
                              className="pointer-events-none bg-secondary-300 text-xl py-2 px-4 rounded-lg text-gray-100 font-medium hover:bg-[#815eeb] duration-200">
                            Coming soon
                        </Link>
                    }
                </div>
            </div>
        </div>
    );
}