export type ButtonFormProps = {
  children: React.ReactNode;
  disabled: boolean;
  variant?: "primary" | "secondary";
};

export function ButtonForm({
  children,
  variant = "primary",
  disabled = false,
}: ButtonFormProps) {
  const variants = {
    primary: "text-white bg-blue-500",
    secondary: "border border-gray-500 text-gray-500",
  };
  return (
    <button
      disabled={disabled}
      type="submit"
      className={`text-xl uppercase py-2 px-12 cursor-pointer rounded-sm hover:opacity-85 font-medium transition ${variants[variant]}`}
    >
      {children}
    </button>
  );
}
