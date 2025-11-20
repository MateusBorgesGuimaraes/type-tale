import { UpdateUser, User, UserProfile, UserStats } from "@/types/user";
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

export async function getUserStats(username: string) {
  return apiFetch<UserStats>(`/users/${username}/stats`);
}

export async function getUserProfileWithStories(username: string) {
  return apiFetch<UserProfile>(`/users/${username}/stories`, {
    next: {
      revalidate: 3600,
      tags: [`${username}-profile`],
    },
  });
}

export async function updateUserProfile(data: UpdateUser) {
  return apiFetch<User>(`/users/me`, {
    method: "PATCH",
    body: JSON.stringify(data),
  });
}
