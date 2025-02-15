"use client";

import * as React from "react";

import { Input } from "@/components/Input";
import { cn } from "@/lib/utils";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/Command";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/Popover";
import { ontarioSchoolsList } from "@/app/(dashboard)/dashboard/application/data";
import { Icon } from "@iconify/react";

const data = ontarioSchoolsList.map((school) => ({
    label: school,
    value: school,
}));

const filterFunction = (value: string, search: string, keywords: string[] | undefined): number => {
    if (value.toLowerCase().includes(search.toLowerCase())) {
        return 1;
    }
    if (value === "Other") {
        return 1;
    }
    return 0;
};

export function SchoolSelect({ payload }: { payload: FormData | undefined }) {
    const [open, setOpen] = React.useState(false);
    const [value, setValue] = React.useState(payload?.get("school") ?? "");

    return (
        <>
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <button
                        role="combobox"
                        aria-expanded={open}
                        className="w-full border font-medium flex items-center py-2 px-4 rounded-lg border-gray-300 justify-between"
                    >
                        {value
                            ? data.find((school) => school.value === value)?.label
                            : "Select school"}
                        <Icon icon="fluent:chevron-up-down-20-filled" className="opacity-50"/>
                    </button>
                </PopoverTrigger>
                <PopoverContent className="p-0">
                    <Command filter={filterFunction}>
                        <CommandInput placeholder="Search school..."/>
                        <CommandList>
                            <CommandEmpty>No school found.</CommandEmpty>
                            <CommandGroup>
                                {data.map((school) => (
                                    <CommandItem
                                        key={school.value}
                                        value={school.value}
                                        onSelect={(currentValue) => {
                                            setValue(currentValue === value ? "" : currentValue);
                                            setOpen(false);
                                        }}
                                    >
                                        {school.label}
                                        <Icon
                                            icon="fluent:checkmark-16-filled"
                                            className={cn(
                                                "ml-auto",
                                                value === school.value ? "opacity-100" : "opacity-0"
                                            )}
                                        />
                                    </CommandItem>
                                ))}
                            </CommandGroup>
                        </CommandList>
                    </Command>
                </PopoverContent>
            </Popover>
            <input type="hidden" name="school" value={value as string}/>
            {value === "Other" &&
                <div className="mt-4">
                  <Input defaultValue={payload?.get("school-other")} label="School (other)" required type="text" name="school-other"/>
                </div>
            }
        </>
    );
}
