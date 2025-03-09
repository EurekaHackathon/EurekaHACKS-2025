import { Byte, Encoder } from "@nuintun/qrcode";
import Image from "next/image";
import { cookies } from "next/headers";
import { authorizeSession } from "@/lib/sessions";
import { redirect } from "next/navigation";
import { QrCodeControls } from "@/components/QrCodeControls";
import { encryptAES } from "@/lib/encryption";

export default async function UserQRCode() {
    const cookieStore = await cookies();
    const sessionToken = cookieStore.get("session");
    const user = await authorizeSession(sessionToken?.value);
    if (!user) {
        redirect("/login");
    }

    const encoder = new Encoder({
        level: "H",
    });
    const encryptedId = encryptAES(process.env.QR_CODE_SECRET_KEY ?? "", user.id.toString());
    const qrcode = encoder.encode(new Byte(encryptedId));
    const dataURL = qrcode.toDataURL(21, {
        background: [236, 234, 253],
        foreground: [20, 12, 51],
        margin: 0
    }).replace(/^data:image\/gif;base64,/, "data:image/png;base64,");
    return (
        <div className="flex p-12 justify-center items-center min-h-screen">
            <div
                className="flex flex-col items-center bg-gray-50 border border-gray-300 p-8 md:p-10 lg:p-12 rounded-xl">
                <div>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl text-secondary-600 font-bold">QR Code</h1>
                    <p className="md:text-lg text-gray-500 mt-1">Use this QR code to check in and receive food.</p>
                </div>
                <Image
                    id="qrcode"
                    className="mt-4 md:mt-6 lg:mt-8 [image-rendering:pixelated] p-6 md:p-8 lg:p-12 bg-secondary-100 rounded-xl pointer-events-none"
                    src={dataURL} width={38 * 10} height={38 * 10}
                    alt="qrcode"/>
                <QrCodeControls dataURL={dataURL}/>
            </div>
        </div>
    );
}