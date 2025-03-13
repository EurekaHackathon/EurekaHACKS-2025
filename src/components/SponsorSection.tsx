import SponsorTier from "@/components/SponsorTier";

export function SponsorSection() {
    return (
        <div className="text-gray-50 pt-32" id="sponsors">
            <h1 className="text-center font-semibold text-5xl md:text-7xl lg:text-8xl text-secondary-200">Our
                Sponsors</h1>
            <div className="flex justify-center">
                <p className="text-center md:text-lg w-[90%] lg:w-[66%] 2xl:w-[33%] pt-6">
                    Become a part of Canada's premier high school hackathon. Your support helps inspire the next
                    generation of innovators and leaders in technology. Looking to make an impact? Email us at <a
                    className="font-semibold text-accent-300"
                    href="mailto:sponsorships@eurekahacks.ca">sponsorships@eurekahacks.ca</a>.
                </p>
            </div>
            <div className="w-full flex flex-col items-center lg:pt-12 md:pt-8 pt-6 text-bla`ck">
                {/*Diamond tier*/}
                <SponsorTier
                    sponsorsPerRow={1}
                    sponsorInfo={[
                        { fileName: "dorahacks.png", name: "DoraHacks", url: "https://dorahacks.io/" },
                    ]}
                />
                {/*Gold tier*/}
                <SponsorTier
                    sponsorsPerRow={2}
                    sponsorInfo={[
                        { fileName: "mathnasium.png", name: "Mathnasium Oakville", url: "https://www.instagram.com/mathnasium_oakville/" },
                        { fileName: "beeceptor.png", name: "Beeceptor", url: "https://beeceptor.com/?utm_source=eurekahacks.ca" },
                        { fileName: "vectara.png", name: "Vectara", url: "https://www.vectara.com/" },
                    ]}
                />
                {/*Silver tier*/}
                <SponsorTier
                    sponsorsPerRow={3}
                    sponsorInfo={[
                        { fileName: "algorithmics.png", name: "Algorithmics Oakville", url: "https://westoakville.alg.academy/" },
                        { fileName: "perimeter-institute.webp", name: "Perimeter Institute", url: "https://perimeterinstitute.ca/" },
                        { fileName: "codecrafters.png", name: "CodeCrafters", url: "https://codecrafters.io/" },
                        { fileName: "gotcha.png", name: "Gotcha Bubble Tea", url: "https://www.gotchabubbletea.ca/" },
                    ]}
                />
                {/*Bronze tier*/}
                <SponsorTier
                    sponsorsPerRow={4}
                    sponsorInfo={[
                        { fileName: "leading-aces-academy.png", name: "Leading Aces Academy", url: "https://www.leadingaces.com/" },
                        { fileName: "basecamp-climbing.png", name: "Basecamp Climbing", url: "https://basecampclimbing.ca/" },
                        { fileName: "art-of-problem-solving.png", name: "Art of Problem Solving", url: "https://artofproblemsolving.com/" },
                        { fileName: "jane-street.png", name: "Jane Street", url: "https://www.janestreet.com/" },
                        { fileName: "escape-from-the-6.png", name: "Escape From The 6", url: "https://escapefromthe6.com/" },
                        { fileName: "baskin-robbins.png", name: "Baskin Robbins", url: "https://www.baskinrobbins.ca/" },
                        { fileName: "interview-cake.png", name: "Interview Cake", url: "https://www.interviewcake.com/" },
                    ]}
                />
            </div>
            <h1 className="text-center text-xl md:text-3xl lg:text-4xl pt-12">...and more to come!</h1>
        </div>
    );
}