import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

import "./app.css"

export default function Layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />
            <div className="flex-grow">
                {children}
            </div>
            <Footer />
        </div>
    );
}
