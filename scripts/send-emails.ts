import { db } from "@/lib/database";
import { getAllEmailsFromMailingList, GetAllEmailsFromMailingListRow } from "@/lib/sqlc/mailing_list_sql";
import NodeMailer from "nodemailer";
import "dotenv/config";
import { render } from "@react-email/components";
import ApplicationsOpenTemplate from "@/lib/emails/apps-open";
import { sendMailAsync } from "@/lib/actions/auth";

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

                We're excited to announce that applications for EurekaHACKS 2025 are now open!
                Join us on April 5th, 2025 at Abbey Park High School for an unforgettable day of
                innovation, learning, and fun.
                
                📍 Location: Abbey Park High School
                📅 Date: April 5th, 2025
                ⏰ Duration: 12 hours
                💻 Open to all high school students
                
                Apply here: https://eurekahacks.ca/
                
                Questions? Feel free to reach out to us at hello@eurekahacks.ca!

                Best,
                The EurekaHACKS Team
                `;

    const emailHTML = await render(ApplicationsOpenTemplate({
        unsubscribeLink: "https://eurekahacks.ca/unsubscribe?id=" + email.id,
        applicationLink: "https://eurekahacks.ca/dashboard",
    }));

    const mailOptions = {
        to: email.email,
        from: `"EurekaHACKS" hello@eurekahacks.ca`,
        subject: "Applications for EurekaHACKS 2025 are now open!",
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
