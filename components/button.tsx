"use client";

import { useFormStatus } from "react-dom";

interface ButtonProps {
  text: string;
}

export default function Button({ text }: ButtonProps) {
  const { pending } = useFormStatus();
  return (
    <button
      disabled={pending}
      className="primary-btn h-10 font-semibold disabled:bg-neutral-400 disabled:cursor-not-allowed disabled:text-neutral-300"
      type="submit"
    >
      {pending ? "Loading..." : text}
    </button>
  );
}
