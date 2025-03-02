export default function StatusBadge({ status }: { status: string }) {
    const getGetStatusColor = (status: string) => {
        if (status === "accepted") {
            return "bg-green-400";
        }
        if (status === "rejected") {
            return "bg-error-500";
        }
        if (status === "pending") {
            return "bg-bg-accent-400";
        }
        return "bg-secondary-500";
    };

    return (
        <div>
            <span className={`text-base capitalize text-white rounded-full py-1 px-4 ${getGetStatusColor(status)}`}>{status}</span>
        </div>
    );
}