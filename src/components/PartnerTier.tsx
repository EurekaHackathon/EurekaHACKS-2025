import React from "react";

interface partnerInfo {
    fileName: string;
    name: string;
    url: string;
}

export default function PartnerTier({ partnerInfo, partnersPerRow }: {
    partnerInfo: partnerInfo[],
    partnersPerRow: number
}) {
    return (
        <div className="xl:w-[60%] lg:w-[70%] md:w-[80%] w-[98%] z-[5]">
            {Array.from(
                { length: Math.ceil(partnerInfo.length / partnersPerRow) },
                (_, i) => partnerInfo.slice(i * partnersPerRow, (i + 1) * partnersPerRow))
                .map((partnerRow, rowIndex) => {
                    return (
                        <React.Fragment key={rowIndex}>
                            <div
                                style={{ gridTemplateColumns: `repeat(${partnersPerRow}, minmax(0, 1fr))` }}
                                className={partnerRow.length === partnersPerRow ? `grid lg:pt-6 md:pt-4 pt-2` : "flex flex-row justify-center lg:pt-6 md:pt-4 pt-2  "}>
                                {partnerRow.map((partner, partnerIndex) => {
                                    return (
                                        <React.Fragment key={partnerIndex}>
                                            <a href={partner.url} target="_blank"
                                               style={{ width: `${partnerRow.length === partnersPerRow ? "100" : (1 / partnersPerRow * 100)}%` }}
                                               className={"lg:px-3 md:px-2 px-1 flex flex-col items-center"}>
                                                <div
                                                    className="w-full bg-secondary-100 flex flex-col items-center p-4 rounded-lg duration-200 ease-in-out hover:scale-[103%] rotate-[0.01deg]">
                                                    <img
                                                        src={"/partners/" + partner.fileName}
                                                        alt={partner.name + "Logo"}
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