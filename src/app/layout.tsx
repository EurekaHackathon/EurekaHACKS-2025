import type { Metadata } from "next";
import React from "react";
import "./global.css"

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
        // Disable hydration warning since browser addons/extensions trigger
        <html lang="en" suppressHydrationWarning>
            <head>
                <meta charSet="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0" />
                <title>EurekaHACKS</title>
                <script defer src="https://cloud.umami.is/script.js"
                    data-website-id="515f16a5-8036-482d-b535-7cdc2310d52b"></script>
            </head>
            <body className="overflow-x-hidden">
                {children}
            </body>
        </html>
    );
}
