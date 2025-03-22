import { db } from "@/lib/database";
import { getAllEmailsFromMailingList, GetAllEmailsFromMailingListRow } from "@/lib/sqlc/mailing_list_sql";
import NodeMailer from "nodemailer";
import "dotenv/config";
import { render } from "@react-email/components";
import AppsDueSoonTemplate from "@/lib/emails/apps-due-soon";
import { sendMailAsync } from "@/lib/actions/auth";
import { getUserByEmail, getUserByID } from "@/lib/sqlc/auth_sql";
import { getEmailsOfUnappliedUsers, GetEmailsOfUnappliedUsersRow } from "@/lib/sqlc/admin_sql";

const alreadySentEmails = await getAllEmailsFromMailingList(db);
const unappliedEmails = await getEmailsOfUnappliedUsers(db);

// Get rid of duplicates
const uniqueEmails = new Set<GetEmailsOfUnappliedUsersRow>();
unappliedEmails.forEach((email) => uniqueEmails.add(email));

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
let first = true;
for (const email of uniqueEmails) {
    if (!email.email || alreadySentEmails.find((e) => e.email === email.email)) {
        continue;
    }
    console.log("Sending email to", email.email);
    if (first) {
        first = false;
        await new Promise((resolve) => setTimeout(resolve, 2));
    }
    const emailText = `
                Hey!

                We saw that you created a EurekaHACKS account but haven’t submitted an application yet! Applications
                    are due on Saturday, March 22, 2025 at 11:59 PM EST. Applying only takes <strong>3</strong> minutes—no short answer
                    responses required. Don't miss out on free food, $11,000 in prizes
                    (including four 3D printers), and a ton of fun!
                    
                Best,
                The EurekaHACKS Team
                `;

    const user = await getUserByEmail(db, {
        email: email.email,
    });

    const emailHTML = await render(AppsDueSoonTemplate({
        firstName: user?.firstName || "hacker",
    }));

    const mailOptions = {
        to: email.email,
        from: `"EurekaHACKS" hello@eurekahacks.ca`,
        subject: "🚨 EurekaHACKS 2025 applications are due tomorrow! 🚨",
        text: emailText,
        html: emailHTML,
    };

    try {
        await sendMailAsync(transporter, mailOptions);
        console.log("Sent email to", email.email);
    } catch (e) {
        console.log("Failed to send email to", email.email);
    }

    // Wait 2 seconds
    await new Promise((resolve) => setTimeout(resolve, 2));
}
