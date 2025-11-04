import { XIcon } from "lucide-react";
import { ErrorForm } from "../error-form/error-form";

type CustomInputProps = {
  label: string;
  errorMessage?: string;
  required?: boolean;
  type?: "text" | "email" | "password";
  showClearButton?: boolean;
  onClear?: () => void;
};

export default function CustomInput({
  label,
  errorMessage,
  required,
  type = "text",
  showClearButton = false,
  onClear,
  value,
  ...rest
}: CustomInputProps & React.InputHTMLAttributes<HTMLInputElement>) {
  const inputId = rest.name || label;
  const controlledValue = value ?? "";
  const hasValue = String(controlledValue).length > 0;

  const handleClear = () => {
    if (onClear) {
      onClear();
    }
  };

  return (
    <div className="w-full flex flex-col gap-1 group">
      <label
        htmlFor={inputId}
        className="uppercase font-medium text-sm text-gray-500 dark:text-gray-100 dark:sx:text-gray-900 transition-colors group-focus-within:text-gray-800 "
      >
        {required && <span className="mr-1 text-red-500">*</span>}
        {label}
      </label>
      <div className="relative">
        <input
          id={inputId}
          type={type}
          value={controlledValue}
          className={`
            w-full border border-gray-300  h-10 rounded-md px-3
            ${showClearButton && hasValue ? "pr-10" : ""}
            bg-white
            dark:text-gray-950
            outline-none transition-all duration-200 ease-in-out
            hover:border-gray-400
            dark:hover:border-cyan-400
            focus:border-gray-600
            dark:focus:border-cyan-600
            focus:bg-gray-50
            dark:focus:bg-cyan-50-50
            ${errorMessage ? "border-red-500" : ""}
          `}
          {...rest}
        />
        {showClearButton && hasValue && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-full hover:bg-gray-200 cursor-pointer"
            aria-label="Limpar campo"
          >
            <XIcon size={16} />
          </button>
        )}
      </div>
      <div className="min-h-[1rem]">
        {errorMessage && <ErrorForm errorMessage={errorMessage} />}
      </div>
    </div>
  );
}
