"use client";

import { Input } from "@/components/Input";
import { SchoolSelect } from "@/components/SchoolSelect";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/Select";
import { CitySelect } from "@/components/CitySelect";
import { dietaryRestrictionsList } from "@/app/(dashboard)/dashboard/application/data";
import { Checkbox } from "@/components/Checkbox";
import { Icon } from "@iconify/react";
import React, { useActionState, useEffect, useState } from "react";
import { apply } from "@/lib/actions/application";
import { toast } from "@/hooks/use-toast";


const initialState = {
    error: "",
    payload: new FormData(),
};

export default function ApplicationForm() {
    const [state, formAction, pending] = useActionState(apply, initialState);
    const defaultYears = ["2025", "2026", "2027", "2028", "other"];
    const [graduationYear, setGraduationYear] = useState(
        defaultYears.includes(
            state.payload?.get("graduation-year") as (string | undefined) ?? "") ?
            state.payload?.get("graduation-year") ?? undefined : undefined
    );
    const initialDietaryRestrictions: Record<string, boolean> = {};
    dietaryRestrictionsList.forEach(name => initialDietaryRestrictions[name] = false);
    const [dietaryRestrictions, setDietaryRestrictions] = useState(initialDietaryRestrictions);
    useEffect(() => {
        setGraduationYear(defaultYears.includes(
            state.payload?.get("graduation-year") as (string | undefined) ?? "") ?
            state.payload?.get("graduation-year") ?? undefined : undefined
        );
        if (state.error) {
            toast({
                title: "Error",
                description: state.error,
            });
        }
        dietaryRestrictionsList.forEach(name => {
            if (state.payload?.get(name)) {
                setDietaryRestrictions({
                    ...dietaryRestrictions,
                    [name]: true,
                });
            }
        });
    }, [state]);

    return (
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
                        placeholder="John"
                        defaultValue={state.payload?.get("first-name")}
                        required
                    />
                    <Input
                        type="text"
                        label="Last name"
                        name="last-name"
                        placeholder="Smith"
                        defaultValue={state.payload?.get("last-name")}
                        required
                    />
                </div>
                <Input
                    type="email"
                    label="Email"
                    name="email"
                    placeholder="hello@eurekahacks.ca"
                    defaultValue={state.payload?.get("email")}
                    required
                />
                <Input
                    type="number"
                    label="Age"
                    name="age"
                    placeholder="18"
                    defaultValue={state.payload?.get("age")}
                    required
                />
                <div>
                    <label className="block text-lg font-medium">
                        School <span className="text-error-600">*</span>
                    </label>
                    <SchoolSelect payload={state.payload}/>
                </div>
                <div>
                    <label className="block text-lg font-medium">
                        Graduation year <span className="text-error-600">*</span>
                    </label>
                    <Select defaultValue={graduationYear as (string | undefined)}
                            value={graduationYear as (string | undefined)}
                            onValueChange={val => setGraduationYear(val)} required
                            name="graduation-year">
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
                {graduationYear === "other" &&
                    <Input defaultValue={state.payload?.get("graduation-year-other")}
                           label="Graduation year (other)" className="mt-4" required type="number"
                           name="graduation-year-other"/>}
                <div>
                    <label className="block text-lg font-medium">
                        City <span className="text-error-600">*</span>
                    </label>
                    <CitySelect payload={state.payload}/>
                </div>

                {/*Number hackathons attended*/}
                <div>
                    <Input defaultValue={state.payload?.get("number-hackathons-attended")}
                           label="Number of hackathons attended" type="number" min={0} required
                           name="number-hackathons-attended" placeholder={0}/>
                </div>
                {/*Short answer question*/}
                <div>
                    <label className="block text-lg font-medium">
                        Short answer question <span className="text-error-600">*</span>
                    </label>
                    <h3 className="font-medium text-gray-500">Max 300 characters</h3>
                    <CharacterLimiter defaultValue={state.payload?.get("short-answer")} maxChars={300}
                                      label="Short answer" name="short-answer"/>
                </div>
                <div>
                    <h2 className="text-3xl font-semibold mt-8">Dietary Restrictions</h2>
                    <h3 className="font-medium text-gray-500">Select all that apply</h3>
                </div>

                <div className="border rounded-md border-gray-300 py-4 px-6 grid gap-2">
                    {dietaryRestrictionsList.map((name, key) =>
                        <div key={key} className="flex items-center gap-4">
                            <Checkbox defaultChecked={dietaryRestrictions[name]}
                                      checked={dietaryRestrictions[name]}
                                      onCheckedChange={checked => setDietaryRestrictions({
                                          ...dietaryRestrictions,
                                          [name]: checked as boolean
                                      })}
                                      name={name}/>
                            <label>{name}</label>
                        </div>
                    )}
                    {dietaryRestrictions["Other"] &&
                        <>
                          <Input
                              defaultValue={state.payload?.get("other-dietary-restrictions")}
                              type="text"
                              required
                              label="Other dietary restrictions"
                              name="other-dietary-restrictions"
                              placeholder="Please specify"/>
                        </>
                    }
                </div>

                <div>
                    <h2 className="text-3xl font-semibold mt-8">Socials</h2>
                    <h3 className="font-medium text-gray-500">(Optional)</h3>
                </div>

                <Input
                    type="url"
                    label="GitHub"
                    name="github"
                    placeholder="https://github.com/torvalds"
                    defaultValue={state.payload?.get("github")}
                />

                <Input
                    type="url"
                    label="LinkedIn"
                    name="linkedin"
                    placeholder="https://www.linkedin.com/in/williamhgates/"
                    defaultValue={state.payload?.get("linkedin")}
                />

                <Input
                    type="url"
                    label="Portfolio"
                    name="portfolio"
                    placeholder="https://eurekahacks.ca"
                    defaultValue={state.payload?.get("portfolio")}
                />

                <Input
                    type="url"
                    label="Link to resume"
                    name="resume"
                    placeholder="https://eurekahacks.ca/resume.pdf"
                    defaultValue={state.payload?.get("resume")}
                />

                <div className="mb-6">
                    <h2 className="text-3xl font-semibold mt-8">Emergency Contact Information</h2>
                </div>

                <div className="flex flex-col lg:flex-row gap-4">
                    <Input
                        type="text"
                        label="Full name"
                        name="emergency-contact-full-name"
                        placeholder="John Smith"
                        defaultValue={state.payload?.get("emergency-contact-full-name")}
                        required
                    />
                    <PhoneInput
                        label="Phone number"
                        name="emergency-contact-phone"
                        prev={state.payload?.get("emergency-contact-phone")}
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
    );
}

function PhoneInput({ label, ...props }: any) {
    const [value, setValue] = useState(props.prev ?? "");

    return (
        <div className="flex-1">
            <label className="block text-lg font-medium">
                {label} {props.required && <span className="text-error-600">*</span>}
            </label>
            <input {...props}
                   type="tel"
                   className="border-gray-300 border hover:border-secondary-300 focus:outline-none rounded-lg w-full py-2 px-4 mt-2"
                   placeholder="(555) 555-555"
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

function CharacterLimiter({ maxChars, defaultValue, name }: {
    maxChars: number,
    label: string,
    name: string,
    defaultValue: undefined | null | FormDataEntryValue
}) {
    const [value, setValue] = useState(defaultValue as (string | undefined) ?? "");
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
                placeholder="Type your answer here..."
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