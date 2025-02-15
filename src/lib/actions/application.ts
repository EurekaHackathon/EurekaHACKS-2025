"use server";

import { dietaryRestrictionsList } from "@/app/(dashboard)/dashboard/application/data";
import { applicationSchema } from "@/lib/validation";

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

    return { error: "none", payload: formData };
};