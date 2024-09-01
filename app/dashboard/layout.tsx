import Sidebar from "@/components/sidebar";
import WalletAdapterProvider from "@/context/WalletAdapterProvider";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <WalletAdapterProvider>
      <div className="flex font-nunitoSans">
        <Sidebar />
        {children}
      </div>
    </WalletAdapterProvider>
  );
}
