import { LoginFormData } from "@/schemas/auth";
import { apiFetch } from "./client";
import { UserLoginResponse } from "@/types/user";

export async function login(data: LoginFormData) {
  return apiFetch<UserLoginResponse>("/auth/login", {
    method: "POST",
    body: JSON.stringify(data),
  });
}
