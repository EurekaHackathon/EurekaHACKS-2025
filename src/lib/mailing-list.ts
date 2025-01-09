"use server";

import { db } from "@/lib/database";
import { addEmailToMailingList, getSubscribedEmail } from "@/lib/sqlc/mailing_list_sql";
import { validateEmail } from "@/lib/validation";

export const subscribeToMailingList = async (prevState: any, formData: FormData) => {
    const email = formData.get("email");
    const validationResult = validateEmail(email);
    if (!validationResult.valid || email === null) {
        return { error: validationResult.message };
    }

    try {
        // Check if email is already subscribed
        const subscribedEmail = await getSubscribedEmail(db, {
            email: email.toString(),
        });

        if (subscribedEmail !== null) {
            return { error: "Email is already subscribed" };
        }

        // Add email to mailing list
        await addEmailToMailingList(db, {
            email: email.toString(),
        });

        return { success: true };
    } catch (error) {
        console.error(error);
        return { error: "Internal server error, failed to subscribe" };
    }
};