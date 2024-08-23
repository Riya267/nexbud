import ChatInterface from "@/components/chat";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen bg-white">
      <div className="fixed right-5 top-5 rounded-full">
        <Image 
          src={"/logo.png"}
          alt="Logo"
          width={80}
          height={50}
          objectFit="cover"
          className="rounded-full"
        />
      </div>
      <ChatInterface />
    </main>
  );
}
