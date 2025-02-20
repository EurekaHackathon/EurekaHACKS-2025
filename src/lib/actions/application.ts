"use server";

import { dietaryRestrictionsList } from "@/app/(dashboard)/dashboard/application/data";
import { applicationSchema } from "@/lib/validation";
import { createApplication } from "@/lib/sqlc/application_sql";
import { db } from "@/lib/database";
import { cookies } from "next/headers";
import { authorizeSession } from "@/lib/sessions";
import { redirect } from "next/navigation";
import NodeMailer from "nodemailer";
import { render } from "@react-email/components";
import ApplicationSubmittedTemplate from "@/lib/emails/application-submitted";
import { sendMailAsync } from "@/lib/actions/auth";

const safeParseNumber = (value: FormDataEntryValue | null) => {
    if (value === null) {
        return null;
    }
    const parsed = parseInt(value as string, 10);
    return isNaN(parsed) ? null : parsed;
};

export const apply = async (_prevState: any, formData: FormData) => {
    const firstName = formData.get("first-name");
    const lastName = formData.get("last-name");
    const email = formData.get("email");
    const age = formData.get("age");
    let school = formData.get("school");
    if (school === "Other") {
        school = formData.get("school-other");
    }
    let graduationYear = formData.get("graduation-year");
    if (graduationYear === "other") {
        graduationYear = formData.get("graduation-year-other");

    }
    let city = formData.get("city");
    if (city === "Other") {
        city = formData.get("city-other");
    }
    const numberHackathonsAttended = formData.get("number-hackathons-attended");
    const shortAnswer = formData.get("short-answer");
    const dietaryRestrictions: Record<string, FormDataEntryValue | null> = {};
    for (const restriction of dietaryRestrictionsList) {
        dietaryRestrictions[restriction] = formData.get(restriction);
    }
    let otherDietaryRestrictions = null;
    if (dietaryRestrictions["Other"]) {
        otherDietaryRestrictions = formData.get("other-dietary-restrictions");
    }
    const github = formData.get("github");
    const linkedin = formData.get("linkedin");
    const portfolio = formData.get("portfolio");
    const resume = formData.get("resume");
    const emergencyContactFullName = formData.get("emergency-contact-full-name");
    const emergencyContactPhone = formData.get("emergency-contact-phone");
    const validationResult = applicationSchema.safeParse({
        firstName,
        lastName,
        email,
        age: safeParseNumber(age),
        school,
        graduationYear: safeParseNumber(graduationYear),
        city,
        numberHackathonsAttended: safeParseNumber(numberHackathonsAttended),
        shortAnswer,
        lactoseIntolerant: dietaryRestrictions["Lactose Intolerant"] === "on",
        halal: dietaryRestrictions["Halal"] === "on",
        vegetarian: dietaryRestrictions["Vegetarian"] === "on",
        vegan: dietaryRestrictions["Vegan"] === "on",
        glutenFree: dietaryRestrictions["Gluten Free"] === "on",
        otherDietaryRestrictions: otherDietaryRestrictions?.toString(),
        github,
        linkedin,
        portfolio,
        resume,
        emergencyContactFullName,
        emergencyContactPhoneNumber: emergencyContactPhone,
    });

    if (!validationResult.success) {
        const errorMessages = validationResult.error.errors.map((error) => error.message);

        return {
            error: errorMessages.join("\n"),
            payload: formData,
        };
    }

    const cookieStores = await cookies();
    const sessionToken = cookieStores.get("session");
    if (!sessionToken) {
        return {
            error: "You are not logged in.",
            payload: formData,
        };
    }
    const user = await authorizeSession(sessionToken.value);

    if (!user) {
        return {
            error: "You are not logged in.",
            payload: formData,
        };
    }

    const userDietaryRestrictions: string[] = [];
    if (validationResult.data.lactoseIntolerant) {
        userDietaryRestrictions.push("lactose intolerant");
    }
    if (validationResult.data.halal) {
        userDietaryRestrictions.push("halal");
    }
    if (validationResult.data.vegetarian) {
        userDietaryRestrictions.push("vegetarian");
    }
    if (validationResult.data.vegan) {
        userDietaryRestrictions.push("vegan");
    }
    if (validationResult.data.glutenFree) {
        userDietaryRestrictions.push("gluten free");
    }
    if (validationResult.data.otherDietaryRestrictions) {
        userDietaryRestrictions.push(validationResult.data.otherDietaryRestrictions);
    }

    try {
        await createApplication(db, {
            userId: user.id,
            firstName: validationResult.data.firstName,
            lastName: validationResult.data.lastName,
            email: validationResult.data.email,
            age: validationResult.data.age,
            school: validationResult.data.school,
            yearOfGraduation: validationResult.data.graduationYear,
            city: validationResult.data.city,
            numberOfHackathonsAttended: validationResult.data.numberHackathonsAttended,
            shortAnswerResponse: validationResult.data.shortAnswer,
            dietaryRestrictions: userDietaryRestrictions,
            emergencyContactFullName: validationResult.data.emergencyContactFullName,
            emergencyContactPhoneNumber: validationResult.data.emergencyContactPhoneNumber,
            githubLink: validationResult.data.github,
            linkedinLink: validationResult.data.linkedin,
            portfolioLink: validationResult.data.portfolio,
            resumeLink: validationResult.data.resume,
            status: "submitted"
        });
    } catch (error) {
        console.log(error);
        return {
            error: "An error occurred while submitting your application. Please try again later.",
            payload: formData,
        };
    }

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

    const emailText = `
                Hey ${user.firstName ?? "Hacker"}!
        
                Thanks for applying to EurekaHACKS 2025! Your hacker application has been successfully submitted. We will review your application and get back to you soon. If you have any questions or concerns, please contact hello@eurekahacks.ca.
                
                Best,
                The EurekaHACKS Team
                `;

    const emailHTML = await render(ApplicationSubmittedTemplate({
        userFirstname: user.firstName ?? "Hacker",
    }));

    const mailOptions = {
        to: email as string,
        from: `"EurekaHACKS" hello@eurekahacks.ca`,
        subject: "Thanks for applying!",
        text: emailText,
        html: emailHTML,
    };

    await sendMailAsync(transporter, mailOptions);

    // Workaround to refresh the page
    redirect("/dashboard/application");
};