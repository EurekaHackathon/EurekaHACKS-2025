"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

export default function TeamSection() {
    interface TeamMember {
        name: string;
        role: string;
        image: string;
        url: string;
        emoji: string;
    }

    const teamInfo: TeamMember[] = [
        {
            name: "Yohance",
            role: "Director",
            image: "person.jpg",
            url: "https://example.com",
            emoji: "😎"
        },
        {
            name: "Aadya",
            role: "Director",
            image: "person.jpg",
            url: "https://example.com",
            emoji: "😎"
        },
        {
            name: "Suri",
            role: "Director",
            image: "person.jpg",
            url: "https://example.com",
            emoji: "😎"
        },
        {
            name: "Selena",
            role: "Director",
            image: "person.jpg",
            url: "https://example.com",
            emoji: "😎"
        },
        {
            name: "Nabira",
            role: "Director",
            image: "person.jpg",
            url: "https://example.com",
            emoji: "😎"
        },
        {
            name: "Eason",
            role: "Director",
            image: "person.jpg",
            url: "https://example.com",
            emoji: "😎"
        },
        {
            name: "Naman",
            role: "Director",
            image: "person.jpg",
            url: "https://example.com",
            emoji: "😎"
        },
        {
            name: "Aaron",
            role: "Director",
            image: "person.jpg",
            url: "https://example.com",
            emoji: "😎"
        },
        {
            name: "Jake",
            role: "Director",
            image: "person.jpg",
            url: "https://example.com",
            emoji: "😎"
        },
        {
            name: "Margeret",
            role: "Director",
            image: "person.jpg",
            url: "https://example.com",
            emoji: "😎"
        },
        {
            name: "Vihaan",
            role: "Director",
            image: "person.jpg",
            url: "https://example.com",
            emoji: "😎"
        },
        {
            name: "Minsun",
            role: "Director",
            image: "person.jpg",
            url: "https://example.com",
            emoji: "😎"
        },
        {
            name: "Nahyan",
            role: "Director",
            image: "person.jpg",
            url: "https://example.com",
            emoji: "😎"
        },
    ];

    // Display name is whatever is being currently displayed, name is the one we want it to display
    const [displayName, setDisplayName] = useState("the EurekaHACKS Team");
    const [name, setName] = useState("the EurekaHACKS Team");

    // To keep track of intervals
    const typingID = useRef(0);

    // To display name, position, role
    const [currentText, setCurrentText] = useState("");

    // Adds a character if it needs to be added, else delete until it is possible. Stop when it matches.
    useEffect(() => {

        // Clear existing intervals
        if (typingID.current) clearInterval(typingID.current);

        // @ts-ignore typescript is convinced that it's nodejs setInterval and not webjs
        typingID.current = setInterval(() => {
            setDisplayName((dn) => {
                if (name == dn) {
                    clearInterval(typingID.current);
                    typingID.current = 0;
                    return dn;
                }
    
                if (dn == "" || name.startsWith(dn)) {
                    return name.substring(0, dn.length + 1);
                } else {
                    return dn.slice(0, -1);
                }
            })            
        }, 50);
    }, [name]);

    return (
        <div>
            <div id="team" className="text-gray-50 px-4 2xl:px-48 pt-8 pb-16">
                <h1 className="text- xl md:text-2xl font-semibold text-center">
                    Made with 
                    <span className="px-2">♥</span> 
                    by&nbsp;
                    <span id="team-name" className="typewriter">{displayName}</span>
                </h1>
                <h2 className="text-center md:text-lg min-h-12 font-semibold pt-4">{currentText}</h2>
                <div className="hidden lg:flex justify-center gap-8 pt-8">
                    {teamInfo.map((member: TeamMember, index: number) => (
                        <a href={member.url} key={index} target="_blank" rel="noopener noreferrer">
                            <div className="flex flex-col items-center">
                                <Image src={`/team/${member.image}`} alt={member.name} width={80} height={80}
                                       onMouseEnter={async () => {
                                           setCurrentText(`${member.name}, ${member.role} ${member.emoji}`);
                                           setName(member.name);
                                       }}
                                       onMouseLeave={() => {
                                           setCurrentText("");
                                           setName("the EurekaHACKS Team");
                                       }}
                                       className="w-20 h-20 object-cover rounded-full border-4 border-gray-300 hover:border-accent-300 duration-100"/>
                            </div>
                        </a>
                    ))}
                </div>
                <div className="lg:hidden flex justify-center gap-4 md:gap-6 lg:gap-8 pt-8">
                    {teamInfo.slice(0, 5).map((member: TeamMember, index: number) => (
                        <a href={member.url} key={index} target="_blank" rel="noopener noreferrer">
                            <div className="flex flex-col items-center">
                                <Image src={`/team/${member.image}`} alt={member.name} width={80} height={80}
                                       onMouseEnter={() => {
                                           setCurrentText(`${member.name}, ${member.role} ${member.emoji}`);
                                           setName(member.name);
                                       }}
                                       onMouseLeave={() => {
                                           setCurrentText("");
                                           setName("the EurekaHACKS Team");
                                       }}
                                       className="w-14 h-14 md:w-16 md:h-16 lg:w-20 lg:h-20 object-cover rounded-full border-4 border-gray-300 hover:border-accent-300 duration-100"/>
                            </div>
                        </a>
                    ))}
                </div>
                <div className="lg:hidden flex justify-center gap-4 md:gap-6 lg:gap-8 pt-4">
                    {teamInfo.slice(5).map((member: TeamMember, index: number) => (
                        <a href={member.url} key={index} target="_blank" rel="noopener noreferrer">
                            <div className="flex flex-col items-center">
                                <Image src={`/team/${member.image}`} alt={member.name} width={80} height={80}
                                       onMouseEnter={() => {
                                           setCurrentText(`${member.name}, ${member.role} ${member.emoji}`);
                                           setName(member.name);
                                       }}
                                       onMouseLeave={() => {
                                           setCurrentText("");
                                           setName("the EurekaHACKS Team");
                                       }}
                                       className="w-14 h-14 md:w-16 md:h-16 lg:w-20 lg:h-20 object-cover rounded-full border-4 border-gray-300 hover:border-accent-300 duration-100"/>
                            </div>
                        </a>
                    ))}
                </div>
            </div>
        </div>
    );
}