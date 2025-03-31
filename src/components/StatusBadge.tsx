export default function StatusBadge({status, className}: { status: string, className?: string }) {
    const getGetStatusColor = (status: string) => {
        if (status === "accepted") {
            return "bg-green-500";
        }
        if (status === "rejected") {
            return "bg-error-500";
        }
        if (status === "waitlisted") {
            return "bg-accent-400";
        }
        if (status === "RSVPed") {
            return "bg-sky-500";
        }
        return "bg-secondary-500";
    };

    if (status === "rsvped") {
        status = "RSVPed";
    }

    return (
        <div
            className={`${className} text-base text-center capitalize text-white rounded-full py-1 px-4 w-32 ${getGetStatusColor(status)}`}>{status}</div>
    );
}