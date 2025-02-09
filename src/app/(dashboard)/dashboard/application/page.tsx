"use client";

import { useActionState, useState } from "react";
import { useDashboardCtx } from "@/lib/dashboard-ctx";

import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue, } from "@/components/Select";
import { Checkbox } from "@/components/Checkbox";

import { dietaryRestrictionsList } from "./data";
import { apply } from "@/lib/actions/application";
import { Icon } from "@iconify/react";
import { SchoolSelect } from "@/components/SchoolSelect";
import { CitySelect } from "@/components/CitySelect";
import { Input } from "@/components/Input";

const initialState = {
    error: ""
};

export default function ApplicationPage() {
    const { user } = useDashboardCtx();

    const [_state, formAction, pending] = useActionState(apply, initialState);

    return (
        <div className="px-20 text-gray-700">
            <div className="my-[10vh] max-w-screen-lg m-auto">
                <h1 className="text-5xl font-bold">Application</h1>

                <form className="mt-8" action={formAction}>

                    <div className="mb-6">
                        <h2 className="text-3xl font-semibold mt-8">Personal information</h2>
                    </div>

                    <div className="grid gap-4 mb-4">
                        <div className="flex flex-col lg:flex-row gap-4">
                            <Input
                                type="text"
                                label="First name"
                                name="first-name"
                                required
                            />
                            <Input
                                type="text"
                                label="Last name"
                                name="last-name"
                                required
                            />
                        </div>
                        <Input
                            type="email"
                            label="Email"
                            name="email"
                            required
                        />
                        <Input
                            type="number"
                            label="Age"
                            name="age"
                            required
                        />
                        <div>
                            <label className="block text-lg font-medium">School</label>
                            <SchoolSelect/>
                        </div>
                        <div>
                            <label className="block text-lg font-medium">Graduation year</label>
                            <Select required name="graduation-year">
                                <SelectTrigger>
                                    <SelectValue placeholder="Select a year"/>
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectItem value="2025">2025</SelectItem>
                                        <SelectItem value="2026">2026</SelectItem>
                                        <SelectItem value="2027">2027</SelectItem>
                                        <SelectItem value="2028">2028</SelectItem>
                                        <SelectItem value="other">Other</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
                        <div>
                            <label className="block text-lg font-medium">City</label>
                            <CitySelect/>
                        </div>

                        {/*Number hackathons attended*/}
                        <div>
                            <label className="block text-lg font-medium">Number of hackathons attended</label>
                            <input type="number" min={0} required name="number-hackathons-attended"
                                   className="border-gray-300 border hover:border-secondary-300 focus:outline-none rounded-lg w-full py-2 px-4 mt-2"/>
                        </div>
                        {/*Short answer question*/}
                        <div>
                            <label className="block text-lg font-medium">Short answer question</label>
                            <h3 className="font-medium text-gray-500">Max 300 characters</h3>
                            <CharacterLimiter maxChars={300} label="Short answer" name="short-answer" />
                        </div>
                        <div>
                            <h2 className="text-3xl font-semibold mt-8">Dietary Restrictions</h2>
                            <h3 className="font-medium text-gray-500">Select all that apply</h3>
                        </div>

                        <div className="border rounded-md border-gray-300 py-4 px-6 grid gap-2">
                            {dietaryRestrictionsList.map((name, key) =>
                                <div key={key} className="flex items-center gap-4">
                                    <Checkbox required name={name.toLowerCase()}/>
                                    <label>{name}</label>
                                </div>
                            )}
                        </div>

                        <div>
                            <h2 className="text-3xl font-semibold mt-8">Socials</h2>
                            <h3 className="font-medium text-gray-500">(Optional)</h3>
                        </div>

                        <Input
                            type="url"
                            label="GitHub"
                            name="github"
                        />

                        <Input
                            type="url"
                            label="LinkedIn"
                            name="linkedin"
                        />

                        <Input
                            type="url"
                            label="Portfolio"
                            name="portfolio"
                        />

                        <Input
                            type="url"
                            label="Link to resume"
                            name="resume"
                        />

                        <div className="mb-6">
                            <h2 className="text-3xl font-semibold mt-8">Emergency Contact Information</h2>
                        </div>

                        <div className="flex flex-col lg:flex-row gap-4">
                            <Input
                                type="text"
                                label="Full name"
                                name="emergency-contact-name"
                                required
                            />
                            <PhoneInput
                                label="Phone number"
                                name="emergency-contact-phone"
                                required
                            />
                        </div>
                    </div>

                    <button
                        className="bg-secondary-600 text-gray-100 font-medium py-2 px-4 rounded-lg mt-8 hover:bg-[#815eeb] duration-200 relative"
                        type="submit" disabled={pending}>
                        <span className={pending ? "text-transparent" : ""}>Submit</span>
                        {pending && <Icon
                            className="text-2xl md:text-3xl lg:text-4xl absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]"
                            icon="codex:loader"/>}
                    </button>
                </form>
            </div>
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

                       if (digits.length > 0) format = digits.slice(0, 3);
                       if (digits.length > 3) format = `(${format}) ${digits.slice(3, 6)}`;
                       if (digits.length > 6) format = `${format}-${digits.slice(6)}`;

                       setValue(format);
                   }}

            />
        </div>
    );
}

function CharacterLimiter({ maxChars, label, name }: { maxChars: number, label: string, name: string }) {
    const [value, setValue] = useState("");
    const [remainingChars, setRemainingChars] = useState(maxChars);

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const inputValue = e.target.value;
        if (inputValue.length <= maxChars) {
            setValue(inputValue);
            setRemainingChars(maxChars - inputValue.length);
        }
    };

    return (
        <div>
            <textarea
                name={name}
                value={value}
                onChange={handleChange}
                className="resize-none h-32 border-gray-300 border hover:border-secondary-300 focus:outline-none rounded-lg w-full py-2 px-4 mt-2"
            />
            <div className="text-right text-sm text-gray-500">
                {remainingChars} characters remaining
            </div>
        </div>
    );
}