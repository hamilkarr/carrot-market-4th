"use server";

import { z } from "zod";
import validator from "validator";
import { redirect } from "next/navigation";

const phoneSchema = z
  .string()
  .trim()
  .refine(
    (phone) => validator.isMobilePhone(phone, "ko-KR"),
    "Wrong phone format"
  );
const tokenSchema = z.coerce.number().int().min(100000).max(999999);

interface ActionState {
  token: boolean;
  phone: string | null;
}

export async function smsVerification(state: ActionState, formData: FormData) {
  const phone = formData.get("phone")?.toString() || null;
  const token = formData.get("token")?.toString();

  // 토큰 발송 전
  if (!state.token) {
    const result = phoneSchema.safeParse(phone);
    if (!result.success) {
      console.log(result.error.flatten().formErrors);
      return {
        token: false,
        phone: null,
        error: result.error.flatten(),
      };
    }

    return { token: true, phone: phone };
  }

  // 토큰 발송 후
  const result = tokenSchema.safeParse(token);
  if (!result.success) {
    return {
      token: false,
      phone: null,
      error: result.error.flatten(),
    };
  }

  // 인증 성공 후
  redirect("/");
}
