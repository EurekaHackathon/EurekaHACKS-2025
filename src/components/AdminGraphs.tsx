import ApplicationCountGraph from "@/components/ApplicationCountGraph";
import { getApplicationCountPerDay, getNumberOfApplicationsPerSchool } from "@/lib/sqlc/admin_sql";
import { db } from "@/lib/database";
import SchoolCountGraph from "@/components/SchoolCountGraph";

export default async function AdminGraphs() {
    const applicationCountData = await getApplicationCountPerDay(db);
    const schoolCountData = await getNumberOfApplicationsPerSchool(db);
    return (
        <div className="mt-8 flex justify-center">
            <div className="w-full text-center">
                <div>
                    <h1 className="text-gray-700 text-2xl md:text-3xl lg:text-4xl font-semibold mb-6">
                        Application count over time
                    </h1>
                    <ApplicationCountGraph applicationCountData={applicationCountData}/>
                </div>
                <div className="mt-16">
                    <h1 className="text-gray-700 text-2xl md:text-3xl lg:text-4xl font-semibold mb-6">
                        Application count by school
                    </h1>
                    <SchoolCountGraph schoolCountData={schoolCountData}/>
                </div>
            </div>
        </div>
    );
}