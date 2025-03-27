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
            role: "President",
            image: "yohance.webp",
            url: "https://www.linkedin.com/in/yohance-pawania-30aa902a4/",
            emoji: "😎"
        },
        {
            name: "Aadya",
            role: "Logistics",
            image: "aadya.webp",
            url: "https://www.linkedin.com/in/aadya-khanna-050342293/",
            emoji: "💪"
        },
        {
            name: "Suri",
            role: "Logistics",
            image: "suri.webp",
            url: "https://www.linkedin.com/in/suri-tian-011b77282/",
            emoji: "🌝"
        },
        {
            name: "Selena",
            role: "Logistics & Business",
            image: "selena.webp",
            url: "https://www.linkedin.com/in/selena-nguyen-0b7287321/",
            emoji: "😎"
        },
        {
            name: "Nabira",
            role: "Business",
            image: "nabira.webp",
            url: "https://www.linkedin.com/in/nabira-rashid-46338a283/",
            emoji: "🌟"
        },
        {
            name: "Eason",
            role: "Web Dev",
            image: "eason.png",
            url: "https://www.linkedin.com/in/eason-huang-647391295/",
            emoji: "🌵"
        },
        {
            name: "Naman",
            role: "Web Dev",
            image: "naman.webp",
            url: "https://www.linkedin.com/in/naman-sonawane",
            emoji: "🤩"
        },
        {
            name: "Aaron",
            role: "Web Dev",
            image: "aaron.webp",
            url: "https://www.linkedin.com/in/aaron-ye-7574872a0/",
            emoji: "🐱"
        },
        {
            name: "Jake",
            role: "Web Dev",
            image: "jake.png",
            url: "https://www.linkedin.com/in/jake-comay-31571a345/",
            emoji: "🫎"
        },
        {
            name: "Margaret",
            role: "Visual Design",
            image: "margaret.webp",
            url: "https://www.linkedin.com/in/margaret-liu-774036318/",
            emoji: "🦆"
        },
        {
            name: "Minsun",
            role: "Visual Design",
            image: "minsun.webp",
            url: "https://www.linkedin.com/in/minsun-kim-8b62022aa/",
            emoji: "💗"
        },
        {
            name: "Vihaan",
            role: "Business",
            image: "vihaan.webp",
            url: "https://www.linkedin.com/in/vihaan-vashishtha-0420a6297",
            emoji: "🦖"
        },
        {
            name: "Farouk",
            role: "Marketing",
            image: "farouk.webp",
            url: "https://www.linkedin.com/in/faroukjabsheh/",
            emoji: "🚀"
        },
        {
            name: "Nahyan",
            role: "Marketing",
            image: "nahyan.webp",
            url: "https://www.linkedin.com/in/nahyan-hossain-48143a2a4/",
            emoji: "🍀"
        },
        {
            name: "Jimin",
            role: "Visual Design",
            image: "jimin.webp",
            url: "https://www.linkedin.com/in/jimin-so-1878a2285/",
            emoji: "🐋"
        },
        {
            name: "The Gu",
            role: "Business",
            image: "gregory.png",
            url: "https://ca.linkedin.com/in/gregory-gu",
            emoji: "🐒"
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
            });
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
                <h2 className="text-center md:text-lg min-h-12 font-semibold pt-4">{currentText}
                </h2>
                <div className="hidden 3xl:flex justify-center gap-8 pt-8">
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
                                       className="w-16 h-16 object-cover rounded-full border-4 border-gray-300 hover:border-accent-300 duration-100"/>
                            </div>
                        </a>
                    ))}
                </div>
                <div className="3xl:hidden flex justify-center gap-4 md:gap-6 lg:gap-8 pt-8">
                    {teamInfo.slice(0, 4).map((member: TeamMember, index: number) => (
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
                <div className="3xl:hidden flex justify-center gap-4 md:gap-6 lg:gap-8 pt-4">
                    {teamInfo.slice(4, 8).map((member: TeamMember, index: number) => (
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
                <div className="3xl:hidden flex justify-center gap-4 md:gap-6 lg:gap-8 pt-4">
                    {teamInfo.slice(8, 12).map((member: TeamMember, index: number) => (
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
                <div className="3xl:hidden flex justify-center gap-4 md:gap-6 lg:gap-8 pt-4">
                    {teamInfo.slice(12).map((member: TeamMember, index: number) => (
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
