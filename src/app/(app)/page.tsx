import { HeroSectionArt } from "@/components/HeroSectionArt";
import { HeroSectionInfo } from "@/components/HeroSectionInfo";
import { AboutSection } from "@/components/AboutSection";
import PastYearsSection from "@/components/PastYearsSection";
import { SponsorSection } from "@/components/SponsorSection";
import FaqSection from "@/components/FaqSection";
import TeamSection from "@/components/TeamSection";
import { PartnerSection } from "@/components/PartnerSection";
import PrizesSneakPeek from "@/components/PrizesSneakPeak";

export default async function Home() {
    return (
        <div>
            <HeroSectionArt/>
            <div className="relative z-10">
                <HeroSectionInfo/>
                <div className="hidden bg-[#512fa6ff]" id="info">
                    <PrizesSneakPeek/>
                    <AboutSection/>
                    <PastYearsSection/>
                    <SponsorSection/>
                    <PartnerSection/>
                    <FaqSection/>
                    <TeamSection/>
                </div>
            </div>
        </div>
    );
}