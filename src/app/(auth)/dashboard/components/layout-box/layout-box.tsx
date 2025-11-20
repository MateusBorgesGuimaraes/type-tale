type LayoutBoxProps = {
  children: React.ReactNode;
};

export default function LayoutBox({ children }: LayoutBoxProps) {
  return (
    <section className="sx:border border-gray-200 dark:border-gray-700 rounded-xl sx:p-6">
      {children}
    </section>
  );
}
