"use client";

import { Icon } from "@iconify/react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import NextImage from "next/image";

export function QrCodeControls({ dataURL }: { dataURL: string }) {
    const downloadQrCode = () => {
        const link = document.createElement("a");
        link.href = dataURL;
        link.download = "qrcode.png";
        link.click();
    };

    return <div className="flex flex-row w-full justify-end mt-4 md:mt-6 gap-4">
        <button onClick={downloadQrCode}
                className="bg-secondary-600 text-white min-h-9 min-w-9 px-2 py-2 rounded-md hover:bg-secondary-700 duration-75">
            <Icon icon={"fluent:arrow-download-16-filled"} className="text-xl"/>
        </button>
        <Dialog>
            <DialogTrigger asChild>
                <button
                    className="bg-secondary-600 text-white min-h-9 min-w-9 px-2 py-2 rounded-md hover:bg-secondary-700 duration-75">
                    <Icon icon={"fluent:full-screen-zoom-24-filled"} className="text-xl"/>
                </button>
            </DialogTrigger>
            <DialogContent
                className="flex flex-col justify-center items-center py-4 md:py-6 lg:py-8 px-6 md:px-8 lg:px-12 w-[90%] max-w-3xl rounded-xl">
                <DialogHeader className="w-full">
                    <DialogTitle className="text-gray-700 text-2xl md:text-3xl font-semibold">QR Code</DialogTitle>
                    <DialogDescription className="md:text-lg">
                        Use this QR code to check-in and receive food.
                    </DialogDescription>
                </DialogHeader>
                <div className="flex justify-center items-center">
                    <NextImage
                        id="qrcode"
                        className="[image-rendering:pixelated] p-6 md:p-10 lg:p-12 bg-secondary-100 rounded-xl"
                        src={dataURL} width={38 * 20} height={38 * 20}
                        alt="qrcode"/>
                </div>
            </DialogContent>
        </Dialog>
    </div>;
}