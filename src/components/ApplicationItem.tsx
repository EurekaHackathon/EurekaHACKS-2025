import { Icon } from "@iconify/react";

export default function ApplicationItem({ label, value, icon }: { label: string, value: string, icon: string }) {
    return (
        <div>
            <div className="flex items-center">
                <div className="min-w-8">
                    <Icon icon={icon} className="text-xl"/>
                </div>
                {label}
            </div>
            <p className="ml-8 text-gray-500">
                {value}
            </p>
        </div>
    );
}