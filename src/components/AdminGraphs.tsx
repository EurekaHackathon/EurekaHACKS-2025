import ApplicationCountGraph from "@/components/ApplicationCountGraph";
import { getApplicationCountPerDay } from "@/lib/sqlc/admin_sql";
import { db } from "@/lib/database";

export default async function AdminGraphs() {
    const applicationCountData = await getApplicationCountPerDay(db);
    return (
        <div className="mt-8 flex justify-center">
            <div className="w-full text-center">
                <h1 className="text-gray-700 text-2xl md:text-3xl lg:text-4xl font-semibold mb-6">Application count over time</h1>
                <ApplicationCountGraph applicationCountData={applicationCountData}/>
            </div>
        </div>
    );
}