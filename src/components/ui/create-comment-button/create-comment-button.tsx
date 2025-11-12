import { Dispatch, SetStateAction } from "react";

type CreateCommentButtonProps = {
  children: React.ReactNode;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
};

export default function CreateCommentButton({
  children,
  setIsOpen,
}: CreateCommentButtonProps) {
  return (
    <button
      className="py-3 px-4 flex gap-1  text-gray-500 dark:text-gray-300  bg-gray-200 dark:bg-gray-600 rounded-lg font-semibold cursor-pointer  hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-400 dark:hover:text-gray-400 transition"
      onClick={() => setIsOpen(true)}
    >
      {children}
    </button>
  );
}
