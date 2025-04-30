"use client";

import Button from "@/components/button";
import Input from "@/components/input";
import { useActionState } from "react";
import { smsVerification } from "./actions";

const initialState = {
  token: false,
  phone: null,
  error: undefined,
};

export default function SMSLogin() {
  const [state, formAction] = useActionState(smsVerification, initialState);
  return (
    <section className="flex flex-col gap-10 py-8 px-6">
      <header className="flex flex-col gap-2 *:font-medium">
        <h1 className="text-2xl font-bold">SMS Login</h1>
        <h2 className="text-xl">Verify your phone number</h2>
      </header>
      <form action={formAction} className="flex flex-col gap-3">
        <Input
          name="phone"
          type="text"
          placeholder="Phone Number"
          required={true}
          defaultValue={state.phone || ""}
          disabled={state.token}
          errors={state.error?.formErrors}
        />
        {state.token ? (
          <Input
            name="token"
            type="number"
            placeholder="Verification Code"
            min={100000}
            max={999999}
            required={true}
          />
        ) : null}
        <Button text={state.token ? "Verify" : "Send Verification SMS"} />
      </form>
    </section>
  );
}
