import { db } from "@/lib/database";
import { getApplicationsPaginated } from "@/lib/sqlc/admin_sql";
import StatusBadge from "@/components/StatusBadge";
import Link from "next/link";

export default async function ApplicationsTable() {
    const applications = await getApplicationsPaginated(db, {
        limit: "10",
        offset: "0"
    });

    const formatDate = (date: Date) => {
        return date.toLocaleDateString("en-CA", {});
    };

    return (
        <div className="overflow-x-auto">
            <table className="w-full border min-w-[600px]">
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
                        <td className={`pr-12 text-start py-6 pl-4 ${index !== applications.length - 1 ? "border-b" : ""}`}>{application.firstName}</td>
                        <td className={`pr-12 text-start ${index !== applications.length - 1 ? "border-b" : ""}`}>{application.lastName}</td>
                        <td className={`pr-12 text-start text-nowrap ${index !== applications.length - 1 ? "border-b" : ""}`}>{application.school}</td>
                        <td className={`pr-12 text-start capitalize ${index !== applications.length - 1 ? "border-b" : ""}`}>
                            <StatusBadge status={application.status}/>
                        </td>
                        <td className={`text-start ${index !== applications.length - 1 ? "border-b" : ""}`}>{formatDate(application.createdAt)}</td>
                        <td className={`pr-12 text-start ${index !== applications.length - 1 ? "border-b" : ""}`}>
                            <Link className="border py-1 px-2 rounded-lg bg-white hover:bg-gray-200 duration-75"
                                  href={`/dashboard/admin/applications/${application.id}`}>View</Link>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}