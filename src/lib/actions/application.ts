export const apply = async (_prevState: any, formData: FormData) => {
    console.log(_prevState, formData)

    await new Promise((resolve) => setTimeout(resolve, 2000)); // 2-second delay

    return { error: "none" };
}