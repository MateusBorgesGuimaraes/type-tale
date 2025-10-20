export function ModalActionButton({
  icon: Icon,
  label,
}: {
  icon: any;
  label: string;
}) {
  return (
    <div className="px-4 py-2.5 hover:bg-gray-300 transition bg-gray-100">
      <button className="flex gap-4 items-center cursor-pointer w-full">
        <Icon className="text-gray-700" />
        <p className="font-medium text-gray-700 text-base">{label}</p>
      </button>
    </div>
  );
}
