"use client";

import Link from "next/link";
import { ButtonForm } from "../button-form/button-form";
import CustomInput from "../custom-input/custom-input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginFormData, loginSchema } from "@/schemas/auth";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/use-auth";
import { useState } from "react";
import { loginAction } from "@/actions/auth";

export default function LoginForm() {
  const router = useRouter();
  const { setUser } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const emailValue = watch("email");
  const passwordValue = watch("password");

  const onSubmit = async (data: LoginFormData) => {
    try {
      setIsLoading(true);
      setErrorMessage("");

      const result = await loginAction(data);

      if (!result.success) {
        const message = Array.isArray(result.error)
          ? result.error.join(", ")
          : result.error || "Erro ao fazer login";

        setErrorMessage(message);
        return;
      }

      if (result.data.user) {
        setUser(result.data.user);
      } else {
        console.warn(
          "Login bem-sucedido mas perfil do usuário não foi carregado",
        );
      }

      router.push("/");
      router.refresh();
    } catch (error) {
      console.error("Erro capturado no catch:", error);
      setErrorMessage("Erro inesperado ao fazer login");
    } finally {
      setIsLoading(false);
    }
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
        disabled={isLoading}
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
        disabled={isLoading}
      />
      <div className="flex flex-col gap-2">
        <ButtonForm disabled={isLoading}>
          {isLoading ? "ENTRANDO..." : "LOGIN"}
        </ButtonForm>
        <Link
          href={"/register"}
          className="text-sm text-gray-400 underline hover:text-blue-700 transition"
        >
          Don't have an account yet? Sign up now.
        </Link>
      </div>
    </form>
  );
}
