import { ToolAction } from "./types";

export const aiResponse1: ToolAction[] = [
  {
    tool: "web_wallet_get_public_key_tool",
    description: "get your public key",
    arguments: null,
  },
  {
    tool: "notify_user_onchat_tool",
    description: "Notify the user via chat",
    arguments: {
      message: "This is your public key: ",
    },
  },
];

export const aiResponse2: ToolAction[] = [
  {
    tool: "web_wallet_show_balance_tool",
    description: "show current wallet balance",
    arguments: null,
  },
  {
    tool: "notify_user_onchat_tool",
    description: "Notify the user via chat",
    arguments: {
      message: "Your Wallet Balance is: ",
    },
  },
];

export const aiResponse3: ToolAction[] = [
  {
    tool: "web_wallet_get_public_key_tool",
    description: "get your public key",
    arguments: null,
  },
  {
    tool: "web_wallet_show_balance_tool",
    description: "show current wallet balance",
    arguments: null,
  },
  {
    tool: "notify_user_onchat_tool",
    description: "Notify the user via chat",
    arguments: {
      message: "This is your Public key and Wallet Balance: ",
    },
  },
];

export const aiResponse4: ToolAction[] = [
  {
    tool: "web_wallet_get_public_key_tool",
    description: "get your public key",
    arguments: null,
  },
  {
    tool: "web_wallet_send_money_tool",
    description: "send money to an public key xxx",
    arguments: {
      destinationAddress: "9myvTPsg7xWpE1Fx2adtWaxVdQEK621aNjfHGcZELeQB",
      amount: 2,
    },
  },
  {
    tool: "notify_user_onchat_tool",
    description: "Notify the user via chat",
    arguments: {
      message: "Successful Transaction! This is the transaction signature:",
    },
  },
];
