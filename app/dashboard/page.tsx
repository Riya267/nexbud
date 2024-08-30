import ChatInterface from "@/components/chat";
import WalletConnector from "@/components/walletConnector";

export default function Home() {
  return (
    <main className="flex min-h-screen bg-white w-full">
      <div className="flex fixed right-5 top-5 rounded-full">
        <WalletConnector />
      </div>
      <ChatInterface />
    </main>
  );
}
