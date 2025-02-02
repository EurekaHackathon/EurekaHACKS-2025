"use client";

interface SettingsFormProps {
    currentFirstName: string;
    currentLastName: string;
    loginMethod: string;
}

const formatLoginMethod = (loginMethod: string) => {
    if (loginMethod === "google") {
        return "Google";
    } else if (loginMethod === "email") {
        return "Email";
    } else if (loginMethod === "github") {
        return "GitHub";
    }
};

export default function SettingsForm({ currentFirstName, currentLastName, loginMethod }: SettingsFormProps) {
    return (
        <div className="text-gray-700 py-36 w-[40%]">
            <h1 className="text-5xl font-bold">Settings</h1>
            <h2 className="text-3xl font-semibold mt-8">Profile information</h2>
            <h3 className="font-medium text-gray-500">This will not affect your application information.</h3>
            <form className="mt-8">
                <label htmlFor="firstName" className="block text-lg font-medium">First name</label>
                <input type="text" id="firstName" defaultValue={currentFirstName}
                       className="border-gray-300 border hover:border-secondary-300 focus:outline-none rounded-lg w-full py-2 px-4 mt-2"/>
                <label htmlFor="lastName" className="block text-lg font-medium mt-4">Last name</label>
                <input type="text" id="lastName" defaultValue={currentLastName}
                       className="border-gray-300 border hover:border-secondary-300 focus:outline-none rounded-lg w-full py-2 px-4 mt-2"/>

                <button type="submit"
                        className="bg-secondary-600 text-gray-100 font-medium py-2 px-4 rounded-lg mt-8 hover:bg-[#815eeb] duration-200">Save
                    changes
                </button>
            </form>
            <h2 className="text-xl font-semibold mt-12">
                Your login method: <span className="">{formatLoginMethod(loginMethod)}</span>
            </h2>
            {loginMethod === "email" &&
                <>
                  <h2 className="text-3xl font-semibold mt-12">Change password</h2>
                  <h3 className="font-medium text-gray-500">Update your account password.</h3>
                  <form className="mt-8">
                    <label htmlFor="currentPassword" className="block text-lg font-medium">Current password</label>
                    <input type="password" id="currentPassword"
                           className="border-gray-300 border hover:border-secondary-300 focus:outline-none rounded-lg w-full py-2 px-4 mt-2"/>
                    <label htmlFor="newPassword" className="block text-lg font-medium mt-4">New password</label>
                    <input type="password" id="newPassword"
                           className="border-gray-300 border hover:border-secondary-300 focus:outline-none rounded-lg w-full py-2 px-4 mt-2"/>
                    <label htmlFor="confirmPassword" className="block text-lg font-medium mt-4">Confirm new
                      password</label>
                    <input type="password" id="confirmPassword"
                           className="border-gray-300 border hover:border-secondary-300 focus:outline-none rounded-lg w-full py-2 px-4 mt-2"/>

                    <button type="submit"
                            className="bg-secondary-600 text-gray-100 font-medium py-2 px-4 rounded-lg mt-8 hover:bg-[#815eeb] duration-200">Change
                      password
                    </button>
                  </form>
                </>
            }
        </div>
    );
}