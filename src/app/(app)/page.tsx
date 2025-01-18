import { HeroSectionArt } from "@/components/HeroSectionArt";
import { HeroSectionInfo } from "@/components/HeroSectionInfo";
import { AboutSection } from "@/components/AboutSection";
import PastYearsSection from "@/components/PastYearsSection";
import { SponsorSection } from "@/components/SponsorSection";
import FaqSection from "@/components/FaqSection";
import TeamSection from "@/components/TeamSection";

export default async function Home() {
    return (
        <div>
            <HeroSectionArt/>
            <div className="relative z-10">
                <HeroSectionInfo/>
                <div className="hidden bg-[#512fa6ff]" id="info">
                    <AboutSection/>
                    <PastYearsSection/>
                    <SponsorSection/>
                    <FaqSection/>
                    <TeamSection/>
                </div>
            </div>
        </div>
    );
}