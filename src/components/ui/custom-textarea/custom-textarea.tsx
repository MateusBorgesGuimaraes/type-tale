import { XIcon } from "lucide-react";
import { ErrorForm } from "../error-form/error-form";

type CustomTextareaProps = {
  label: string;
  errorMessage?: string;
  required?: boolean;
};

export default function CustomTextarea({
  label,
  errorMessage,
  required,
  value,
  ...rest
}: CustomTextareaProps & React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  const textAreaId = rest.name || label;
  const controlledValue = value ?? "";

  return (
    <div className="w-full flex flex-col gap-1 group">
      <label
        htmlFor={textAreaId}
        className="uppercase font-medium text-sm text-gray-500 dark:text-gray-100  transition-colors group-focus-within:text-gray-800"
      >
        {required && <span className="mr-1 text-red-500">*</span>}
        {label}
      </label>
      <div className="relative">
        <textarea
          name={textAreaId}
          id={textAreaId}
          value={controlledValue}
          className={`
          w-full border border-gray-300  h-48 rounded-md p-3
          bg-white
          dark:bg-gray-300
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
        ></textarea>
      </div>
      <div className="min-h-[1rem]">
        {errorMessage && <ErrorForm errorMessage={errorMessage} />}
      </div>
    </div>
  );
}
