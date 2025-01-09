export const validateEmail = (email: any): validationResult => {
    if (!email) {
        return { valid: false, message: "Email is required" };
    }

    // Basic regex for checking that there is a name before the @ symbol and a domain
    const emailRegex = /^([^@]+)*@([^.@]+\.)+([^.@]+)$/;
    if (!emailRegex.test(email.toString())) {
        return { valid: false, message: "Invalid email" };
    }

    return { valid: true, message: "" };
};

interface validationResult {
    valid: boolean;
    message: string;
}