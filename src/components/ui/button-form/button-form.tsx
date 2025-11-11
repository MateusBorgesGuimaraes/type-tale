import { ButtonHTMLAttributes } from "react";

export type ButtonFormProps = {
  children: React.ReactNode;
  disabled: boolean;
  sizes?: "sm" | "md";
  variant?: "primary" | "secondary";
};

export function ButtonForm({
  children,
  variant = "primary",
  sizes = "md",
  disabled = false,
  ...rest
}: ButtonFormProps & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const buttonSizes = {
    sm: "text-base py-2 px-6",
    md: "text-xl py-2 px-12",
  };
  const variants = {
    primary: "text-white bg-blue-500",
    secondary: "border border-gray-500 text-gray-500",
  };

  return (
    <button
      disabled={disabled}
      type="submit"
      {...rest}
      className={`uppercase cursor-pointer rounded-sm hover:opacity-85 font-medium transition ${variants[variant]} ${buttonSizes[sizes]}`}
    >
      {children}
    </button>
  );
}
