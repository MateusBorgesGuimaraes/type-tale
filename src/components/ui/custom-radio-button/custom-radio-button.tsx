import { ErrorForm } from "../error-form/error-form";

type Option = {
  value: string;
  label: string;
};

type CustomRadioGroupProps = {
  label: string;
  errorMessage?: string;
  required?: boolean;
  options: readonly Option[] | Option[];
  orientation?: "horizontal" | "vertical";
  // Adicione esta prop para aceitar boolean
  valueAsBoolean?: boolean;
};

export function CustomRadioGroup({
  label,
  errorMessage,
  required,
  options,
  orientation = "horizontal",
  value,
  name,
  onChange,
  valueAsBoolean = false,
  ...rest
}: CustomRadioGroupProps &
  Omit<React.InputHTMLAttributes<HTMLInputElement>, "type">) {
  // Converte o valor para string se for boolean
  const controlledValue = valueAsBoolean ? String(value ?? "") : (value ?? "");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!onChange) return;

    if (valueAsBoolean) {
      // Converte string para boolean e chama onChange diretamente
      const boolValue = e.target.value === "true";
      onChange(boolValue as any);
    } else {
      onChange(e);
    }
  };

  return (
    <div className="w-full flex flex-col gap-1 group">
      <label className="uppercase font-medium text-sm text-gray-500 dark:text-gray-100 transition-colors group-focus-within:text-gray-800">
        {required && <span className="mr-1 text-red-500">*</span>}
        {label}
      </label>
      <div
        className={`
          flex gap-4
          ${orientation === "vertical" ? "flex-col" : "flex-row flex-wrap"}
        `}
      >
        {options.map((option) => {
          const radioId = `${name}-${option.value}`;
          const isChecked = controlledValue === option.value;

          return (
            <label
              key={option.value}
              htmlFor={radioId}
              className="flex items-center gap-2 cursor-pointer group/radio"
            >
              <div className="relative flex items-center justify-center">
                <input
                  type="radio"
                  id={radioId}
                  name={name}
                  value={option.value}
                  checked={isChecked}
                  onChange={handleChange}
                  className="sr-only peer"
                  {...rest}
                />
                <div
                  className={`
                    w-5 h-5 rounded-full border-2 transition-all duration-200
                    flex items-center justify-center
                    ${
                      isChecked
                        ? "border-blue-600 dark:border-cyan-600"
                        : "border-gray-300"
                    }
                  `}
                >
                  {isChecked && (
                    <div className="w-2.5 h-2.5 rounded-full bg-blue-600 dark:bg-cyan-600 transition-all duration-200" />
                  )}
                </div>
              </div>
              <span className="text-sm text-gray-950 dark:text-gray-100 select-none">
                {option.label}
              </span>
            </label>
          );
        })}
      </div>
      <div className="min-h-[1rem]">
        {errorMessage && <ErrorForm errorMessage={errorMessage} />}
      </div>
    </div>
  );
}
