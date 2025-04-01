"use client";
import { useRouter } from "next/navigation";

function BackButton({
                        className,
                        children,
                    }: React.PropsWithChildren<{
    className?: string;
    text?: string;
}>) {
    const router = useRouter();
    return (
        <button className={className} onClick={() => router.back()}>
            {children}
        </button>
    );
}

export default BackButton;