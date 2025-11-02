"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { login as apiLogin } from "../lib/api/auth";
import { LoginFormData, RegisterFormData } from "@/schemas/auth";
import { User } from "@/types/user";
import { getUserProfile, register as apiRegister } from "@/lib/api/user";

type LoginSuccessResponse = {
  success: true;
  data: {
    accessToken: string;
    user: User | null;
  };
};

type LoginErrorResponse = {
  success: false;
  error: string;
};

export async function loginAction(
  data: LoginFormData,
): Promise<LoginSuccessResponse | LoginErrorResponse> {
  try {
    const response = await apiLogin(data);

    const cookieStore = await cookies();
    cookieStore.set("accessToken", response.data.accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });

    try {
      const userProfile = await getUserProfile();

      return {
        success: true,
        data: {
          accessToken: response.data.accessToken,
          user: userProfile.data,
        },
      };
    } catch (profileError) {
      console.error("Error retrieving user profile:", profileError);
      cookieStore.delete("accessToken");

      return {
        success: false,
        error: "Failed to load user data. Please try again.",
      };
    }
  } catch (error: any) {
    let errorMsg = "Error when logging in";

    if (error?.statusCode === 401) {
      errorMsg = "Incorrect email or password.";
    } else if (error?.statusCode === 429) {
      errorMsg = "Too many attempts. Try again later.";
    } else if (error?.message) {
      errorMsg = Array.isArray(error.message)
        ? error.message.join(", ")
        : error.message;
    }

    return {
      success: false,
      error: errorMsg,
    };
  }
}

type RegisterSuccessResponse = {
  success: true;
  data: {
    accessToken: string;
    user: User | null;
  };
};

type RegisterErrorResponse = {
  success: false;
  error: string;
};

export async function registerAction(
  data: RegisterFormData,
): Promise<RegisterSuccessResponse | RegisterErrorResponse> {
  try {
    const response = await apiRegister(data);

    if (response.statusCode === 201) {
      const loginResult = await loginAction({
        email: data.email,
        password: data.password,
      });

      return loginResult;
    }

    return {
      success: false,
      error: "Unexpected error while creating account.a",
    };
  } catch (error: any) {
    let errorMsg = "Error creating account";

    if (error?.statusCode === 409) {
      errorMsg = "Email already registered";
    } else if (error?.statusCode === 429) {
      errorMsg = "Too many attempts. Try again later.";
    } else if (error?.statusCode === 400) {
      errorMsg = error?.message
        ? Array.isArray(error.message)
          ? error.message.join(", ")
          : error.message
        : "Invalid data";
    } else if (error?.message) {
      errorMsg = Array.isArray(error.message)
        ? error.message.join(", ")
        : error.message;
    }

    return {
      success: false,
      error: errorMsg,
    };
  }
}

type GetUserProfileSuccessResponse = {
  success: true;
  data: User;
};

type GetUserProfileErrorResponse = {
  success: false;
  error: string;
};

export async function getUserProfileAction(): Promise<
  GetUserProfileSuccessResponse | GetUserProfileErrorResponse
> {
  try {
    const userProfile = await getUserProfile();
    return {
      success: true,
      data: userProfile.data,
    };
  } catch (error: any) {
    const errorMsg = error?.message
      ? Array.isArray(error.message)
        ? error.message.join(", ")
        : error.message
      : "Error when searching profile";

    return {
      success: false,
      error: errorMsg,
    };
  }
}

export async function logoutAction() {
  const cookieStore = await cookies();
  cookieStore.delete("accessToken");
  redirect("/login");
}

export async function getAccessToken() {
  const cookieStore = await cookies();
  return cookieStore.get("accessToken")?.value;
}
