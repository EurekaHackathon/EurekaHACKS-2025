import { db } from "@/lib/database";
import { redirect } from "next/navigation";
import { removeEmailFromMailingList, RemoveEmailFromMailingListRow } from "@/lib/sqlc/mailing_list_sql";

export default async function UnsubscribeEmailPage({ searchParams, }: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
    let mailingListEmailID: string | string[] | undefined;
    let mailingListRecord: RemoveEmailFromMailingListRow | null = null;
    let err = false;
    let redirectUser = false;
    tryCatch: try {
        mailingListEmailID = (await searchParams).id;
        if (!mailingListEmailID || typeof mailingListEmailID !== "string") {
            redirectUser = true;
            break tryCatch;
        }

        mailingListRecord = await removeEmailFromMailingList(db, {
            id: mailingListEmailID
        });


        if (!mailingListRecord) {
            redirectUser = true;
            break tryCatch;
        }
    } catch (error) {
        err = true;
    }

    if (redirectUser) {
        redirect("/");
    }

    return (
        <div className="bg-secondary-200 flex items-center justify-center py-32 flex-grow">
            <div
                className="bg-gray-50 p-8 md:p-12 lg:p-16 rounded-2xl text-gray-700 min-w-[40vw] max-w-[90vw] lg:w-[750px]">
                {!err && mailingListRecord &&
                    <>
                      <h1 className="text-2xl md:text-4xl font-bold">Unsubscribed!</h1>
                      <h2 className="md:text-xl font-medium pt-2">
                        We will no longer send emails to
                        <span className="font-bold text-secondary-600 pl-1.5">{mailingListRecord.email}</span>.
                      </h2>
                    </>
                }
                {(err || !mailingListEmailID) &&
                    <>
                      <h1 className="text-2xl md:text-4xl font-bold">Internal server error.</h1>
                      <h2 className="md:text-xl font-medium pt-2">
                        Please try again later.
                      </h2>
                    </>
                }
            </div>
        </div>
    );
}