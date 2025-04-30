import { InputHTMLAttributes } from "react";

interface InputProps {
  errors?: string[];
  name: string;
}

export default function Input({
  errors = [],
  name,
  ...props
}: InputProps & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className="flex flex-col gap-2">
      <input
        name={name}
        className="bg-transparent rounded-md w-full h-10 focus:outline-none ring-2 focus:ring-4 ring-neutral-200 focus:ring-orange-500 placeholder:text-neutral-400 px-2 transition"
        {...props}
      />
      {errors.length > 0 && (
        <div className="text-red-500 font-medium">
          {errors.map((error, index) => (
            <span key={index}>{error}</span>
          ))}
        </div>
      )}
    </div>
  );
}
