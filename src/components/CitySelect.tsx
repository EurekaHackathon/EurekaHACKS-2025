"use client";

import * as React from "react";

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
import { ontarioCitiesList } from "@/app/(dashboard)/dashboard/application/data";
import { Icon } from "@iconify/react";
import { Input } from "@/components/Input";

const data = ontarioCitiesList.map((city) => ({
    label: city,
    value: city,
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

export function CitySelect() {
    const [open, setOpen] = React.useState(false);
    const [value, setValue] = React.useState("");

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
                            ? data.find((city) => city.value === value)?.label
                            : "Select city"}
                        <Icon icon="fluent:chevron-up-down-20-filled" className="opacity-50"/>
                    </button>
                </PopoverTrigger>
                <PopoverContent className="p-0">
                    <Command filter={filterFunction}>
                        <CommandInput placeholder="Search city..."/>
                        <CommandList>
                            <CommandEmpty>No city found.</CommandEmpty>
                            <CommandGroup>
                                {data.map((city) => (
                                    <CommandItem
                                        key={city.value}
                                        value={city.value}
                                        onSelect={(currentValue) => {
                                            setValue(currentValue === value ? "" : currentValue);
                                            setOpen(false);
                                        }}
                                    >
                                        {city.label}
                                        <Icon
                                            icon="fluent:checkmark-16-filled"
                                            className={cn(
                                                "ml-auto",
                                                value === city.value ? "opacity-100" : "opacity-0"
                                            )}
                                        />
                                    </CommandItem>
                                ))}
                            </CommandGroup>
                        </CommandList>
                    </Command>
                </PopoverContent>
            </Popover>
            <input type="hidden" name="city" value={value}/>
            {value === "Other" &&
                <div className="mt-4">
                  <Input label="City (other)" required type="text" name="city-other"/>
                </div>
            }
        </>
    );
}
