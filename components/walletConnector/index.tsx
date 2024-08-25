"use client";
 
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import './walletConnector.css' 
export default function WalletConnector() {
  return (
    <WalletMultiButton className="bg-red-500"/>
  );
}