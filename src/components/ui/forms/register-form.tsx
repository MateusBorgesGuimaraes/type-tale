"use client";

import Link from "next/link";
import { ButtonForm } from "../button-form/button-form";
import CustomInput from "../custom-input/custom-input";
import { useForm } from "react-hook-form";
import { RegisterFormData, registerSchema } from "@/schemas/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { registerAction } from "@/actions/auth";
import { useAuth } from "@/hooks/use-auth";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function RegisterForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();
  const { setUser } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  const usernameValue = watch("username");
  const emailValue = watch("email");
  const passwordValue = watch("password");

  const onSubmit = async (data: RegisterFormData) => {
    try {
      setIsLoading(true);
      setErrorMessage("");

      const result = await registerAction(data);

      if (!result.success) {
        setErrorMessage(result.error);
        toast.error(result.error);
        return;
      }

      if (result.data.user) {
        setUser(result.data.user);
        toast.success("User created successfully.");
      }

      router.push("/dashboard");
      router.refresh();
    } catch (error) {
      console.error(error);
      setErrorMessage("Unexpected error while creating account.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-1">
      <CustomInput
        {...register("email")}
        required
        disabled={isLoading}
        label="email"
        type="email"
        errorMessage={errors.email?.message}
        showClearButton={true}
        value={emailValue}
        onClear={() => setValue("email", "")}
      />
      <CustomInput
        {...register("username")}
        required
        disabled={isLoading}
        label="username"
        type="text"
        errorMessage={errors.username?.message}
        showClearButton={true}
        value={usernameValue}
        onClear={() => setValue("username", "")}
      />
      <CustomInput
        {...register("password")}
        required
        disabled={isLoading}
        label="password"
        type="password"
        errorMessage={errors.password?.message}
        showClearButton={true}
        value={passwordValue}
        onClear={() => setValue("password", "")}
      />
      <div className="flex flex-col gap-2">
        <ButtonForm disabled={isLoading}>
          {isLoading ? "ENTRANDO..." : "REGISTER"}
        </ButtonForm>
        <Link
          href={"/register"}
          className="text-sm text-gray-400 underline hover:text-blue-700 transition"
        >
          Do you already have an account? Log in now.
        </Link>
      </div>
    </form>
  );
}
