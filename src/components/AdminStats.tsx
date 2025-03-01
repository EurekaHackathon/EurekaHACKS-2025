import AdminDashboardStat from "@/components/AdminDashboardStat";
import {
    getNumberOfAcceptedHackerApplications,
    getNumberOfHackerApplications, getNumberOfPendingHackerApplications,
    getNumberOfRegisteredUsers, getNumberOfRejectedHackerApplications
} from "@/lib/sqlc/admin_sql";
import { db } from "@/lib/database";

export default async function AdminStats() {
    const numberRegisteredUsers = await getNumberOfRegisteredUsers(db);
    const numberOfHackerApplications = await getNumberOfHackerApplications(db);
    const numberOfAcceptedApplications = await getNumberOfAcceptedHackerApplications(db);
    const numberOfRejectedApplications = await getNumberOfRejectedHackerApplications(db);
    const numberOfPendingApplications = await getNumberOfPendingHackerApplications(db);

    return (
        <div className="grid grid-cols-3 gap-4 mt-12">
            <AdminDashboardStat statName="Registered users" statValue={numberRegisteredUsers?.count ?? 0} icon="test"/>
            <AdminDashboardStat statName="Applications" statValue={numberOfHackerApplications?.count ?? 0} icon="test"/>
            <AdminDashboardStat statName="Accepted applications" statValue={numberOfAcceptedApplications?.count ?? 0}
                                icon="test"/>
            <AdminDashboardStat statName="Rejected applications" statValue={numberOfRejectedApplications?.count ?? 0}
                                icon="test"/>
            <AdminDashboardStat statName="Pending review" statValue={numberOfPendingApplications?.count ?? 0}
                                icon="test"/>
            <AdminDashboardStat statName="Checked-in hackers" statValue={0} icon="test"/>
        </div>
    );
}