import { db } from "@/lib/database";
import { getAllEmailsFromMailingList, GetAllEmailsFromMailingListRow } from "@/lib/sqlc/mailing_list_sql";
import NodeMailer from "nodemailer";
import "dotenv/config";
import { render } from "@react-email/components";
import AppsDueSoonTemplate from "@/lib/emails/apps-due-soon";
import { sendMailAsync } from "@/lib/actions/auth";
import { getUserByEmail, getUserByID } from "@/lib/sqlc/auth_sql";

const emails = await getAllEmailsFromMailingList(db);

// Get rid of duplicates
const uniqueEmails = new Set<GetAllEmailsFromMailingListRow>();
emails.forEach((email) => uniqueEmails.add(email));

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

for (const email of uniqueEmails) {

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
        console.log("Sending email to", email.email);
        await sendMailAsync(transporter, mailOptions);
        console.log("Sent email to", email.email);
    } catch (e) {
        console.log("Failed to send email to", email.email);
    }

    // Wait 2 seconds
    await new Promise((resolve) => setTimeout(resolve, 2));
}
