"use client";

import { useActionState, useState } from "react";
import { useDashboardCtx } from "@/lib/dashboard-ctx";

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/Select"
import { Checkbox } from "@/components/Checkbox";

import { schools, diets } from "./data";
import { apply } from "@/lib/actions/application";
import { Icon } from "@iconify/react";

const initialState = {
    error: ""
};

export default function ApplicationPage() {
    const { user } = useDashboardCtx();

    // if (user?.applied) {
    //     return (
    //         <div className="text-gray-700">
    //             <h1 className="text-5xl font-bold text-center">See you Soon!</h1>
    //             <h2 className="pt-4 text-2xl font-medium">Looks like you've already submitted an application</h2>
    //         </div>
    //     );
    // }

    const [_state, formAction, pending] = useActionState(apply, initialState);

    return (
        <div className="my-[10vh] max-w-screen-lg m-auto text-gray-700">
            <h1 className="text-5xl font-bold text-secondary-600">Application</h1>

            <form className="mt-16" action={formAction}>

                <div className="mb-6">
                    <h2 className="text-3xl font-semibold mt-8">Personal information</h2>
                </div>

                <div className="grid gap-4 mb-4">
                    <div className="flex gap-4">
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

                    <div>
                        <h2 className="text-3xl font-semibold mt-8">Dietary Restrictions</h2>
                        <h3 className="font-medium text-gray-500">Select all that apply</h3>
                    </div>

                    <div className="mt-4 border rounded-md border-gray-300 py-4 px-6 grid gap-2">
                        {diets.map((name, key) =>
                            <div key={key} className="flex items-center gap-4">
                                <Checkbox />
                                <label>{name}</label>
                            </div>
                        )}
                    </div>

                    <div className="mb-6">
                        <h2 className="text-3xl font-semibold mt-8">Emergency Contact Information</h2>
                    </div>

                    <div className="flex gap-4 w-full">
                        <Input
                            type="text"
                            label="Name"
                        />
                        <PhoneInput
                            label="Phone number"
                        />
                    </div>

                </div>

                <button
                    className="bg-secondary-600 text-gray-100 font-medium py-2 px-4 rounded-lg mt-8 hover:bg-[#815eeb] duration-200 relative"
                    type="submit" disabled={pending}>
                    <span className={pending ? "text-transparent" : ""}>Submit</span>
                    {pending && <Icon className="text-2xl md:text-3xl lg:text-4xl absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]" icon="codex:loader" />}
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

function PhoneInput({ label, ...props }: any) {
    const [value, setValue] = useState("");

    return (
        <div className="flex-1">
            <label className="block text-lg font-medium">{label}</label>
            <input {...props}
                type="tel"
                className="border-gray-300 border hover:border-secondary-300 focus:outline-none rounded-lg w-full py-2 px-4 mt-2"
                placeholder="(XXX) XXX-XXXX"
                value={value}
                onChange={e => {
                    const digits = e.target.value.replace(/\D/g, "").slice(0, 10);
                    let format = "";

                    console.log(digits);

                    if (digits.length > 0) {
                        format = digits.slice(0, 3);
                    }

                    if (digits.length > 3) {
                        console.log(digits.slice(3, 6))
                        format = `(${format}) ${digits.slice(3, 6)}`
                    }

                    if (digits.length > 6) {
                        format = `${format}-${digits.slice(6)}`
                    }

                    setValue(format)
                }}

            />
        </div>
    );
}

