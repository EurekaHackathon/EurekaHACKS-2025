import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "./app.css";

export default function Layout({
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
            </head>
            <body className="overflow-x-hidden">
                <Navbar />
                {children}
                <Footer />
            </body>
        </html>
    );
}
