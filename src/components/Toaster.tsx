"use client";

import { useToast } from "@/hooks/use-toast";
import {
    Toast,
    ToastClose,
    ToastDescription,
    ToastProvider,
    ToastTitle,
    ToastViewport,
} from "@/components/Toast";

export function Toaster() {
    const { toasts } = useToast();

    return (
        <ToastProvider>
            {toasts.map(function ({ id, title, description, action, ...props }) {
                return (
                    <Toast key={id} {...props}>
                        <div className="grid gap-1 text-white font-medium">
                            {title && <ToastTitle>{title}</ToastTitle>}
                            {description && (description.toString().split("\n").map((line, i) => {
                                return <ToastDescription key={i}>{line}</ToastDescription>;
                            }))}
                        </div>
                        {action}
                        <ToastClose/>
                    </Toast>
                );
            })}
            <ToastViewport/>
        </ToastProvider>
    );
}
