import crypto from "crypto";

export function encryptAES(secretKey: string, data: string): string {
    if (!secretKey) throw new Error("Missing encryption key");

    // Ensure the secret key is 16 bytes for AES-128
    const keyBuffer = Buffer.from(secretKey, "base64").subarray(0, 16);

    // Generate an 8-byte IV (Initialization Vector)
    const iv = crypto.randomBytes(8);

    const cipher = crypto.createCipheriv("aes-128-gcm", keyBuffer, iv);

    // Encrypt the data and append the final part
    const encrypted = Buffer.concat([cipher.update(data, "utf-8"), cipher.final()]);

    // Get the 16-byte authentication tag (take only 8 bytes for compactness)
    const authTag = cipher.getAuthTag().subarray(0, 8);

    // Return IV + encrypted data + auth tag as base64 encoded string
    return Buffer.concat([iv, encrypted, authTag]).toString("base64");
}


export function decryptAES(secretKey: string, encryptedData: string): string {
    if (!secretKey) throw new Error("Missing encryption key");

    // Ensure the secret key is 16 bytes for AES-128
    const keyBuffer = Buffer.from(secretKey, "base64").subarray(0, 16);

    // Decode the Base64 encrypted data into a buffer
    const encryptedBuffer = Buffer.from(encryptedData, "base64");

    // Extract the 8-byte IV, the encrypted data, and the 8-byte auth tag
    const iv = encryptedBuffer.subarray(0, 8);  // First 8 bytes for IV
    const authTag = encryptedBuffer.subarray(encryptedBuffer.length - 8);  // Last 8 bytes for AuthTag
    const encrypted = encryptedBuffer.subarray(8, encryptedBuffer.length - 8);  // Middle part is the encrypted data

    // Create the decipher and set the auth tag
    const decipher = crypto.createDecipheriv("aes-128-gcm", keyBuffer, iv);
    decipher.setAuthTag(authTag);  // Set the auth tag for authentication

    // Decrypt the data and combine the result
    const decrypted = Buffer.concat([decipher.update(encrypted), decipher.final()]);

    // Return the decrypted string
    return decrypted.toString("utf-8");
}
