export function HeroSectionInfo() {
    return (
        <div className="text-center text-white pt-24 md:pt-32 lg:pt-64 2xl:pt-64">
            <h1 className="hidden md:block font-bold text-8xl lg:text-9xl">EurekaHACKS</h1>
            <h1 className="md:hidden font-bold text-7xl">Eureka</h1>
            <h1 className="md:hidden font-bold text-5xl">HACKS</h1>
            <div className="hidden md:flex justify-center gap-2 text-2xl">
                <h2 className="w-full text-end">May 4th, 2024</h2>
                <h2>|</h2>
                <h2 className="w-full text-start">Abbey Park High School</h2>
            </div>
            <h1 className="md:hidden font-semibold mt-2">May 4th, 2024 | Abbey Park High School</h1>
            <button disabled
                    className="bg-accent-400 md:text-xl lg:text-2xl font-semibold px-6 py-3 rounded-lg mt-8">
                Applications Open Soon
            </button>
        </div>
    );
}