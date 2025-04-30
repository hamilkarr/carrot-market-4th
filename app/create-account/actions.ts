"use server";

import { z } from "zod";
import {
  PASSWORD_MAX_LENGTH,
  PASSWORD_MIN_LENGTH,
  PASSWORD_REGEX,
  PASSWORD_REGEX_ERROR,
  USERNAME_MAX_LENGTH,
  USERNAME_MIN_LENGTH,
} from "@/lib/login_constants";

function checkUsername(username: string) {
  return !username.includes("potato");
}
function checkPassword({
  password,
  confirmPassword,
}: {
  password: string;
  confirmPassword: string;
}) {
  return password === confirmPassword;
}

const formSchema = z
  .object({
    username: z
      .string({
        invalid_type_error: "Username must be a string",
        required_error: "Where is my username?",
      })
      .toLowerCase()
      .trim()
      .min(USERNAME_MIN_LENGTH, "too short")
      .max(USERNAME_MAX_LENGTH, "too long")
      .refine(checkUsername, "No potato allowed"),
    email: z.string().email().toLowerCase().trim(),
    password: z
      .string()
      .min(PASSWORD_MIN_LENGTH)
      .max(PASSWORD_MAX_LENGTH)
      .regex(PASSWORD_REGEX, PASSWORD_REGEX_ERROR),
    confirmPassword: z
      .string()
      .min(PASSWORD_MIN_LENGTH)
      .max(PASSWORD_MAX_LENGTH),
  })
  .refine(checkPassword, {
    path: ["confirmPassword"],
    message: "Both passwords should be the same",
  });

export async function createAccount(state: any, formData: FormData) {
  const data = {
    username: formData.get("username"),
    email: formData.get("email"),
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
  };

  const result = formSchema.safeParse(data);
  if (!result.success) {
    console.log(result.error.flatten().fieldErrors);
    return result.error.flatten().fieldErrors;
  } else {
    console.log(result.data);
  }
}
