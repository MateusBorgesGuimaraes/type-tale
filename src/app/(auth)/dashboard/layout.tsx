import Sidebar from "@/components/ui/sidebar/sidebar";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative min-h-screen flex">
      <Sidebar />
      <div className="flex-1 md:ml-[68px]">
        <main className="py-6">{children}</main>
      </div>
    </div>
  );
}
