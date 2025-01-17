"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import heroBackground from "../../public/hero/background.svg";
import clouds1 from "../../public/hero/clouds/clouds1.svg";
import clouds2 from "../../public/hero/clouds/clouds2.svg";
import clouds3 from "../../public/hero/clouds/clouds3.svg";
import clouds4 from "../../public/hero/clouds/clouds4.svg";
import stars1 from "../../public/hero/stars/1.svg";
import stars2 from "../../public/hero/stars/2.svg";
import stars3 from "../../public/hero/stars/3.svg";
import stars4 from "../../public/hero/stars/4.svg";
import stars5 from "../../public/hero/stars/5.svg";
import stars6 from "../../public/hero/stars/6.svg";
import stars7 from "../../public/hero/stars/7.svg";
import stars8 from "../../public/hero/stars/8.svg";
import stars9 from "../../public/hero/stars/9.svg";
import stars10 from "../../public/hero/stars/10.svg";
import stars11 from "../../public/hero/stars/11.svg";
import stars12 from "../../public/hero/stars/12.svg";
import duck from "../../public/hero/duck.svg";
import heroForeground from "../../public/hero/foreground.svg";

export function HeroSectionArt() {
    const wavePathRef = useRef<SVGPathElement>(null);
    const duckRef = useRef<SVGImageElement>(null);

    useEffect(() => {
        let t = 0;

        const updateWave = () => {
            if (wavePathRef.current && duckRef.current) {
                const wavePath = generateWavePath(t);
                wavePathRef.current.setAttribute("d", wavePath);
                t += 0.03;
            }
            requestAnimationFrame(updateWave);
        };
        updateWave();
    }, []);

    const generateWavePath = (t: number) => {
        const amplitude = 1.5;
        const frequency = 0.3;
        const points = 100;
        const path = [];
        for (let i = 0; i <= points; i++) {
            const x = (i / points) * 30;
            const y = amplitude * (Math.sin(frequency * x + t) + Math.sin(2 * frequency * x + t) / 2) + 18;
            path.push(`${i === 0 ? "M" : "L"} ${x},${y}`);
        }
        path.push(`L ${25},${100} L 0,${100} Z`);
        return path.join(" ");
    };

    return <div className="pointer-events-none absolute w-[100vw] h-[100vh] overflow-x-clip">
        <Image src={heroBackground} alt="Hero Background" id="bg"
            className="absolute object-cover h-full landscape:w-full landscape:h-auto" />
        <Image priority src={clouds1} alt="Clouds 1"
            className="absolute h-full landscape:w-full landscape:h-auto scale-90 clouds1" />
        <Image src={clouds2} alt="Clouds 2"
            className="absolute h-full landscape:w-full landscape:h-auto scale-90 clouds2" />
        <Image src={clouds3} alt="Clouds 3"
            className="absolute h-full landscape:w-full landscape:h-auto scale-90 clouds3" />
        <Image src={clouds4} alt="Clouds 4"
            className="absolute h-full landscape:w-full landscape:h-auto scale-90 clouds4" />
        <div className="hidden landscape:block">
            <Image src={stars1} alt="Stars 1" className="absolute w-full h-auto stars1" />
            {/*Translate it down so it doesn't go behind the navbar*/}
            <Image src={stars2} alt="Stars 2" className="absolute w-full h-auto stars2 translate-y-12" />
            <Image src={stars3} alt="Stars 3" className="absolute w-full h-auto stars3" />
            <Image src={stars4} alt="Stars 4" className="absolute w-full h-auto stars4" />
            <Image src={stars5} alt="Stars 5" className="absolute w-full h-auto stars5" />
            <Image src={stars6} alt="Stars 6" className="absolute w-full h-auto stars6" />
            <Image src={stars7} alt="Stars 7" className="absolute w-full h-auto stars7" />
            <Image src={stars8} alt="Stars 8" className="absolute w-full h-auto stars8" />
            {/*Translate it down so it doesn't go behind the navbar*/}
            <Image src={stars9} alt="Stars 9" className="absolute w-full h-auto stars9 translate-y-8" />
            <Image src={stars10} alt="Stars 10" className="absolute w-full h-auto stars10" />
            <Image src={stars11} alt="Stars 11" className="absolute w-full h-auto stars11" />
            <Image src={stars12} alt="Stars 12" className="absolute w-full h-auto stars12" />
        </div>
        <svg
            className="fix-load-bug absolute h-full translate-x-[-33%] w-auto md:translate-x-[-26%] landscape:translate-x-0 landscape:w-full landscape:h-auto"
            viewBox="0 0 507.99999 289.45417">
            <mask id="wave-mask">
                <rect width="100%" height="100%" fill="white" />
                <path ref={wavePathRef} fill="black" transform="rotate(0.1)" />
            </mask>
            <image ref={duckRef} href={duck.src} width="25" height="25" transform="rotate(0.1)"
                mask="url(#wave-mask)">
                <animateMotion dur="10s" repeatCount="indefinite"
                    path="m 345.51252,197.30245 c 0,0 28.93833,4.47135 31.05755,20.11266 1.13149,8.35118 -35.37376,13.99404 -55.46147,18.54195 -17.49136,3.96009 -48.2485,5.28733 -69.2307,11.8133 -20.14434,6.26539 -77.99361,13.31836 -2.94156,72.14139"
                />
                <animateTransform attributeName="transform" type="scale" values="0.2,0.2;1,1" keyTimes="0;1"
                    dur="10s"
                    repeatCount="indefinite" additive="sum" />
                <animateTransform attributeName="transform" type="translate" values="-12.5,-12.5;-12.5,-12.5"
                    keyTimes="0;1" dur="10s"
                    repeatCount="indefinite" additive="sum" />
            </image>
        </svg>
        <Image src={heroForeground} alt="Hero Foreground"
            className="absolute object-cover h-full landscape:w-full landscape:h-auto" />
    </div>;
}