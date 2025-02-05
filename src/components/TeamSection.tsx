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
            role: "Logistics & Business",
            image: "person.jpg",
            url: "https://example.com",
            emoji: "😎"
        },
        {
            name: "Nabira",
            role: "Business",
            image: "person.jpg",
            url: "https://example.com",
            emoji: "😎"
        },
        {
            name: "Eason",
            role: "Web Dev",
            image: "person.jpg",
            url: "https://example.com",
            emoji: "😎"
        },
        {
            name: "Naman",
            role: "Web Dev",
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
            name: "Margaret",
            role: "Visual Design",
            image: "person.jpg",
            url: "https://example.com",
            emoji: "😎"
        },
        {
            name: "Vihaan",
            role: "Business",
            image: "person.jpg",
            url: "https://example.com",
            emoji: "😎"
        },
        {
            name: "Minsun",
            role: "Marketing",
            image: "person.jpg",
            url: "https://example.com",
            emoji: "😎"
        },
        {
            name: "Nahyan",
            role: "Marketing",
            image: "person.jpg",
            url: "https://example.com",
            emoji: "😎"
        },
    ];

    // Display name is whatever is being currently displayed, name is the one we want it to display. Name ref because react states is silly
    const [displayName, setDisplayName] = useState("the EurekaHACKS Team");
    const [name, setName] = useState("the EurekaHACKS Team");
    const nameRef = useRef("the EurekaHACKS Team");

    // To keep track of intervals
    const typingID = useRef(0);

    // To display name, position, role
    const [currentText, setCurrentText] = useState("");

    // Adds a character if it needs to be added, else delete until it is possible. Stop when it matches.
    useEffect(() => {

        // Clear existing intervals
        if (typingID.current) clearInterval(typingID.current);

        // for some reason the states don't keep up??
        nameRef.current = name;

        // @ts-ignore typescript is convinced that it's nodejs setInterval and not webjs
        typingID.current = setInterval(() => {
            setDisplayName((dn) => {
                if (nameRef.current === dn) {
                    clearInterval(typingID.current);
                    typingID.current = 0;
                    return dn;
                }
    
                if (dn === "" || nameRef.current.startsWith(dn)) {
                    return nameRef.current.substring(0, dn.length + 1);
                } else {
                    return dn.slice(0, -1);
                }
            })            
        }, 40);
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
                <div className="hidden 2xl:flex justify-center gap-8 pt-8">
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
                <div className="2xl:hidden flex justify-center gap-4 md:gap-6 lg:gap-8 pt-8">
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
                <div className="2xl:hidden flex justify-center gap-4 md:gap-6 lg:gap-8 pt-4">
                    {teamInfo.slice(5, 10).map((member: TeamMember, index: number) => (
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
                <div className="2xl:hidden flex justify-center gap-4 md:gap-6 lg:gap-8 pt-4">
                    {teamInfo.slice(10).map((member: TeamMember, index: number) => (
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