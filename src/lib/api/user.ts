import { User } from "@/types/user";
import { apiFetch } from "./client";

export async function getUserProfile() {
  return apiFetch<User>("/users/me");
}
