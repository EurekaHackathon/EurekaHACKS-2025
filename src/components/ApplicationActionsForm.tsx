"use client";

import { Icon } from "@iconify/react";
import { useRouter } from "next/navigation";
import { toast } from "@/hooks/use-toast";
import { useState } from "react";

export function ApplicationActionsForm({ id }: { id: number }) {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState([false, false, false, false]);

    const updateStatus = async (status: string, index: number) => {
        setIsLoading(prevState => {
            const newLoadingState = [...prevState];
            newLoadingState[index] = true;
            return newLoadingState;
        });

        const formData = new FormData();
        formData.append("applicationId", id.toString());
        formData.append("status", status);

        const response = await fetch("/api/application/update-status", {
            method: "POST",
            body: formData
        });

        setIsLoading(prevState => {
            const newLoadingState = [...prevState];
            newLoadingState[index] = false;
            return newLoadingState;
        });

        if (response.ok) {
            router.refresh();
            toast({
                variant: "success",
                title: "Success",
                description: "Application status updated",
            });
        } else {
            toast({
                variant: "error",
                title: "Error",
                description: "Failed to update application status",
            });
        }
    };

    return (
        <div className="mt-8">
            {/*Show hidden icon to load it initially*/}
            <Icon icon="eos-icons:loading" className="hidden"/>
            <h1 className="text-xl font-semibold">Actions</h1>
            <div className="grid xl:grid-cols-4 gap-4 mt-4">
                <button onClick={() => updateStatus("rejected", 0)}
                        className="py-2 border-error-600 border rounded-lg text-error-600 flex items-center gap-2 justify-center duration-200 ease-in-out hover:scale-105">
                    {isLoading[0] ? <Icon icon="eos-icons:loading" className="text-2xl animate-spin"/> :
                        <Icon icon="fluent:dismiss-circle-32-regular" className="text-2xl"/>}
                    Reject
                </button>
                <button onClick={() => updateStatus("waitlisted", 1)}
                        className="py-2 border-orange-500 border rounded-lg text-orange-500 flex items-center gap-2 justify-center duration-200 ease-in-out hover:scale-105">
                    {isLoading[1] ? <Icon icon="eos-icons:loading" className="text-2xl animate-spin"/> :
                        <Icon icon="fluent:clock-12-regular" className="text-2xl"/>}
                    Waitlist
                </button>
                <button onClick={() => updateStatus("accepted", 2)}
                        className="py-2 border-green-500 border rounded-lg text-green-500 flex items-center gap-2 justify-center duration-200 ease-in-out hover:scale-105">
                    {isLoading[2] ? <Icon icon="eos-icons:loading" className="text-2xl animate-spin"/> :
                        <Icon icon="fluent:checkmark-circle-12-regular" className="text-2xl"/>}
                    Accept
                </button>
                <button onClick={() => updateStatus("submitted", 3)}
                        className="py-2 border-secondary-600 border rounded-lg text-secondary-600 flex items-center gap-2 justify-center duration-200 ease-in-out hover:scale-105">
                    {isLoading[3] ? <Icon icon="eos-icons:loading" className="text-2xl animate-spin"/> :
                        <Icon icon="fluent:arrow-reset-20-filled" className="text-2xl"/>}
                    Reset status
                </button>
            </div>
        </div>
    );
}