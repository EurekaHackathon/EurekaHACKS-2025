import { Icon } from "@iconify/react";
import Link from "next/link";

export default function Pagination({ currentPage, numberOfCurrentItems, numberOfTotalItems, className }: {
    currentPage: number,
    numberOfCurrentItems: number,
    numberOfTotalItems: number,
    className?: string | undefined
}) {
    const lastPage = Math.ceil(numberOfTotalItems / 10);
    return (
        <div className={"flex justify-between w-full " + className}>
            <p className="font-medium text-gray-500">
                Showing {currentPage * 10 - 9}–{(currentPage - 1) * 10 + numberOfCurrentItems} of {numberOfTotalItems} applications
            </p>
            <div className="flex gap-2">
                {/*Back button*/}
                <Link href={`/dashboard/admin/applications?page=${currentPage - 1}`} scroll={false}
                      className={`flex items-center justify-center bg-secondary-50 h-8 w-8 border border-gray-300 text-gray-700 min-h-9 min-w-9 px-2 py-2 rounded-md hover:bg-secondary-200 duration-75
                      ${currentPage === 1 ? "opacity-50 pointer-events-none" : ""}`}
                      tabIndex={currentPage === 1 ? -1 : undefined}
                      aria-disabled={currentPage === 1}>
                    <Icon icon="f7:chevron-left" className="text-xl"/>
                </Link>
                {currentPage === 1 && (
                    <>
                        <h1 className={`flex items-center justify-center h-8 w-8 bg-secondary-500 text-white min-h-9 min-w-9 px-2 py-2 rounded-md hover:bg-secondary-400 duration-75`}>
                            1
                        </h1>
                        {numberOfTotalItems > 10 && (
                            <Link href="/dashboard/admin/applications?page=2" scroll={false}
                                  className={`flex items-center justify-center h-8 w-8 bg-secondary-50 border border-gray-300 text-gray-700 min-h-9 min-w-9 px-2 py-2 rounded-md hover:bg-secondary-200 duration-75`}>
                                2
                            </Link>
                        )}
                        {numberOfTotalItems > 20 && (
                            <Link href="/dashboard/admin/applications?page=3" scroll={false}
                                  className={`flex items-center justify-center h-8 w-8 bg-secondary-50 border border-gray-300 text-gray-700 min-h-9 min-w-9 px-2 py-2 rounded-md hover:bg-secondary-200 duration-75`}>
                                3
                            </Link>
                        )}
                        {numberOfTotalItems > 30 && numberOfTotalItems <= 40 && (
                            <Link href="/dashboard/admin/applications?page=4" scroll={false}
                                  className={`flex items-center justify-center h-8 w-8 bg-secondary-50 border border-gray-300 text-gray-700 min-h-9 min-w-9 px-2 py-2 rounded-md hover:bg-secondary-200 duration-75`}>
                                4
                            </Link>
                        )}
                        {numberOfTotalItems > 40 && (
                            <>
                                <h1 className="flex items-end justify-center text-3xl text-gray-700 w-8 h-8">
                                    …
                                </h1>
                                <Link href={"/dashboard/admin/applications?page=" + lastPage} scroll={false}
                                      className={`flex items-center justify-center h-8 w-8 bg-secondary-50 border border-gray-300 text-gray-700 min-h-9 min-w-9 px-2 py-2 rounded-md hover:bg-secondary-200 duration-75`}>
                                    {lastPage}
                                </Link>
                            </>
                        )}
                    </>
                )}
                {currentPage === lastPage && (
                    <>
                        {lastPage >= 5 && (
                            <>
                                <Link href={"/dashboard/admin/applications?page=" + (1)} scroll={false}
                                      className={`flex items-center justify-center h-8 w-8 bg-secondary-50 border border-gray-300 text-gray-700 min-h-9 min-w-9 px-2 py-2 rounded-md hover:bg-secondary-200 duration-75`}>
                                    {1}
                                </Link>
                                <h1 className="flex items-end justify-center text-3xl text-gray-700 w-8 h-8">
                                    …
                                </h1>
                            </>
                        )}
                        {lastPage === 4 && (
                            <Link href={"/dashboard/admin/applications?page=" + (lastPage - 3)} scroll={false}
                                  className={`flex items-center justify-center h-8 w-8 bg-secondary-50 border border-gray-300 text-gray-700 min-h-9 min-w-9 px-2 py-2 rounded-md hover:bg-secondary-200 duration-75`}>
                                {lastPage - 3}
                            </Link>
                        )}
                        {lastPage >= 3 && (
                            <>
                                <Link href={"/dashboard/admin/applications?page=" + (lastPage - 2)} scroll={false}
                                      className={`flex items-center justify-center h-8 w-8 bg-secondary-50 border border-gray-300 text-gray-700 min-h-9 min-w-9 px-2 py-2 rounded-md hover:bg-secondary-200 duration-75`}>
                                    {lastPage - 2}
                                </Link>
                            </>
                        )}
                        {lastPage >= 2 && (
                            <>
                                <Link href={"/dashboard/admin/applications?page=" + (lastPage - 1)} scroll={false}
                                      className={`flex items-center justify-center h-8 w-8 bg-secondary-50 border border-gray-300 text-gray-700 min-h-9 min-w-9 px-2 py-2 rounded-md hover:bg-secondary-200 duration-75`}>
                                    {lastPage - 1}
                                </Link>
                            </>
                        )}
                        <h1 className={`flex items-center justify-center h-8 w-8 bg-secondary-500 text-white min-h-9 min-w-9 px-2 py-2 rounded-md hover:bg-secondary-400 duration-75`}>
                            {lastPage}
                        </h1>
                    </>
                )}
                {currentPage > 1 && currentPage < lastPage && (
                    <>
                        {currentPage > 3 && lastPage - currentPage >= 1 && (
                            <>
                                <Link href={"/dashboard/admin/applications?page=" + (1)} scroll={false}
                                      className={`flex items-center justify-center h-8 w-8 bg-secondary-50 border border-gray-300 text-gray-700 min-h-9 min-w-9 px-2 py-2 rounded-md hover:bg-secondary-200 duration-75`}>
                                    {1}
                                </Link>
                                <h1 className="flex items-end justify-center text-3xl text-gray-700 w-8 h-8">
                                    …
                                </h1>
                            </>
                        )}
                        {currentPage === 3 && lastPage - currentPage >= 1 && (
                            <>
                                <Link href={"/dashboard/admin/applications?page=" + (1)} scroll={false}
                                      className={`flex items-center justify-center h-8 w-8 bg-secondary-50 border border-gray-300 text-gray-700 min-h-9 min-w-9 px-2 py-2 rounded-md hover:bg-secondary-200 duration-75`}>
                                    {1}
                                </Link>
                            </>
                        )}
                        <Link href={"/dashboard/admin/applications?page=" + (currentPage - 1)} scroll={false}
                              className={`flex items-center justify-center h-8 w-8 bg-secondary-50 border border-gray-300 text-gray-700 min-h-9 min-w-9 px-2 py-2 rounded-md hover:bg-secondary-200 duration-75`}>
                            {currentPage - 1}
                        </Link>
                        <h1 className={`flex items-center justify-center h-8 w-8 bg-secondary-500 text-white min-h-9 min-w-9 px-2 py-2 rounded-md hover:bg-secondary-400 duration-75`}>
                            {currentPage}
                        </h1>
                        <Link href={"/dashboard/admin/applications?page=" + (currentPage + 1)} scroll={false}
                              className={`flex items-center justify-center h-8 w-8 bg-secondary-50 border border-gray-300 text-gray-700 min-h-9 min-w-9 px-2 py-2 rounded-md hover:bg-secondary-200 duration-75`}>
                            {currentPage + 1}
                        </Link>
                        {lastPage - currentPage == 2 && (
                            <Link href={"/dashboard/admin/applications?page=" + (currentPage + 2)} scroll={false}
                                  className={`flex items-center justify-center h-8 w-8 bg-secondary-50 border border-gray-300 text-gray-700 min-h-9 min-w-9 px-2 py-2 rounded-md hover:bg-secondary-200 duration-75`}>
                                {currentPage + 2}
                            </Link>
                        )}
                        {lastPage - currentPage > 2 && (
                            <>
                                <h1 className="flex items-end justify-center text-3xl text-gray-700 w-8 h-8">
                                    …
                                </h1>
                                <Link href={"/dashboard/admin/applications?page=" + (lastPage)} scroll={false}
                                      className={`flex items-center justify-center h-8 w-8 bg-secondary-50 border border-gray-300 text-gray-700 min-h-9 min-w-9 px-2 py-2 rounded-md hover:bg-secondary-200 duration-75`}>
                                    {lastPage}
                                </Link>
                            </>
                        )}
                    </>
                )}
                {/*Next button*/}
                <Link href={`/dashboard/admin/applications?page=${currentPage + 1}`} scroll={false}
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