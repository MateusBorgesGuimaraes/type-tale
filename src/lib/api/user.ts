import { User } from "@/types/user";
import { apiFetch } from "./client";
import { RegisterFormData } from "@/schemas/auth";

export async function getUserProfile() {
  return apiFetch<User>("/users/me");
}

export async function register(data: RegisterFormData) {
  return apiFetch<User>("/users", {
    method: "POST",
    body: JSON.stringify(data),
  });
}
