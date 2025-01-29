import "./app.css";
import { DashboardNav } from "@/components/DashboardNav";

export default function Layout({
                                   children,
                               }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        // Disable hydration warning since browser addons/extensions trigger
        <html lang="en" suppressHydrationWarning>
        <head>
            <meta charSet="UTF-8"/>
            <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0"/>
            <title>EurekaHACKS</title>
            <script defer src="https://cloud.umami.is/script.js"
                    data-website-id="515f16a5-8036-482d-b535-7cdc2310d52b"></script>
        </head>
        <body className="overflow-x-hidden">
        <div className="min-h-screen flex">
            <div className="w-[12%]">
                <DashboardNav/>
            </div>
            <div className="w-[88%] py-32 px-48">
                {children}
            </div>
        </div>
        </body>
        </html>
    );
}
