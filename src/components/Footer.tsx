"use client";

import Image from "next/image";
import logo from "../../public/logo.png";
import { Icon } from "@iconify/react";
import { useEffect, useState } from "react";
import { subscribe } from "@/lib/actions";

export default function Footer() {
    const [isOnHomePage, setIsOnHomePage] = useState(false);
    useEffect(() => {
        setIsOnHomePage(window.location.pathname === "/");
    }, []);
    return (
        <footer className="bg-secondary-900 text-gray-50 px-4 2xl:px-48 pt-8 pb-4">
            <div className="flex flex-col lg:flex-row items-center justify-between">
                <div className="flex lg:block items-start">
                    <div className="flex items-center gap-0.5 lg:gap-2">
                        <Image className="w-8 md:w-10 lg:w-12 h-auto" src={logo} alt="EurekaHACKS Logo"/>
                        <h1 className="text-lg md:text-xl lg:text-2xl font-semibold">EurekaHACKS</h1>
                    </div>
                    <div className="ml-14">
                        <h1 className="text-md text-gray-300 font-semibold lg:pt-2">Connect With Us</h1>
                        <div className="text-xl flex items-center gap-2 text-gray-300 pt-2">
                            <a href="https://www.instagram.com/eureka_hacks/" target="_blank" rel="noopener noreferrer">
                                <Icon icon="mdi:instagram"/>
                            </a>
                            <a href="https://www.linkedin.com/company/eurekahacks" target="_blank"
                               rel="noopener noreferrer">
                                <Icon icon="mdi:linkedin"/>
                            </a>
                            <a href="https://discord.gg/ApEmE7g7GB" target="_blank" rel="noopener noreferrer">
                                <Icon icon="mdi:discord"/>
                            </a>
                            <a href="https://github.com/EurekaHackathon" target="_blank" rel="noopener noreferrer">
                                <Icon icon="mdi:github"/>
                            </a>
                            <a href="mailto:hello@eurekahacks.ca" target="_blank" rel="noopener noreferrer">
                                <Icon icon="mdi:email"/>
                            </a>
                        </div>
                    </div>
                </div>
                {/*Makes navigation links look more centered*/}
                <div/>
                <div
                    className="hidden lg:flex gap-4 md:gap-6 2xl:text-lg font-semibold text-center text-gray-50">
                    {isOnHomePage &&
                        <>
                          <a href="/#about">About</a>
                          <a href="/#past">Past Years</a>
                          <a href="/#sponsors">Sponsors</a>
                          <a href="/#faq">FAQ</a>
                          <a href="/#team">Team</a>
                        </>
                    }
                </div>
                <div className="flex flex-col lg:block">
                    <h1 className="text-xl font-semibold text-50 pt-12 lg:pt-0">Sign Up for Updates</h1>
                    <form className="flex mt-2 lg:mt-0 lg:block" action={subscribe}>
                        <input type="email" placeholder="Email" name="email"
                               className="2xl:w-64 px-2 lg:mt-2 h-10 bg-gray-50 rounded text-gray-900 font-medium"/>
                        <button className="bg-accent-500 font-medium text-gray-50 px-4 py-2 ml-2 lg:ml-3 rounded">
                            Subscribe
                        </button>
                    </form>
                </div>
            </div>
            <div
                className="hidden md:flex justify-center text-md items-center gap-12 pt-12 lg:pt-2 text-gray-300 text-md">
                <a href="/code-of-conduct" className="font-medium">Code of Conduct</a>
                <a href="/privacy" className="font-medium">Privacy Policy</a>
                <p className="text-center font-medium">Copyright © EurekaHACKS 2025</p>
            </div>
            <div
                className="md:hidden flex justify-center text-md items-center gap-12 pt-12 text-gray-300 text-md">
                <a href="/code-of-conduct" className="font-medium">Code of Conduct</a>
                <a href="/privacy" className="font-medium">Privacy Policy</a>
            </div>
            <p className="md:hidden  text-gray-300 text-center font-medium pt-1">Copyright © EurekaHACKS 2025</p>
        </footer>
    );
}
