import { Icon } from "@iconify/react";

export default function SignUpPage() {
    return (
        <div className="h-[100vh] bg-secondary-950 flex items-center justify-center">
            <div className="bg-gray-50 p-16 rounded-2xl">
                <h1 className="text-4xl font-bold">Create an account</h1>
                <h2 className="text-xl font-medium pt-2">Sign up to apply to EurekaHACKS</h2>
                <form className="pt-12">
                    <div className="flex gap-4">
                        <label className="flex flex-col text-xl">
                            First Name
                            <input
                                className="mt-2 rounded-xl py-4 px-6 border-gray-300 border hover:border-secondary-300 focus:outline-none"
                                type="text"
                                name="first-name" placeholder="First Name"/>
                        </label>
                        <label className="flex flex-col text-xl">
                            Last Name
                            <input
                                className="mt-2 rounded-xl py-4 px-6 border-gray-300 border hover:border-secondary-300 focus:outline-none"
                                type="text"
                                name="first-name" placeholder="Last Name"/>
                        </label>
                    </div>
                    <label className="pt-8 flex flex-col text-xl">
                        Email
                        <input
                            className="mt-2 rounded-xl py-4 px-6 border-gray-300 border hover:border-secondary-300 focus:outline-none"
                            type="email"
                            name="email" placeholder="hello@eurekahacks.ca"/>
                    </label>
                    <div className="pt-8 flex gap-4">
                        <label className="flex flex-col text-xl">
                            Password
                            <div className="flex mt-2 items-center">
                                <input
                                    className="rounded-xl py-4 px-6 border-gray-300 border hover:border-secondary-300 focus:outline-none"
                                    type="password"
                                    name="password" placeholder="••••••••••••"/>
                                <Icon className="text-2xl -ml-12" icon="mdi:hide-outline"/>
                            </div>
                        </label>
                        <label className="flex flex-col text-xl">
                            Confirm Password
                            <input
                                className="mt-2 rounded-xl py-4 px-6 border-gray-300 border hover:border-secondary-300 focus:outline-none"
                                type="password"
                                name="confirm-password" placeholder="••••••••••••"/>
                        </label>
                    </div>
                </form>
            </div>
        </div>
    );
}