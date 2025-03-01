import { Icon } from "@iconify/react";

export default function SubmittedApplication() {
    return (
        <>
            <div className="flex flex-col justify-center items-center h-screen text-gray-700 px-12 lg:px-20">
                <div className="min-h-24">
                    <Icon className="text-6xl text-green-400 mb-8" icon="rivet-icons:check-circle-breakout"/>
                </div>
                <h1 className="text-5xl font-semibold">Application submitted!</h1>
                <p className="text-lg mt-4">Thank you for applying to our hackathon. We will review your application
                    and
                    get back to you soon.</p>
            </div>
        </>
    );
}
