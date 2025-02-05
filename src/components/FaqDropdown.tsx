"use client"

import { useEffect, useState, useRef } from "react";
import { clsx } from "clsx";

export default function FaqDropdown({ title, description }: { title: string, description: string }) {
    const [isOpen, setIsOpen] = useState(false);
    const contentRef = useRef<HTMLParagraphElement>(null);
    const [maxHeight, setMaxHeight] = useState("0px");

    const handleClick = () => {
        setIsOpen(!isOpen);
    }

    useEffect(() => {
        if (contentRef.current) {
            setMaxHeight(isOpen ? `${contentRef.current.scrollHeight}px` : "0px");
        }
    }, [isOpen]);

    return (
        <div className="font-sans">
            <div className="flex items-center cursor-pointer" onClick={handleClick}>
                {!isOpen &&
                    <svg className="pr-2 w-auto h-8" shapeRendering="crispEdges" xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24">
                        <path fill="currentColor" d="M19 12.998h-6v6h-2v-6H5v-2h6v-6h2v6h6z" />
                    </svg>
                }
                {isOpen &&
                    <svg className="pr-2 w-auto h-8" shapeRendering="crispEdges" xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24">
                        <path fill="currentColor" d="M19 12.998H5v-2h14z" />
                    </svg>
                }
                <h1 className="md:text-xl font-medium">{title}</h1>
            </div>
            <p ref={contentRef} className={clsx("ml-10 text-gray-200 mt-2 md:text-lg text-sm overflow-hidden transition-all duration-400 ease-in-out")}
                style={{ maxHeight }}>
                {description}
            </p>
        </div>
    );
}