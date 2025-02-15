"use client";

import { cn } from "@/lib/utils";
import { useEffect, useState, useRef } from "react";

export default function FaqDropdown({ title, description }: { title: string, description: string }) {
    const [isOpen, setIsOpen] = useState(false);
    const contentRef = useRef<HTMLParagraphElement>(null);
    const [maxHeight, setMaxHeight] = useState("0px");

    const handleClick = () => {
        setIsOpen(!isOpen);
    };

    useEffect(() => {
        if (contentRef.current) {
            setMaxHeight(isOpen ? `${contentRef.current.scrollHeight}px` : "0px");
        }
    }, [isOpen]);

    return (
        <div className="group font-sans text-gray-50 max-w-xl bg-primary-600 rounded-xl cursor-pointer" onClick={handleClick}>
            <div className="bg-secondary-900 group-hover:-translate-y-1 transition ease-in-out duration-200 p-4 rounded-xl">
                <div className="flex items-center">
                    {!isOpen &&
                        <svg className="pr-2 w-auto h-8" shapeRendering="crispEdges" xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24">
                        <path fill="currentColor" d="M19 12.998h-6v6h-2v-6H5v-2h6v-6h2v6h6z"/>
                        </svg>
                    }
                    {isOpen &&
                        <svg className="pr-2 w-auto h-8" shapeRendering="crispEdges" xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24">
                        <path fill="currentColor" d="M19 12.998H5v-2h14z"/>
                        </svg>
                    }
                    <h1 className="md:text-xl font-medium">{title}</h1>
                </div>
                <p ref={contentRef} className={cn(
                        "ml-10 text-gray-200 md:text-lg text-sm overflow-hidden transition-all duration-300 ease-in-out",
                    )}
                    style={{ maxHeight }}>
                    {description}
                </p>
            </div>
        </div>
    );
}