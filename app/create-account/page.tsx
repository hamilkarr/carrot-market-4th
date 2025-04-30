"use client";

import Button from "@/components/button";
import Input from "@/components/input";
import SocialLogin from "@/components/social-login";
import { useActionState } from "react";
import { createAccount } from "./actions";

export default function CreateAccount() {
  const [state, formAction] = useActionState(createAccount, {});
  return (
    <section className="flex flex-col gap-10 py-8 px-6">
      <header className="flex flex-col gap-2 *:font-medium">
        <h1 className="text-2xl font-bold">안녕하세요!</h1>
        <h2 className="text-xl">Fill in the form below to join!</h2>
      </header>
      <form action={formAction} className="flex flex-col gap-3">
        <Input
          name="username"
          type="text"
          placeholder="Username"
          required={true}
          errors={state?.username}
          minLength={3}
          maxLength={20}
        />
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
          minLength={8}
          maxLength={20}
        />
        <Input
          name="confirmPassword"
          type="password"
          placeholder="Confirm Password"
          required={true}
          errors={state?.confirmPassword}
          minLength={8}
          maxLength={20}
        />
        <Button text="Create Account" />
      </form>
      <SocialLogin />
    </section>
  );
}
