import Link from "next/link";
import { Icon } from "@iconify/react";
import { getApplicationById } from "@/lib/sqlc/admin_sql";
import { db } from "@/lib/database";
import { redirect } from "next/navigation";
import StatusBadge from "@/components/StatusBadge";
import ApplicationItem from "@/components/ApplicationItem";
import ApplicationLinkBox from "@/components/ApplicationLinkBox";
import { ApplicationActionsForm } from "@/components/ApplicationActionsForm";

const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const months = Math.floor(days / 30);
    const years = Math.floor(months / 12);

    if (years > 0) {
        return years + " year" + (years > 1 ? "s" : "");
    }

    if (months > 0) {
        return months + " month" + (months > 1 ? "s" : "");
    }

    if (days > 0) {
        return days + " day" + (days > 1 ? "s" : "");
    }

    if (hours > 0) {
        return hours + " hour" + (hours > 1 ? "s" : "");
    }

    if (minutes > 0) {
        return minutes + " minute" + (minutes > 1 ? "s" : "");
    }

    return seconds + " second" + (seconds > 1 ? "s" : "");
};

export default async function Application({
                                              params, searchParams
                                          }: {
    params: Promise<{ id: string }>,
    searchParams: Promise<{ [key: string]: string | undefined }>
}) {
    const {id} = await params;
    const {from} = await searchParams;
    // If id is not a number, go back
    if (isNaN(parseInt(id))) {
        redirect("/dashboard/admin/applications");
    }

    const application = await getApplicationById(db, {
        id: parseInt(id),
    });

    if (!application) {
        redirect("/dashboard/admin/applications");
    }

    const formatDietaryRestrictions = (restrictions: string[] | null) => {
        if (!restrictions) {
            return "None";
        }

        if (restrictions.length === 0) {
            return "None";
        }

        // Capitalize first letter
        return restrictions.map((restriction) => restriction.charAt(0).toUpperCase() + restriction.slice(1)).join(", ");
    };

    return (
        <div className="mt-8">
            <Link href={"/dashboard/admin/applications?page=" + from}
                  className="border flex items-center justify-center gap-2 font-semibold text-gray-700 rounded-lg w-64 h-10 duration-75 hover:bg-gray-50">
                <Icon icon="fluent:arrow-left-24-filled" className="text-2xl"/>
                Back to applications list
            </Link>
            <div
                className="bg-secondary-50 bg-opacity-50 border-secondary-200 border rounded-xl mt-8 p-6 text-gray-700 font-semibold">
                <div className="flex items-center gap-8">
                    <h1 className="text-2xl font-semibold">{application.firstName} {application.lastName}</h1>
                    <StatusBadge className="font-semibold" status={application.status}/>
                </div>
                <div className="mt-2 text-gray-500">
                    <h1>
                        Submitted: {application.createdAt.toLocaleDateString("en-CA")} at {new Intl.DateTimeFormat("en-CA", {
                        hour: "2-digit",
                        minute: "2-digit",
                        second: "2-digit",
                        hour12: false,
                        timeZone: "America/Toronto",
                    }).format(application.createdAt)} ({formatTimeAgo(application.createdAt)} ago)
                    </h1>
                </div>
                <div className="grid md:grid-cols-2 xl:grid-cols-3 mt-8 gap-4">
                    <ApplicationItem label="Full name" icon="icon-park-outline:edit-name"
                                     value={application.firstName + " " + application.lastName}/>
                    <ApplicationItem label="Email" icon="fluent:mail-24-regular" value={application.email}/>
                    <ApplicationItem label="Age" icon="fluent:person-24-regular"
                                     value={application.age.toString()}/>
                    <ApplicationItem label="Hackathons attended" icon="fluent:code-block-16-regular"
                                     value={application.numberOfHackathonsAttended.toString()}/>
                    <ApplicationItem label="City" icon="fluent:location-24-regular" value={application.city}/>
                    <ApplicationItem label="School" icon="fluent:hat-graduation-12-regular"
                                     value={application.school}/>
                    <ApplicationItem label="Year of graduation" icon="fluent:calendar-12-regular"
                                     value={application.yearOfGraduation.toString()}/>
                    <ApplicationItem label="Dietary restrictions" icon="fluent:food-24-regular"
                                     value={formatDietaryRestrictions(application.dietaryRestrictions)}/>
                </div>
                <hr className="mt-8 border-secondary-200"/>
                {/*Emergency Contact*/}
                <div className="mt-8">
                    <h1 className="text-xl font-semibold">Emergency Contact</h1>
                    <div className="grid md:grid-cols-2 gap-4 mt-4">
                        <ApplicationItem label="Full name" icon="icon-park-outline:edit-name"
                                         value={application.emergencyContactFullName}/>
                        <ApplicationItem label="Phone number" icon="fluent:phone-24-regular"
                                         value={application.emergencyContactPhoneNumber}/>
                    </div>
                </div>
                <hr className="mt-8 border-secondary-200"/>
                {/*Links*/}
                <div className="mt-8">
                    <h1 className="text-xl font-semibold">Links</h1>
                    <div className="grid md:grid-cols-2 gap-4 mt-4">
                        <ApplicationLinkBox icon="mdi:github" label="GitHub" link={application.githubLink ?? "None"}/>
                        <ApplicationLinkBox icon="basil:linkedin-outline" label="LinkedIn"
                                            link={application.linkedinLink ?? "None"}/>
                        <ApplicationLinkBox label="Portfolio website" link={application.portfolioLink ?? "None"}
                                            icon="fluent:globe-12-regular"/>
                        <ApplicationLinkBox icon="fluent:document-one-page-16-regular" label="Resume"
                                            link={application.resumeLink ?? "None"}/>
                    </div>
                </div>
                <hr className="mt-8 border-secondary-200"/>
                {/*Actions*/}
                <ApplicationActionsForm id={application.id}/>
            </div>
        </div>
    );
};