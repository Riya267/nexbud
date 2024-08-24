import Sidebar from "@/components/sidebar";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const loggedIn = true
  return (
    <div className="flex font-nunitoSans">
       <Sidebar />
      {children}
    </div>
  );
}
