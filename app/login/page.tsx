"use client";

import Button from "@/components/button";
import Input from "@/components/input";
import SocialLogin from "@/components/social-login";
import { useActionState } from "react";
import { login } from "./actions";

export default function Login() {
  const [state, formAction] = useActionState(login, {});
  return (
    <section className="flex flex-col gap-10 py-8 px-6">
      <header className="flex flex-col gap-2 *:font-medium">
        <h1 className="text-2xl font-bold">안녕하세요!</h1>
        <h2 className="text-xl">Log in with your email and password</h2>
      </header>
      <form action={formAction} className="flex flex-col gap-3">
        <Input
          name="email"
          type="email"
          placeholder="Email"
          required={true}
          errors={state?.email}
        />
        <Input
          name="password"
          type="password"
          placeholder="Password"
          required={true}
          errors={state?.password}
        />
        <Button text="Log in" />
      </form>
      <SocialLogin />
    </section>
  );
}
