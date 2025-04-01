"use client";

import React, { useEffect, useRef, useState } from "react";
import { binarize, Decoder, Detector, grayscale } from "@nuintun/qrcode";
import Webcam from "react-webcam";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/Select";
import { toast } from "@/hooks/use-toast";
import Link from "next/link";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { GetBasicUserInfoByUserIdRow } from "@/lib/sqlc/admin_sql";
import { useRouter, useSearchParams } from "next/navigation";

const decodeQRCode = (dataURL: string): Promise<string | null> => {
    return new Promise((resolve, reject) => {
        const image = new Image();
        image.onload = () => {
            const {width, height} = image;
            const canvas = new OffscreenCanvas(width, height);
            const context = canvas.getContext("2d")!;
            context.drawImage(image, 0, 0);

            const luminances = grayscale(context.getImageData(0, 0, width, height));
            const binarized = binarize(luminances, width, height);
            const detector = new Detector();
            const detected = detector.detect(binarized);
            const decoder = new Decoder();

            let current = detected.next();
            while (!current.done) {
                const detect = current.value;
                try {
                    const decoded = decoder.decode(detect.matrix);
                    resolve(decoded.content);
                    return;
                } catch {
                    console.log("Failed to decode QR code.");
                }
                current = detected.next();
            }
            resolve(null);
        };

        image.onerror = () => {
            reject(new Error("Failed to load image."));
        };

        image.src = dataURL;
    });
};

export default function AdminQRCodeScanner() {
    const [videoConstraints, setVideoConstraints] = useState({
        facingMode: "environment"
    });
    const [cameraError, setCameraError] = useState<boolean>(false);
    const [currentEvent, setCurrentEvent] = useState<string | undefined>(undefined);
    const [lastScannedQR, setLastScannedQR] = useState<string | null>(null);
    const [lastScannedTime, setLastScannedTime] = useState<number>(0);
    const [currentUserInfo, setCurrentUserInfo] = useState<GetBasicUserInfoByUserIdRow | null>(null);

    const webcamRef = useRef<Webcam>(null);

    useEffect(() => {
        const checkForCamera = () => {
            navigator.mediaDevices.enumerateDevices().then(devices => {
                const videoDevices = devices.filter(device => device.kind === "videoinput");
                if (videoDevices.length > 0) {
                    const backCamera = videoDevices.find(device => device.label.toLowerCase().includes("back"));
                    setVideoConstraints({
                        facingMode: backCamera ? "environment" : "user"
                    });
                    setCameraError(false);
                } else {
                    setCameraError(true);
                }
            });
        };

        checkForCamera();
        const cameraCheckInterval = setInterval(checkForCamera, 1000);

        return () => clearInterval(cameraCheckInterval);
    }, []);

    useEffect(() => {
        const interval = setInterval(async () => {
            const imageSrc = webcamRef.current?.getScreenshot();
            if (imageSrc) {
                const decoded = await decodeQRCode(imageSrc);
                if (decoded) {
                    const currentTime = Date.now();
                    if (decoded !== lastScannedQR || (currentTime - lastScannedTime) > 3000) {
                        setLastScannedQR(decoded);
                        setLastScannedTime(currentTime);
                        if (!currentEvent) {
                            toast({
                                variant: "error",
                                title: "Error",
                                description: "Please select an event to scan for."
                            });
                        } else {
                            const formData = new FormData();
                            formData.append("encryptedId", decoded);
                            formData.append("event", currentEvent);
                            const response = await fetch("/api/scan-event", {
                                method: "POST",
                                body: formData
                            });
                            if (response.ok) {
                                toast({
                                    variant: "success",
                                    title: "Success",
                                    description: "Successfully scanned user into event."
                                });
                                setCurrentUserInfo(await response.json());
                                if (currentEvent === "check-in") {
                                    setModalOpen(true);
                                }
                            } else {
                                const text = await response.text();
                                if (response.status === 409) {
                                    toast({
                                        variant: "error",
                                        title: "Error",
                                        description: "User already scanned into this event."
                                    });
                                } else if (response.status === 403) {
                                    toast({
                                        variant: "error",
                                        title: "Error",
                                        description: "User is not an accepted hacker."
                                    });
                                } else {
                                    toast({
                                        variant: "error",
                                        title: "Error",
                                        description: text
                                    });
                                }
                            }
                        }
                    }
                }
            }
        }, 100);

        return () => clearInterval(interval);
    }, [lastScannedQR, lastScannedTime, currentEvent]);

    const [modalOpen, setModalOpen] = useState(false);
    const router = useRouter();
    const eventParam = useSearchParams().get("event");

    return (
        <div className="mt-8 flex justify-center gap-4">
            <div>
                <h1 className="text-4xl font-semibold text-gray-700">Select Event</h1>
                <h2 className="text-gray-500">Choose the event to scan for</h2>
                <form className="mt-4">
                    <Select
                        defaultValue={["check-in", "lunch", "dinner"].includes(eventParam ?? "") ? eventParam! : undefined}
                        value={currentEvent as (string | undefined)}
                        onValueChange={val => {
                            setCurrentEvent(val);
                            router.push(`?event=${val}`, {
                                scroll: false,
                            });
                        }} required>
                        <SelectTrigger>
                            <SelectValue placeholder="Select an event"/>
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="check-in">Hacker check-in</SelectItem>
                            <SelectItem value="lunch">Lunch</SelectItem>
                            <SelectItem value="dinner">Dinner</SelectItem>
                        </SelectContent>
                    </Select>
                </form>
                {cameraError ? (
                    <div className="mt-4 text-red-500">Unable to access the camera. Please check your camera
                        settings.</div>
                ) : (
                    <Webcam
                        className="border-secondary-500 border-8 rounded-md mt-4"
                        ref={webcamRef}
                        screenshotFormat="image/png"
                        videoConstraints={videoConstraints}
                        onUserMediaError={() => setCameraError(true)}
                    />
                )}
                <Dialog open={modalOpen} onOpenChange={setModalOpen}>
                    <DialogContent
                        className="flex flex-col justify-center items-center py-4 md:py-6 lg:py-8 px-6 md:px-8 lg:px-12 w-[90%] max-w-3xl rounded-xl">
                        <DialogHeader className="w-full">
                            <DialogTitle
                                className="text-gray-700 text-2xl md:text-3xl font-semibold">{currentUserInfo?.firstName} {currentUserInfo?.lastName}</DialogTitle>
                            <DialogDescription className="md:text-lg">
                                <span className="text-lg">{currentUserInfo?.email}</span>
                            </DialogDescription>
                            <div className="w-full flex justify-center">
                                <div className="w-64 pt-4 text-gray-700 font-semibold text-lg">
                                    <Link
                                        className="border py-1 px-2 rounded-lg bg-white hover:bg-gray-200 duration-75"
                                        href={`/dashboard/admin/applications/${currentUserInfo?.id}?from=scan&event=${currentEvent}`}>
                                        View scanned user
                                    </Link>
                                </div>
                            </div>
                        </DialogHeader>
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    );
}