import { LoginFormData, RegisterFormData } from "@/schemas/auth";
import { apiFetch } from "./client";
import { User, UserLoginResponse } from "@/types/user";

export async function login(data: LoginFormData) {
  return apiFetch<UserLoginResponse>("/auth/login", {
    method: "POST",
    body: JSON.stringify(data),
  });
}
