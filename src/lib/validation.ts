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

export const validatePassword = (password: any): validationResult => {
    if (!password) {
        return { valid: false, message: "Password is required" };
    }

    // Different error message for edge case
    if (password.length > 128) {
        return { valid: false, message: "Password must be less than 128 characters long" };
    }

    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\\d).{8,128}$/;
    if (!passwordRegex.test(password.toString())) {
        return {
            valid: false,
            message: "Password must be at least 8 characters long and contain at least one letter and one number"
        };
    }

    return { valid: true, message: "" };
};

export const validateFirstName = (name: any): validationResult => {
    if (!name || name.length === 0) {
        return { valid: false, message: "First name is required" };
    }

    if (name.length > 128) {
        return { valid: false, message: "First name must be less than 128 characters long" };
    }

    return { valid: true, message: "" };
};

export const validateLastName = (name: any): validationResult => {
    if (!name || name.length === 0) {
        return { valid: false, message: "Last name is required" };
    }

    if (name.length > 128) {
        return { valid: false, message: "Last name must be less than 128 characters long" };
    }

    return { valid: true, message: "" };
};

interface validationResult {
    valid: boolean;
    message: string;
}