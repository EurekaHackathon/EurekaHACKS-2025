export default function ComingSoon({ text }: { text: string }) {
    return (
        <div className="text-gray-700">
            <h1 className="text-5xl font-bold text-center">Coming soon</h1>
            <h2 className="pt-4 text-2xl font-medium">{text}</h2>
        </div>
    );
}