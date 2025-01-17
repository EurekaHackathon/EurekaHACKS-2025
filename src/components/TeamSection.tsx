"use client";

import { useState } from "react";

export default function () {
    interface TeamMember {
        name: string;
        role: string;
        image: string;
        url: string;
        emoji: string;
    }

    const teamInfo: TeamMember[] = [
        {
            name: "John Smith",
            role: "Director",
            image: "person.jpg",
            url: "https://example.com",
            emoji: "😎"
        },
        {
            name: "John Smith",
            role: "Director",
            image: "person.jpg",
            url: "https://example.com",
            emoji: "😎"
        },
        {
            name: "John Smith",
            role: "Director",
            image: "person.jpg",
            url: "https://example.com",
            emoji: "😎"
        },
        {
            name: "John Smith",
            role: "Director",
            image: "person.jpg",
            url: "https://example.com",
            emoji: "😎"
        },
        {
            name: "John Smith",
            role: "Director",
            image: "person.jpg",
            url: "https://example.com",
            emoji: "😎"
        },
        {
            name: "John Smith",
            role: "Director",
            image: "person.jpg",
            url: "https://example.com",
            emoji: "😎"
        },
        {
            name: "John Smith",
            role: "Director",
            image: "person.jpg",
            url: "https://example.com",
            emoji: "😎"
        },
        {
            name: "John Smith",
            role: "Director",
            image: "person.jpg",
            url: "https://example.com",
            emoji: "😎"
        },
        {
            name: "John Smith",
            role: "Director",
            image: "person.jpg",
            url: "https://example.com",
            emoji: "😎"
        },
    ];

    const [currentText, setCurrentText] = useState("");

    return (
        <div>
            <div id="team" className="text-gray-50 px-4 2xl:px-48 pt-8 pb-16">
                <h1 className="text- xl md:text-2xl font-semibold text-center">Made with <span
                    className="px-2">♥</span> by the EurekaHACKS team</h1>
                <h2 className="text-center md:text-lg min-h-12 font-semibold pt-4">{currentText}</h2>
                <div className="hidden lg:flex justify-center gap-8 pt-8">
                    {teamInfo.map((member: TeamMember, index: number) => (
                        <a href={member.url} key={index} target="_blank" rel="noopener noreferrer">
                            <div className="flex flex-col items-center">
                                <img src={`/team/${member.image}`} alt={member.name}
                                    onMouseEnter={() => setCurrentText(`${member.name}, ${member.role} ${member.emoji}`)}
                                    onMouseLeave={() => setCurrentText("")}
                                    className="w-20 h-20 object-cover rounded-full border-4 border-gray-300 hover:border-accent-300 duration-100" />
                            </div>
                        </a>
                    ))}
                </div>
                <div className="lg:hidden flex justify-center gap-4 md:gap-6 lg:gap-8 pt-8">
                    {teamInfo.slice(0, 5).map((member: TeamMember, index: number) => (
                        <a href={member.url} key={index} target="_blank" rel="noopener noreferrer">
                            <div className="flex flex-col items-center">
                                <img src={`/team/${member.image}`} alt={member.name}
                                    onMouseEnter={() => setCurrentText(`${member.name}, ${member.role} ${member.emoji}`)}
                                    onMouseLeave={() => setCurrentText("")}
                                    className="w-14 h-14 md:w-16 md:h-16 lg:w-20 lg:h-20 object-cover rounded-full border-4 border-gray-300 hover:border-accent-300 duration-100" />
                            </div>
                        </a>
                    ))}
                </div>
                <div className="lg:hidden flex justify-center gap-4 md:gap-6 lg:gap-8 pt-4">
                    {teamInfo.slice(5).map((member: TeamMember, index: number) => (
                        <a href={member.url} key={index} target="_blank" rel="noopener noreferrer">
                            <div className="flex flex-col items-center">
                                <img src={`/team/${member.image}`} alt={member.name}
                                    onMouseEnter={() => setCurrentText(`${member.name}, ${member.role} ${member.emoji}`)}
                                    onMouseLeave={() => setCurrentText("")}
                                    className="w-14 h-14 md:w-16 md:h-16 lg:w-20 lg:h-20 object-cover rounded-full border-4 border-gray-300 hover:border-accent-300 duration-100" />
                            </div>
                        </a>
                    ))}
                </div>
            </div>
        </div>
    );
}