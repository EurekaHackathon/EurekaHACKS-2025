"use client";

import { useEffect, useRef } from "react";
import photo1 from "../../public/photos/about1.jpg";
import photo2 from "../../public/photos/about2.jpg";
import photo3 from "../../public/photos/about3.jpg";
import Image from "next/image";

export default function ImageCarousel() {
    const photos = [photo1, photo1, photo1, photo1, photo1, photo1, photo1, photo2, photo3];
    const carouselRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const carousel = carouselRef.current;
        if (carousel) {
            const styleElement = document.createElement("style");
            styleElement.innerHTML = `
                @keyframes scroll {
                    0% {
                        transform: translateX(0);
                    }
                    100% {
                        transform: translateX(-${carousel.scrollWidth / 2}px);
                    }
                }
                .carousel {
                    animation: scroll 30s linear infinite;
                }
            `;
            document.head.appendChild(styleElement);
        }
    }, []);

    return (
        <div className="relative overflow-hidden w-full pt-12 lg:pt-16">
            {/*<div className="absolute h-48 left-0 right-0 z-10 pointer-events-none bg-gradient-to-r from-[#512fa6ff] to-transparent to-10%"/>*/}
            {/*<div className="absolute h-48 left-0 right-0 z-10 pointer-events-none bg-gradient-to-r from-transparent to-[#512fa6ff] from-90%"/>*/}
            <div ref={carouselRef} className="carousel flex gap-4">
                {photos.map((photo, index) => (
                    <Image key={index} src={photo} alt={`photo-${index}`} className="h-36 md:h-40 lg:h-48 w-auto" />
                ))}
                {photos.map((photo, index) => (
                    <Image key={index} src={photo} alt={`photo-${index}`} className="h-36 md:h-40 lg:h-48 w-auto" />
                ))}
            </div>
        </div>
    );
}