type IconTextProps = {
  icon: React.ReactNode;
  text: string;
};

export default function IconText({ icon, text }: IconTextProps) {
  return (
    <div className="flex gap-2 items-center whitespace-nowrap">
      {icon}
      <p className="md:text-base text-sm font-medium text-gray-900 dark:text-gray-50">
        {text}
      </p>
    </div>
  );
}
