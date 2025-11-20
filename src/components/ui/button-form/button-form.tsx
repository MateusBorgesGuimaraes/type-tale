export type ButtonFormProps = {
  children: React.ReactNode;
  disabled: boolean;
  sizes?: "sm" | "md";
  variant?: "primary" | "secondary" | "danger" | "gradient";
};

export function ButtonForm({
  children,
  variant = "primary",
  sizes = "md",
  disabled = false,
  ...rest
}: ButtonFormProps & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const classNames = rest.className;
  const buttonSizes = {
    sm: "text-base py-2 px-6",
    md: "text-xl py-2 px-12",
  };
  const variants = {
    primary: "text-white bg-blue-500 hover:opacity-85",
    secondary: "border border-gray-500 text-gray-500 hover:opacity-85",
    gradient:
      "bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:shadow-lg disabled:opacity-50",
    danger: "text-white bg-red-500 hover:opacity-85",
  };

  return (
    <button
      disabled={disabled}
      type="submit"
      {...rest}
      className={`uppercase cursor-pointer rounded-lg font-medium transition ${variants[variant]} ${buttonSizes[sizes]} ${classNames}`}
    >
      {children}
    </button>
  );
}
