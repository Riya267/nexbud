'use client';

import Sidebar from "@/components/sidebar";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { data: session } = useSession();
  const router = useRouter();
  if(!session?.user) {
    router.push("/")
  }

  return (
    <div className="flex font-nunitoSans">
       <Sidebar />
      {children}
    </div>
  );
}
