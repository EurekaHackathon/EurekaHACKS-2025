import React from "react";

interface SponsorInfo {
    fileName: string;
    name: string;
    url: string;
}

export default function SponsorTier({ sponsorInfo, sponsorsPerRow }: {
    sponsorInfo: SponsorInfo[],
    sponsorsPerRow: number
}) {
    return (
        <div className="xl:w-[60%] lg:w-[70%] md:w-[80%] w-[98%] z-[5]">
            {/*Splits the sponsors into sub-arrays of max length sponsorsPerRow*/}
            {Array.from(
                { length: Math.ceil(sponsorInfo.length / sponsorsPerRow) },
                (_, i) => sponsorInfo.slice(i * sponsorsPerRow, (i + 1) * sponsorsPerRow))
                .map((sponsorRow, rowIndex) => {
                    return (
                        <React.Fragment key={rowIndex}>
                            <div
                                style={{ gridTemplateColumns: `repeat(${sponsorsPerRow}, minmax(0, 1fr))` }}
                                className={sponsorRow.length === sponsorsPerRow ? `grid lg:pt-6 md:pt-4 pt-2` : "flex flex-row justify-center lg:pt-6 md:pt-4 pt-2  "}>
                                {sponsorRow.map((sponsor, sponsorIndex) => {
                                    return (
                                        <React.Fragment key={sponsorIndex}>
                                            <a href={sponsor.url} target="_blank"
                                                style={{ width: `${sponsorRow.length === sponsorsPerRow ? "100" : (1 / sponsorsPerRow * 100)}%` }}
                                                className={"lg:px-3 md:px-2 px-1 flex flex-col items-center"}>
                                                <div
                                                    className="w-full bg-secondary-100 flex flex-col items-center p-4 rounded-lg duration-200 ease-in-out hover:scale-[103%] rotate-[0.01deg]">
                                                    <img
                                                        src={"/sponsors/" + sponsor.fileName}
                                                        alt={sponsor.name + "Logo"}
                                                        className="lg:h-28 md:h-20 h-16 object-contain"
                                                        style={{ imageRendering: "auto" }}
                                                    />
                                                </div>
                                            </a>
                                        </React.Fragment>
                                    );
                                })}
                            </div>
                        </React.Fragment>
                    );
                })}
        </div>
    );
}