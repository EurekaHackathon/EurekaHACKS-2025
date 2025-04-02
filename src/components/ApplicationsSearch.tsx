"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Input } from "@/components/Input";
import { Checkbox } from "@/components/Checkbox";

export default function ApplicationsSearch({query}: { query: string, page: number }) {
    const router = useRouter();
    const [searchQuery, setSearchQuery] = useState(query);
    const [debouncedQuery, setDebouncedQuery] = useState(searchQuery);
    const [rsvpParam, setRsvpParam] = useState(useSearchParams().get("rsvp") === "true");
    let [changed, setChanged] = useState(false);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedQuery(searchQuery);
        }, 250);

        return () => {
            clearTimeout(handler);
        };
    }, [searchQuery]);

    useEffect(() => {
        if (changed) {
            const queryString = new URLSearchParams({
                q: debouncedQuery,
                rsvp: rsvpParam.toString(),
            }).toString();
            router.push(`?page=1&${queryString}`, {
                scroll: false,
            });
        }
    }, [debouncedQuery]);

    return (
        <div>
            <Input
                label="Search"
                placeholder="Search for an applicant"
                value={searchQuery}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setSearchQuery(e.target.value);
                    setChanged(true);
                }}
            />
            <div className="mt-4 flex items-center">
                <label htmlFor="rsvp" className="text-gray-700 mr-2 font-medium">Show RSVPed only:</label>
                <Checkbox id="rsvp" name="rsvp" className="w-32"
                          defaultChecked={useSearchParams().get("rsvp") === "true"}
                          onCheckedChange={(checkedState) => {
                              const queryString = new URLSearchParams({
                                  q: debouncedQuery,
                                  rsvp: checkedState.toString()
                              }).toString();
                              router.push(`?page=1&${queryString}`, {
                                  scroll: false,
                              });
                          }}/>
            </div>
        </div>
    );
}