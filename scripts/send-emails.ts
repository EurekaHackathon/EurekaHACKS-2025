import { db } from "@/lib/database";
import NodeMailer from "nodemailer";
import "dotenv/config";
import { render } from "@react-email/components";
import AcceptanceEmailTemplate from "@/lib/emails/acceptance";
import { sendMailAsync } from "@/lib/actions/auth";
import { createDecisionEmailRecord, getAllAcceptedApplications } from "@/lib/sqlc/application_sql";

const usersList = await getAllAcceptedApplications(db);

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
                Hey!

                    We’re excited to have you as a hacker for EurekaHACKS 2025, our third hackathon iteration! (You are
                    one step closer to the Bambu). Join us from 8:00 AM to 9:30 PM on April 5th 2025 at 1455 Glen
                    Abbey Gate, Oakville to take part in a memorable day filled with fun workshops, exciting activities
                    and free food!
                    
                    Here’s a sneak peek into this years event:
                    🌟 $11,000+ prize pool including 4 Bambu Lab A1 minis

                    🍎 Free lunch and dinner for all hackers!

                    🛠 Take part in fun workshops!

                    Date: Saturday April 5th
                    Time: 8:00 AM - 10:00 PM
                    Venue address: 1455 Glen Abbey Gate, Oakville
                    
                    Please RSVP to confirm your spot at EurekaHACKS 2025 if you have not already! We’ll be sending
                    you more details about the event
                    in the following days, so stay tuned!
                    
                    RSVP here: https://eurekahacks.ca/dashboard
                    
                Best,
                The EurekaHACKS Team
                `;

    const emailHTML = await render(AcceptanceEmailTemplate({
        firstName: userRow?.firstName || "hacker",
    }));

    const mailOptions = {
        to: userRow.email,
        from: `"EurekaHACKS" hello@eurekahacks.ca`,
        subject: "Congratulations 🎉, See You At EurekaHACKS 2025!",
        text: emailText,
        html: emailHTML,
    };

    try {
        await sendMailAsync(transporter, mailOptions);
        console.log("Sent email to", userRow.email);
    } catch (e) {
        console.log("Failed to send email to", userRow.email);
    }

    try {
        await createDecisionEmailRecord(db, {
            userId: userRow.userId,
            status: "accepted",
        });
        console.log("Created decision email record for", userRow.email);
    } catch (e) {
        console.log("Failed to create decision email record for", userRow.email);
    }

    // Wait 2 seconds
    await new Promise((resolve) => setTimeout(resolve, 2));
}
