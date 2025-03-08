import { Icon } from "@iconify/react";

export default function ApplicationLinkBox({ icon, label, link }: {
    icon: string,
    label: string,
    link: string
}) {
    return (
        <div className="border-secondary-200 border flex items-center justify-between p-4 rounded-lg">
            <div className="flex items-center gap-2">
                <Icon icon={icon} className="text-xl"/>
                {label}
            </div>
            {link === "" &&
                <p>None</p>
            }
            {link !== "" &&
                <a href={link} target="_blank" rel="noreferrer" className="text-secondary-600">
                  View
                </a>
            }
        </div>
    );
}