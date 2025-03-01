export default function AdminDashboardStat({ statName, statValue, icon }: {
    statName: string,
    statValue: string | number,
    icon: string
}) {
    return (
        <div className="border border-secondary-200 rounded-xl px-6 py-8 bg-secondary-50 bg-opacity-50">
            <h1 className="text-xl text-gray-600 font-semibold">{statName}</h1>
            <p className="text-3xl font-bold text-gray-700 mt-2">{statValue}</p>
        </div>
    );
}