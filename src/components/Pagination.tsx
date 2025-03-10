import { Icon } from "@iconify/react";
import Link from "next/link";

export default function Pagination({
                                       currentPage,
                                       numberOfCurrentItems,
                                       numberOfTotalItems,
                                       className,
                                   }: {
    currentPage: number;
    numberOfCurrentItems: number;
    numberOfTotalItems: number;
    className?: string;
}) {
    numberOfTotalItems = 100;

    const lastPage = Math.ceil(numberOfTotalItems / 10);
    const pages = new Set<number>();
    pages.add(1);
    pages.add(lastPage);
    pages.add(currentPage);

    // Add next and previous pages if they exist and aren't yet added.
    if (currentPage > 2) {
        pages.add(currentPage - 1);
    }
    if (currentPage < lastPage - 1) {
        pages.add(currentPage + 1);
    }

    // Add 2nd next and previous pages if they exist and aren't yet added, and there are less than 5 items in the set
    if (currentPage > 3 && pages.size < 5) {
        pages.add(currentPage - 2);
    }
    if (currentPage < lastPage - 2 && pages.size < 5) {
        pages.add(currentPage + 2);
    }

    // Add 3rd next and previous pages if they exist and aren't yet added, and there are less than 5 items in the set
    if (currentPage > 4 && pages.size < 5) {
        pages.add(currentPage - 3);
    }
    if (currentPage < lastPage - 3 && pages.size < 5) {
        pages.add(currentPage + 3);
    }

    // Remove any pages that are less than 1 or greater than the last page.
    pages.forEach((page) => {
        if (page < 1 || page > lastPage) {
            pages.delete(page);
        }
    });

    // Create a sorted array of pages.
    const sortedPages = [...pages].sort((a, b) => a - b);

    // Build the pages, inserting ellipsis when needed.
    const renderPages = [];
    for (let i = 0; i < sortedPages.length; i++) {
        if (i > 0 && sortedPages[i] - sortedPages[i - 1] > 1) {
            renderPages.push(
                <span key={`ellipsis-${sortedPages[i - 1]}`}
                      className="flex items-end justify-center text-gray-700 w-8 h-8">
          &#8230;
        </span>
            );
        }
        renderPages.push(
            <Link
                key={sortedPages[i]}
                href={`/dashboard/admin/applications?page=${sortedPages[i]}`}
                scroll={false}
                className={`flex items-center justify-center h-8 w-8 min-h-9 min-w-9 px-2 py-2 rounded-md duration-75 ${
                    sortedPages[i] === currentPage
                        ? "bg-secondary-500 text-white"
                        : "bg-secondary-50 border border-gray-300 text-gray-700 hover:bg-secondary-200"
                }`}
            >
                {sortedPages[i]}
            </Link>
        );
    }

    return (
        <div className={"flex justify-between w-full " + className}>
            <p className="font-medium text-gray-500">
                Showing {currentPage * 10 - 9}–{(currentPage - 1) * 10 + numberOfCurrentItems} of {numberOfTotalItems} applications
            </p>
            <div className="flex gap-2">
                <Link
                    href={`/dashboard/admin/applications?page=${currentPage - 1}`}
                    scroll={false}
                    className={`flex items-center justify-center bg-secondary-50 h-8 w-8 border border-gray-300 text-gray-700 min-h-9 min-w-9 px-2 py-2 rounded-md hover:bg-secondary-200 duration-75
                    ${currentPage === 1 ? "opacity-50 pointer-events-none" : ""}`}
                    tabIndex={currentPage === 1 ? -1 : undefined}
                    aria-disabled={currentPage === 1}>
                    <Icon icon="f7:chevron-left" className="text-xl"/>
                </Link>
                {renderPages.map((page) => page)}
                <Link
                    href={`/dashboard/admin/applications?page=${currentPage + 1}`}
                    scroll={false}
                    className={`flex items-center justify-center bg-secondary-50 h-8 w-8 border border-gray-300 text-gray-700 min-h-9 min-w-9 px-2 py-2 rounded-md hover:bg-secondary-200 duration-75
                    ${currentPage === lastPage ? "opacity-50 pointer-events-none" : ""}`}
                    tabIndex={currentPage === lastPage ? -1 : undefined}
                    aria-disabled={currentPage === lastPage}>
                    <Icon icon="f7:chevron-right" className="text-xl"/>
                </Link>
            </div>
        </div>
    );
}