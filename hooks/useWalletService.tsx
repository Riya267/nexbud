import { registerTool } from "@/utils/toolMapping";
import WalletService from "@/services/walletService";
import { WalletHelperHookProps } from "@/types";
import { useWallet } from "@solana/wallet-adapter-react";
import { Connection, clusterApiUrl } from "@solana/web3.js";
import { useEffect, useMemo } from "react";

export const useWalletService = (): WalletHelperHookProps => {
  const wallet = useWallet() as any;
  const connection = useMemo(() => new Connection(clusterApiUrl("devnet")), []);

  const walletHelper = useMemo(() => {
    if(wallet.connected){
      return new WalletService(wallet, connection);
    }
  }, [wallet, connection]);

  useEffect(() => {
    if( walletHelper){
      registerTool(
        "web_wallet_get_public_key_tool",
        walletHelper.getPublicKey.bind(walletHelper),
        "PublicKey"
      );
      registerTool(
        "web_wallet_show_balance_tool",
        walletHelper.getWalletBalance.bind(walletHelper),
        "WalletBalance"
      );
      registerTool(
        "web_wallet_send_money_tool",
        walletHelper.sendCrypto.bind(walletHelper),
        "Signature"
      );
    }
  }, [walletHelper]);

  return {
    wallet,
    connection,
    walletHelper,
  };
};
