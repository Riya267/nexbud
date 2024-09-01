import { Connection, PublicKey, LAMPORTS_PER_SOL, Transaction, SystemProgram, ConfirmedSignatureInfo } from "@solana/web3.js";
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

  public async getTransactions({limit}: { limit: number}): Promise<string[] | string> {
    if (!this.wallet.publicKey) {
        console.error("Wallet address is required");
        return "";
    }
    try {
      const signatures = await this.connection.getSignaturesForAddress(this.wallet.publicKey, {
        limit: limit || 3
      });
      const transactions = await Promise.all(signatures.map(sig => sig.signature));
      if(transactions.length > 0) return transactions.map((tran, index) => `Transaction ${index + 1}: ${tran}\n`).join('');
      return "There are no transactions with current public key";
    } catch (error) {
        console.error("Failed to fetch transactions:", error);
        return "";
    }
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