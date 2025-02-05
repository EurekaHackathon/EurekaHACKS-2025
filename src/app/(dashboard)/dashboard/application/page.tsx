"use client";

import { useDashboardCtx } from "@/lib/dashboard-ctx";

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/Select"

const schools = [
    "Abbey Park",
    "Iroquois"
]

export default function ApplicationPage() {
    const { user } = useDashboardCtx();

    /*
    
    if (user?.applied) {
        return ();
    }

    age
    pronouns
    school
    year_of_graduation
    country
    province
    dietary resitrctions
    # hackathons attended
    github link
    linkedin link
    portfolio link
    resume link
    emergency contact first name
    emergency contact last name
    emergency contact information
    emergency contact phone #
    short answer response


    */

    return (
        <div className="mt-[10vh] max-w-screen-lg m-auto text-gray-700">
            <h1 className="text-5xl font-bold text-secondary-600">Application</h1>


            <form className="mt-16">

                <div className="mb-6">
                    <h2 className="text-3xl font-semibold mt-8">Personal information</h2>
                    <h3 className="font-medium text-gray-500">This will not affect your application information.</h3>
                </div>

                <div className="grid gap-4">
                    <div className="flex gap-4 w-full">
                        <Input
                            type="text"
                            label="First name"
                            defaultValue={user?.firstName ?? ""}
                        />
                        <Input
                            type="text"
                            label="Last name"
                            defaultValue={user?.lastName ?? ""}
                        />
                    </div>
                    <Input
                        type="text"
                        label="Email"
                        defaultValue={user?.email ?? ""}
                    />

                    <Input
                        type="number"
                        label="Age"
                        defaultValue={user?.email ?? ""}
                    />

                    <div>
                        <label className="block text-lg font-medium">Graduating year</label>
                        <Select>
                            <SelectTrigger>
                                <SelectValue placeholder="Select a year" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectItem value="2025">2025</SelectItem>
                                    <SelectItem value="2026">2026</SelectItem>
                                    <SelectItem value="2027">2027</SelectItem>
                                    <SelectItem value="2028">2028</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>

                    <div>
                        <label className="block text-lg font-medium">School</label>
                        <Select>
                            <SelectTrigger>
                                <SelectValue placeholder="Select a year" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    {schools.map((name, key) => <SelectItem value={name} key={key}>{name}</SelectItem>)}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>

                </div>

                <button type="submit"
                    className="bg-secondary-600 text-gray-100 font-medium py-2 px-4 rounded-lg mt-8 hover:bg-[#815eeb] duration-200">
                    Submit Application
                </button>
            </form>
        </div>
    )
}

function Input({ label, ...props }: any) {
    return (
        <div className="flex-1">
            <label className="block text-lg font-medium">{label}</label>
            <input {...props}
                className="border-gray-300 border hover:border-secondary-300 focus:outline-none rounded-lg w-full py-2 px-4 mt-2" />
        </div>
    );
}

