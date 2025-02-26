"use client";
import { useEffect, useState } from "react";
import photo6 from "../../public/photos/about6.jpg";
import photo7 from "../../public/photos/about7.jpg";
import photo8 from "../../public/photos/about8.jpg";
import Image from "next/image";

export function AboutSection() {
    const images = [photo6, photo7, photo8];
    const [currentImage, setCurrentImage] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImage((prevImage) => (prevImage + 1) % images.length);
        }, 4000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div id="about"
             className="flex flex-col lg:flex-row gap-4 2xl:gap-12 justify-center pt-32 2xl:pt-48 max-w-screen-2xl mx-auto px-16">
            <div className="lg:w-[45%]">
                <h1 className="text-4xl md:text-6xl font-bold text-secondary-200">About<br/> EurekaHACKS</h1>
                <p className="mt-4 text-xl md:text-2xl font-medium leading-relaxed text-gray-100">
                    Welcome to EurekaHacks! Join us for a 12-hour hackathon filled with creativity, innovation, and fun!
                    Compete, collaborate, and learn through workshops, exciting challenges, and networking opportunities
                    with industry experts. Whether you're a beginner or seasoned hacker, come build, innovate, and
                    network.
                </p>
            </div>

            <div className="lg:w-[55%] flex justify-center items-center relative w-full">
                <div className="relative w-full h-96 border-secondary-400 border-[10px]">
                    {images.map((img, index) => (
                        <Image
                            key={index}
                            src={img}
                            alt={"Image \${index}"}
                            className={`absolute w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${index === currentImage ? "opacity-100" : "opacity-0"} `}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}