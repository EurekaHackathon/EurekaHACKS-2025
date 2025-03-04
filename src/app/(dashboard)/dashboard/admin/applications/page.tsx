import ApplicationsTable from "@/components/ApplicationsTable";

export const dynamic = "force-dynamic";

export default async function AdminApplicationView({ searchParams, }: {
    searchParams: Promise<{ [key: string]: string | undefined }>
}) {
    return (
        <div className="mt-12">
            <ApplicationsTable searchParams={searchParams}/>
        </div>
    );
}