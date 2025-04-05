import { db } from "@/lib/database";
import NodeMailer from "nodemailer";
import "dotenv/config";
import { render } from "@react-email/components";
import { sendMailAsync } from "@/lib/actions/auth";
import {
    createDecisionEmailRecord,
    getAllAcceptedApplications,
    getAllSentDecisionEmails
} from "@/lib/sqlc/application_sql";
import InfoEmailTemplate from "@/lib/emails/info";

const usersList = await getAllAcceptedApplications(db);
console.log("Users List", usersList.length);

const transporter = NodeMailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || "587"),
    secure: false,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
    },
    tls: {
        rejectUnauthorized: false,
    }
});
for (const userRow of usersList) {
    console.log("Sending email to", userRow.email);

    const emailText = `
                `;

    const emailHTML = await render(InfoEmailTemplate({
        firstName: userRow?.firstName || "hacker",
    }));

    const mailOptions = {
        to: userRow.email,
        from: `"EurekaHACKS" hello@eurekahacks.ca`,
        subject: "EurekaHACKS is tomorrow!",
        text: emailText,
        html: emailHTML,
    };

    try {
        await sendMailAsync(transporter, mailOptions);
        console.log("Sent email to", userRow.email);
    } catch (e) {
        console.log("Failed to send email to", userRow.email);
    }
    //
    // try {
    //     await createDecisionEmailRecord(db, {
    //         userId: userRow.userId,
    //         status: "accepted",
    //     });
    //     console.log("Created decision email record for", userRow.email);
    // } catch (e) {
    //     console.log("Failed to create decision email record for", userRow.email);
    // }

    // Wait 2 seconds
    await new Promise((resolve) => setTimeout(resolve, 2));
}
