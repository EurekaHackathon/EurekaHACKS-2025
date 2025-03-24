import SponsorTier from "@/components/SponsorTier";
import PartnerTier from "@/components/PartnerTier";

export function PartnerSection() {
    return (
        <div className="text-gray-50 pt-32" id="sponsors">
            <h1 className="text-center font-semibold text-4xl md:text-6xl lg:text-6xl text-secondary-200">Our
                Partners</h1>
            <div className="w-full flex flex-col items-center lg:pt-10 md:pt-6 pt-4 text-bla`ck">
                <PartnerTier
                    partnersPerRow={2}
                    partnerInfo={[
                        {fileName: "hcb.png", name: "HCB", url: "https://bank.hackclub.com/"},
                    ]}
                />
            </div>
        </div>
    );
}