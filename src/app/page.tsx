import { HeroSectionArt } from "@/components/HeroSectionArt";
import { HeroSectionInfo } from "@/components/HeroSectionInfo";
import { AboutSection } from "@/components/AboutSection";
import PastYearsSection from "@/components/PastYearsSection";
import { SponsorSection } from "@/components/SponsorSection";
import FaqSection from "@/components/FaqSection";
import TeamSection from "@/components/TeamSection";
import { db } from "@/lib/database";
import { incrementVisitsCount } from "@/lib/sqlc/visit_count_sql";

export default async function Home() {
    try {
        await incrementVisitsCount(db);
    } catch (error) {
        console.error(error);
    }

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