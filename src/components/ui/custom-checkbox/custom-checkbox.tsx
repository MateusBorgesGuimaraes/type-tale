type CustomCheckboxProps = {
  checked: boolean;
  onChangeAction: () => void;
  isChecked?: boolean;
};

export default function CustomCheckbox({
  checked,
  onChangeAction,
  isChecked = false,
}: CustomCheckboxProps) {
  return (
    <label className="flex items-center cursor-pointer group">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChangeAction}
        className="sr-only peer"
      />
      <div
        className={`w-5 h-5 border-2 rounded flex items-center justify-center transition-all ${
          isChecked
            ? "border-red-500 bg-white group-hover:bg-red-50"
            : "border-green-600 bg-green-600 group-hover:bg-green-500"
        }`}
      >
        {!isChecked && (
          <svg
            className="w-3 h-3 text-white"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="3"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M5 13l4 4L19 7"></path>
          </svg>
        )}
      </div>
    </label>
  );
}
