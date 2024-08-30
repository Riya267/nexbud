import { Connection, PublicKey, LAMPORTS_PER_SOL, Transaction, SystemProgram } from "@solana/web3.js";
import { WalletAdapter } from "@solana/wallet-adapter-base";
import toast from "react-hot-toast";

export default class SolanaWalletHelper {
  private wallet: WalletAdapter;
  private connection: Connection;

  constructor(wallet: WalletAdapter, connection: Connection) {
    this.wallet = wallet;
    this.connection = connection;
  }

  public getPublicKey(): PublicKey | null {
    if (this.wallet.connected) {
      console.log("publickey", this.wallet.publicKey)
      return this.wallet.publicKey ?? null;
    }
    toast("Please Connect Your Wallet", {
      icon: '🌐',
      style: {
        borderRadius: '10px',
        background: '#313042',
        color: '#ffffff',
      },
    })
    return null;
  }

  public async getWalletBalance(): Promise<number | null> {
    if (this.wallet.connected && this.wallet.publicKey) {
      try {
        const balance = await this.connection.getBalance(this.wallet.publicKey);
        return balance / LAMPORTS_PER_SOL;
      } catch (error) {
        console.error("Failed to get wallet balance:", error);
        return null;
      }
    }
    return null;
  }

  public async sendCrypto({
    destinationAddress,
    amount}: { destinationAddress: string; amount: number}
  ): Promise<string | null> {
    console.log("sendCrypto", destinationAddress, amount);
    try {
      if (!this.wallet.publicKey || !this.wallet.connected) {
        throw new Error("Wallet not connected");
      }

      const transaction = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: this.wallet.publicKey,
          toPubkey: new PublicKey(destinationAddress),
          lamports: amount * LAMPORTS_PER_SOL,
        })
      );

      console.log("Sending transaction:", transaction);
      const signature = await this.wallet.sendTransaction(transaction, this.connection);
      console.log("Transaction sent, awaiting confirmation:", signature);

      const confirmation = await this.connection.confirmTransaction(signature, "processed");
      console.log("Transaction confirmation:", confirmation);
      
      return signature;
    } catch (error) {
      console.error("Failed to send transaction:", error);
      return null;
    }
  }
}