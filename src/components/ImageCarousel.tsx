"use client";

import { useEffect, useRef } from "react";
import photo1 from "../../public/photos/about1.jpg";
import photo2 from "../../public/photos/about2.jpg";
import photo3 from "../../public/photos/about3.jpg";
import photo4 from "../../public/photos/about4.jpg";
import photo5 from "../../public/photos/about5.jpg";
import photo6 from "../../public/photos/about6.jpg";
import photo7 from "../../public/photos/about7.jpg";
import photo8 from "../../public/photos/about8.jpg";
import Image from "next/image";

export default function ImageCarousel() {
    // Updated to use 8 unique images
    const photos = [photo1, photo2, photo3, photo4, photo5, photo6, photo7, photo8];
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
            <div ref={carouselRef} className="carousel flex gap-4">
                {photos.map((photo, index) => (
                    <Image key={index} src={photo} alt={`photo-${index}`} className="h-36 md:h-40 lg:h-48 w-auto" />
                ))}
                {/* Duplicating the images to ensure they continue looping smoothly */}
                {photos.map((photo, index) => (
                    <Image key={index + 8} src={photo} alt={`photo-${index + 8}`} className="h-36 md:h-40 lg:h-48 w-auto" />
                ))}
            </div>
        </div>
    );
}
