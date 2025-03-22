import AdminDashboardStat from "@/components/AdminDashboardStat";
import {
    getNumberOfAcceptedHackerApplications,
    getNumberOfHackerApplications, getNumberOfPendingHackerApplications,
    getNumberOfRegisteredUsers, getNumberOfRejectedHackerApplications
} from "@/lib/sqlc/admin_sql";
import { db } from "@/lib/database";
import { getRsvpCount } from "@/lib/sqlc/application_sql";

export default async function AdminStats() {
    const numberRegisteredUsers = await getNumberOfRegisteredUsers(db);
    const numberOfHackerApplications = await getNumberOfHackerApplications(db);
    const numberOfAcceptedApplications = await getNumberOfAcceptedHackerApplications(db);
    const numberOfRejectedApplications = await getNumberOfRejectedHackerApplications(db);
    const numberOfPendingApplications = await getNumberOfPendingHackerApplications(db);
    const numberOfRsvps = await getRsvpCount(db);

    return (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mt-12">
            <AdminDashboardStat statName="Registered users" statValue={numberRegisteredUsers?.count ?? 0}
                                icon="fluent:person-12-filled"/>
            <AdminDashboardStat statName="Applications" statValue={numberOfHackerApplications?.count ?? 0}
                                icon="fluent:form-multiple-20-filled"/>
            <AdminDashboardStat statName="Accepted applications" statValue={numberOfAcceptedApplications?.count ?? 0}
                                icon="fluent:people-checkmark-20-filled"/>
            <AdminDashboardStat statName="Rejected applications" statValue={numberOfRejectedApplications?.count ?? 0}
                                icon="fluent:person-delete-20-filled"/>
            <AdminDashboardStat statName="Pending review" statValue={numberOfPendingApplications?.count ?? 0}
                                icon="fluent:person-clock-16-filled"/>
            <AdminDashboardStat statName="RSVP count" statValue={numberOfRsvps?.count ?? 0}
                                icon="fluent:arrow-sync-checkmark-20-filled"/>
        </div>
    );
}