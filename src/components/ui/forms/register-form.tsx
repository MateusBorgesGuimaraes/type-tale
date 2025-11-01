"use client";

import Link from "next/link";
import { ButtonForm } from "../button-form/button-form";
import CustomInput from "../custom-input/custom-input";
import { useForm } from "react-hook-form";
import { RegisterFormData, registerSchema } from "@/schemas/auth";
import { zodResolver } from "@hookform/resolvers/zod";

export default function RegisterForm() {
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

  const onSubmit = (data: RegisterFormData) => {
    console.log("Dados do formulario de registro:", data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-1">
      <CustomInput
        {...register("email")}
        label="email"
        type="email"
        required
        errorMessage={errors.email?.message}
        showClearButton={true}
        value={emailValue}
        onClear={() => setValue("email", "")}
      />
      <CustomInput
        {...register("username")}
        label="username"
        type="text"
        required
        errorMessage={errors.username?.message}
        showClearButton={true}
        value={usernameValue}
        onClear={() => setValue("username", "")}
      />
      <CustomInput
        required
        {...register("password")}
        label="password"
        type="password"
        errorMessage={errors.password?.message}
        showClearButton={true}
        value={passwordValue}
        onClear={() => setValue("password", "")}
      />
      <div className="flex flex-col gap-2">
        <ButtonForm>REGISTER</ButtonForm>
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
