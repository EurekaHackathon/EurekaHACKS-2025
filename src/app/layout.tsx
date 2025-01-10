import type { Metadata } from "next";

import "./globals.css";
import React from "react";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
    title: "EurekaHACKS 2025",
    description: "EurekaHACKS is Abbey Park High School's annual hackathon. Hours of coding, mentorship & fun (+ free food!)",
    openGraph: {
        title: "EurekaHACKS 2025",
        type: "website",
        url: "https://eurekahacks.ca",
        images: [
            {
                url: "https://imgur.com/Ami0K1E",
            },
        ],
        description: "EurekaHACKS is Abbey Park High School's annual hackathon. Hours of coding, mentorship & fun (+ free food!)",
    }
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
        <head>
            <meta charSet="UTF-8"/>
            <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0"/>
            <title>EurekaHACKS</title>
        </head>
        <body className="overflow-x-hidden">
        {/* <Navbar/> */}
        {children}
        </body>
        </html>
    );
}
