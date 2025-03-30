"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/Input";

export default function ApplicationsSearch({query, page}: { query: string, page: number }) {
    const router = useRouter();
    const [searchQuery, setSearchQuery] = useState(query);
    const [debouncedQuery, setDebouncedQuery] = useState(searchQuery);
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
            const queryString = new URLSearchParams({q: debouncedQuery}).toString();
            router.push(`?page=1&${queryString}`, {
                scroll: false,
            });
        }
    }, [debouncedQuery]);

    return (
        <Input
            label="Search"
            placeholder="Search for an applicant"
            value={searchQuery}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setSearchQuery(e.target.value);
                setChanged(true);
            }}
        />
    );
}