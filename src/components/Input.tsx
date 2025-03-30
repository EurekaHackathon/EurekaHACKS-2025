export function Input({ label, ...props }: any) {
    return (
        <div className="flex-1">
            <label className="block text-lg font-medium text-gray-700">
                {label} {props.required && <span className="text-error-600">*</span>}
            </label>
            <input {...props}
                   className="border-gray-300 border hover:border-secondary-300 focus:outline-none rounded-lg w-full py-2 px-4 mt-2"/>
        </div>
    );
}