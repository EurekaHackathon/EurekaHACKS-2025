import { db } from "@/lib/database";
import {
    getApplicationsPaginated,
    getNumberOfApplicationsFiltered,
} from "@/lib/sqlc/admin_sql";
import StatusBadge from "@/components/StatusBadge";
import Link from "next/link";
import Pagination from "@/components/Pagination";
import ApplicationsSearch from "@/components/ApplicationsSearch";

const clamp = (value: number, min: number, max: number) => {
    return Math.min(Math.max(value, min), max);
};

export default async function ApplicationsTable({searchParams,}: {
    searchParams: Promise<{ [key: string]: string | undefined }>
}) {
    const numberOfApplications = await getNumberOfApplicationsFiltered(db, {
        searchQuery: (await searchParams).q?.toString().trim() ?? "",
        onlyWithRsvp: (await searchParams).rsvp === "true",
    });

    const params = await searchParams;
    let page = params.page ? clamp(parseInt(params.page), 1, Math.max(Math.ceil(parseInt(numberOfApplications?.count ?? "1") / 10), 1)) : 1;
    if (isNaN(page)) {
        page = 1;
    }

    const applications = await getApplicationsPaginated(db, {
        limit: "10",
        offset: ((page - 1) * 10).toString(),
        searchQuery: params.q?.toString().trim() ?? "",
        onlyWithRsvp: params.rsvp === "true",
    });

    const formatDate = (date: Date) => {
        return date.toLocaleDateString("en-CA", {});
    };

    return (
        <div className="overflow-x-auto grid">
            <div className="pb-12">
                <ApplicationsSearch page={page} query={params.q?.toString().trim() ?? ""}/>
            </div>
            <table className="w-full border">
                <thead>
                <tr className="text-sm 2xl:text-base text-gray-500 hover:bg-gray-100 duration-75">
                    <th className="text-start border-b py-4 pl-4 mr-12">First Name</th>
                    <th className="text-start border-b mr-12">Last Name</th>
                    <th className="text-start border-b mr-12">School</th>
                    <th className="text-start border-b mr-12">Status</th>
                    <th className="text-start text-nowrap border-b mr-12">Date submitted</th>
                    <th className="text-start border-b mr-12"></th>
                </tr>
                </thead>
                <tbody>
                {applications.map((application, index) => (
                    <tr className="text-gray-700 2xl:text-lg font-semibold hover:bg-gray-100 duration-75"
                        key={application.id}>
                        <td className={`pr-4 text-start py-6 pl-4 ${index !== applications.length - 1 ? "border-b" : ""}`}>
                            <div className="w-24 text-nowrap overflow-x-auto">
                                {application.firstName}
                            </div>
                        </td>
                        <td className={`pr-4 text-start ${index !== applications.length - 1 ? "border-b" : ""}`}>
                            <div className="w-24 text-nowrap overflow-x-auto">
                                {application.lastName}
                            </div>
                        </td>
                        <td className={`pr-4 text-start ${index !== applications.length - 1 ? "border-b" : ""}`}>
                            <div className="w-96 text-nowrap overflow-x-auto">
                                {application.school}
                            </div>
                        </td>
                        <td className={`pr-4 text-start capitalize ${index !== applications.length - 1 ? "border-b" : ""}`}>
                            <div className="w-32">
                                <StatusBadge status={application.rsvped ? "rsvped" : application.status}/>
                            </div>
                        </td>
                        <td className={`text-start ${index !== applications.length - 1 ? "border-b" : ""}`}>
                            <div className="w-32">
                                {formatDate(application.createdAt)}
                            </div>
                        </td>
                        <td className={`pr-4 text-start ${index !== applications.length - 1 ? "border-b" : ""}`}>
                            <div className="w-16">
                                <Link className="border py-1 px-2 rounded-lg bg-white hover:bg-gray-200 duration-75"
                                      href={`/dashboard/admin/applications/${application.id}?from=${page}`}>View</Link>
                            </div>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            <Pagination className="w-full mt-4" currentPage={page} numberOfCurrentItems={applications.length}
                        query={params.q?.toString().trim() ?? ""}
                        rsvp={params.rsvp === "true"}
                        numberOfTotalItems={isNaN(parseInt(numberOfApplications?.count ?? "0")) ? 0 : parseInt(numberOfApplications?.count ?? "0")}/>
        </div>
    );
}