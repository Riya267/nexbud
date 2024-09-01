import { Connection, PublicKey, LAMPORTS_PER_SOL, Transaction, SystemProgram } from "@solana/web3.js";
import { WalletAdapter } from "@solana/wallet-adapter-base";

export default class SolanaWalletHelper {
  private wallet: WalletAdapter;
  private connection: Connection;

  constructor(wallet: WalletAdapter, connection: Connection) {
    this.wallet = wallet;
    this.connection = connection;
  }

  public getPublicKey(): PublicKey | null {
    if (this.wallet.connected) {
      return this.wallet.publicKey ?? null;
    }
    return null;
  }

  public async getWalletBalance(): Promise<string | null> {
    if (this.wallet.connected && this.wallet.publicKey) {
      try {
        const balance = await this.connection.getBalance(this.wallet.publicKey);
        return `${balance / LAMPORTS_PER_SOL} SOL` ;
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

      const signature = await this.wallet.sendTransaction(transaction, this.connection);

      await this.connection.confirmTransaction(signature, "processed");
      
      return signature;
    } catch (error) {
      console.error("Failed to send transaction:", error);
      return null;
    }
  }
}