"use client";

import { useAuth } from "@/hooks/use-auth";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import CustomTextarea from "../custom-textarea/custom-textarea";
import { ButtonForm } from "../button-form/button-form";
import { User } from "@/types/user";
import {
  updateUserProfileSchema,
  UpdateUserProfileSchema,
} from "@/schemas/user";
import { updateUserProfile } from "@/lib/api/user";
import CustomInput from "../custom-input/custom-input";

interface ShowEditUserFormProps {
  userProfile: User;
  enabled: boolean;
}

export default function ShowEditUserForm({
  userProfile,
  enabled,
}: ShowEditUserFormProps) {
  const { user, setUser } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm<UpdateUserProfileSchema>({
    resolver: zodResolver(updateUserProfileSchema),
    defaultValues: {
      username: userProfile.username,
      email: userProfile.email,
      bio: userProfile?.bio ?? undefined,
    },
  });

  const usernameValue = watch("username");
  const emailValue = watch("email");
  const bioValue = watch("bio");

  const onSubmit = async (data: UpdateUserProfileSchema) => {
    if (!user && user !== userProfile.id) {
      toast.error("You can only edit your own profile.");
      return;
    }

    try {
      setIsLoading(true);

      const result = await updateUserProfile(data);

      if (result.statusCode !== 200) {
        const errorMsg = result.message || "Error in update your profile";
        toast.error(errorMsg);
        return;
      }

      setUser(result.data);

      toast.success(result.message || "Profile updated successfully!");
      reset();
    } catch (error: any) {
      const errorMsg =
        error?.message || "Unexpected error while editing your profile.";
      toast.error(errorMsg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-1">
      <CustomInput
        {...register("username")}
        label="Username"
        errorMessage={errors.username?.message}
        value={usernameValue}
        disabled={isLoading || enabled}
      />

      <CustomInput
        {...register("email")}
        label="Email"
        errorMessage={errors.email?.message}
        value={emailValue}
        disabled={isLoading || enabled}
      />

      <CustomTextarea
        {...register("bio")}
        label="Bio"
        errorMessage={errors.bio?.message}
        value={bioValue}
        disabled={isLoading || enabled}
      />

      <div className="flex gap-2 justify-end">
        <ButtonForm
          onClick={() => reset()}
          variant="secondary"
          sizes="sm"
          disabled={isLoading || enabled}
          type="button"
        >
          CANCEL
        </ButtonForm>
        <ButtonForm
          disabled={isLoading || enabled}
          sizes="sm"
          type="submit"
          variant="gradient"
        >
          {isLoading ? "SENDING..." : "SEND"}
        </ButtonForm>
      </div>
    </form>
  );
}
