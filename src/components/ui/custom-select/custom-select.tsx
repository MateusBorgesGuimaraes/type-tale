import { ChevronDown } from "lucide-react";
import { ErrorForm } from "../error-form/error-form";

type Option = {
  value: string;
  label: string;
};

type CustomSelectProps = {
  label: string;
  errorMessage?: string;
  required?: boolean;
  options: readonly Option[] | Option[];
  placeholder?: string;
};

export function CustomSelect({
  label,
  errorMessage,
  required,
  options,
  placeholder = "Select an option",
  value,
  ...rest
}: CustomSelectProps & React.SelectHTMLAttributes<HTMLSelectElement>) {
  const selectId = rest.name || label;
  const controlledValue = value ?? "";

  return (
    <div className="w-full flex flex-col gap-1 group">
      <label
        htmlFor={selectId}
        className="uppercase font-medium text-sm text-gray-500 dark:text-gray-100 transition-colors group-focus-within:text-gray-800"
      >
        {required && <span className="mr-1 text-red-500">*</span>}
        {label}
      </label>
      <div className="relative">
        <select
          id={selectId}
          value={controlledValue}
          className={`
            w-full border border-gray-300 h-10 rounded-md px-3 pr-10
            bg-white
            dark:text-gray-950
            outline-none transition-all duration-200 ease-in-out
            hover:border-gray-400
            dark:hover:border-cyan-400
            focus:border-gray-600
            dark:focus:border-cyan-600
            focus:bg-gray-50
            dark:focus:bg-cyan-50
            appearance-none cursor-pointer
            ${errorMessage ? "border-red-500" : ""}
            ${!controlledValue ? "text-gray-400" : ""}
          `}
          {...rest}
        >
          <option value="" disabled>
            {placeholder}
          </option>
          {options.map((option) => (
            <option
              key={option.value}
              value={option.value}
              className="text-gray-950"
            >
              {option.label}
            </option>
          ))}
        </select>
        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
          <ChevronDown size={16} />
        </div>
      </div>
      <div className="min-h-[1rem]">
        {errorMessage && <ErrorForm errorMessage={errorMessage} />}
      </div>
    </div>
  );
}
