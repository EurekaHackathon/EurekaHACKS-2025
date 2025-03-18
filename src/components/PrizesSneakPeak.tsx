import Image from "next/image";
import Bambu from "../../public/prizes/bambua1.webp";
import Hoodie from "../../public/prizes/dorahacks-hoodie.png";
import Keychron from "../../public/prizes/keychron.webp";

export default function PrizesSneakPeek() {
    return (
        <div className="flex flex-col items-center text-gray-50 pt-32 text-center">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold">A sneak peek of our prizes...</h1>
            <h2 className="text-lg md:text-xl lg:text-2xl font-semibold text-gray-300 pt-1">Over $11,500 in prizes to be
                won</h2>
            <div className="px-4 hidden md:flex gap-4 items-end content-center">
                <div
                    className="flex flex-col items-center bg-gray-200 rounded-xl p-4 bg-opacity-75 mt-8 hover:scale-105 hover:bg-opacity-80 duration-300 ease-in-out">
                    <Image className="w-64 md:w-96 lg:w-[500px]" src={Keychron} alt="DoraHacks Swag"/>
                    <h1 className="text-2xl lg:text-4xl text-secondary-800 font-semibold pt-2">Keychron Keyboards</h1>
                </div>
                <div
                    className="flex flex-col items-center bg-gray-200 rounded-xl p-4 bg-opacity-75 mt-8 hover:scale-105 hover:bg-opacity-80 duration-300 ease-in-out">
                    <Image className="w-64 md:w-96 lg:w-[500px]" src={Bambu} alt="Bambu Labs A1 Mini"/>
                    <h1 className="text-2xl lg:text-4xl text-secondary-800 font-semibold pt-2">Bambu Lab A1 mini x4</h1>
                </div>
                <div
                    className="flex flex-col items-center bg-gray-200 rounded-xl p-4 bg-opacity-75 mt-8 hover:scale-105 hover:bg-opacity-80 duration-300 ease-in-out">
                    <Image className="w-64 md:w-96 lg:w-[500px]" src={Hoodie} alt="Bambu Labs A1 Mini"/>
                    <h1 className="text-2xl lg:text-4xl text-secondary-800 font-semibold pt-2">DoraHacks Swag</h1>
                </div>
            </div>
            <div className="px-4 md:hidden flex flex-col gap-4 items-center">
                <div
                    className="w-full flex flex-col items-center bg-gray-200 rounded-xl p-4 bg-opacity-75 mt-8 hover:scale-105 hover:bg-opacity-80 duration-300 ease-in-out">
                    <Image className="w-64 md:w-96 lg:w-[500px]" src={Bambu} alt="Bambu Labs A1 Mini"/>
                    <h1 className="text-2xl lg:text-4xl text-secondary-800 font-semibold pt-2">Bambu Lab A1 mini x4</h1>
                </div>
                <div className="flex gap-4 items-start content-center">
                    <div
                        className="flex flex-col items-center bg-gray-200 rounded-xl p-4 bg-opacity-75 hover:scale-105 hover:bg-opacity-80 duration-300 ease-in-out">
                        <Image className="w-64 md:w-96 lg:w-[500px]" src={Keychron} alt="DoraHacks Swag"/>
                        <h1 className="text-2xl lg:text-4xl text-secondary-800 font-semibold pt-2">
                            Keychron Keyboards
                        </h1>
                    </div>
                    <div
                        className="flex flex-col items-center bg-gray-200 rounded-xl p-4 bg-opacity-75 hover:scale-105 hover:bg-opacity-80 duration-300 ease-in-out">
                        <Image className="w-64 md:w-96 lg:w-[500px]" src={Hoodie} alt="Bambu Labs A1 Mini"/>
                        <h1 className="text-2xl lg:text-4xl text-secondary-800 font-semibold pt-2">DoraHacks Swag</h1>
                    </div>
                </div>
            </div>
        </div>
    );
}