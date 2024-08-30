import Sidebar from "@/components/sidebar";
import AppWalletProvider from "@/components/AppWalletProvider";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AppWalletProvider>
      <div className="flex font-nunitoSans">
        <Sidebar />
        {children}
      </div>
    </AppWalletProvider>
  );
}
