import ImageCarousel from "@/components/ImageCarousel";

const stats = [
    { value: "$7,000+", label: "in prizes" },
    { value: "150+", label: "hackers" },
    { value: "30+", label: "projects" },
    { value: "40+", label: "schools" },
    { value: "15+", label: "workshops" },
];

export default function PastYearsSection() {
    return (
        <div id="past" className="text-gray-50 pt-24 md:pt-36 lg:pt-72">
            <h1 className="text-4xl md:text-6xl lg:text-8xl text-center font-semibold text-secondary-200">Last year, we had...</h1>
            <div className="hidden lg:flex justify-center gap-16 pt-16 font-medium">
                {stats.map((stat, index) => (
                    <div key={index} className="text-center">
                        <h2 className="text-5xl xl:text-6xl">{stat.value}</h2>
                        <h3 className="text-3xl xl:text-3xl">{stat.label}</h3>
                    </div>
                ))}
            </div>
            <div className="lg:hidden flex justify-center gap-6 md:gap-8 pt-8 font-medium">
                {stats.slice(0, 3).map((stat, index) => (
                    <div key={index} className="text-center">
                        <h2 className="text-2xl md:text-4xl">{stat.value}</h2>
                        <h3 className="text-xl md:text-2xl">{stat.label}</h3>
                    </div>
                ))}
            </div>
            <div className="lg:hidden flex justify-center gap-6 pt-4 font-medium">
                {stats.slice(3).map((stat, index) => (
                    <div key={index} className="text-center">
                        <h2 className="text-2xl md:text-4xl">{stat.value}</h2>
                        <h3 className="text-xl md:text-2xl">{stat.label}</h3>
                    </div>
                ))}
            </div>
            <div className="flex justify-center">
                <ImageCarousel />
            </div>
            {/*<h1 className="text-center py-32 text-2xl">insert some art here or smth</h1>*/}
        </div>
    );
}