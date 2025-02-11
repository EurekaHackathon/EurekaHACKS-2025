import SponsorTier from "@/components/SponsorTier";

export function SponsorSection() {
    return (
        <div className="text-gray-50 pt-32" id="sponsors">
            <h1 className="text-center font-semibold text-5xl md:text-7xl lg:text-8xl text-secondary-400">Our Sponsors</h1>
            <div className="flex justify-center">
                <p className="text-center md:text-lg w-[90%] lg:w-[66%] 2xl:w-[33%] pt-6">
                    Become a part of Canada's premier high school hackathon. Your support helps inspire the next generation of innovators and leaders in technology. Looking to make an impact? Email us at <a className="font-semibold text-accent-300"
                        href="mailto:insertsponsoremail@eurekahacks.ca">insertemail@eurekahacks.ca</a>
                </p>
            </div>
            <h1 className="text-center text-3xl md:text-5xl lg:text-6xl pt-12">Coming Soon!</h1>
            {/*<div className="w-full flex flex-col items-center lg:pt-12 md:pt-8 pt-6 text-black">*/}
            {/*    <SponsorTier*/}
            {/*        sponsorsPerRow={1}*/}
            {/*        sponsorInfo={[*/}
            {/*            { fileName: "google.png", name: "Google", url: "https://google.ca" },*/}
            {/*            { fileName: "google.png", name: "Google", url: "https://google.ca" },*/}
            {/*        ]}*/}
            {/*    />*/}
            {/*    <SponsorTier*/}
            {/*        sponsorsPerRow={2}*/}
            {/*        sponsorInfo={[*/}
            {/*            { fileName: "google.png", name: "Google", url: "https://google.ca" },*/}
            {/*            { fileName: "google.png", name: "Google", url: "https://google.ca" },*/}
            {/*            { fileName: "google.png", name: "Google", url: "https://google.ca" },*/}
            {/*            { fileName: "google.png", name: "Google", url: "https://google.ca" },*/}
            {/*        ]}*/}
            {/*    />*/}
            {/*    <SponsorTier*/}
            {/*        sponsorsPerRow={3}*/}
            {/*        sponsorInfo={[*/}
            {/*            { fileName: "google.png", name: "Google", url: "https://google.ca" },*/}
            {/*            { fileName: "google.png", name: "Google", url: "https://google.ca" },*/}
            {/*            { fileName: "google.png", name: "Google", url: "https://google.ca" },*/}
            {/*        ]}*/}
            {/*    />*/}
            {/*    <SponsorTier*/}
            {/*        sponsorsPerRow={4}*/}
            {/*        sponsorInfo={[*/}
            {/*            { fileName: "google.png", name: "Google", url: "https://google.ca" },*/}
            {/*            { fileName: "google.png", name: "Google", url: "https://google.ca" },*/}
            {/*            { fileName: "google.png", name: "Google", url: "https://google.ca" },*/}
            {/*            { fileName: "google.png", name: "Google", url: "https://google.ca" },*/}
            {/*        ]}*/}
            {/*    />*/}
            {/*</div>*/}
            {/*<h1 className="text-center text-xl md:text-3xl lg:text-4xl pt-12">...and more to come!</h1>*/}
        </div>
    );
}