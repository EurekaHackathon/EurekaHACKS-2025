import ApplicationForm from "@/components/ApplicationForm";

export default function Application() {
    return (
        <>
            <div className="px-8 xl:px-16 text-gray-700">
                <div className="my-[10vh] m-auto">
                    <h1 className="text-5xl font-bold">Application</h1>
                    <ApplicationForm/>
                </div>
            </div>
        </>
    );
}
