export interface MessageProp {
    text: string;
    sender: 'user' | 'bot';
}

export interface MessagesProps {
    messages: MessageProps[];
    loading: boolean;
}

export interface QuickChatsProps {
    onQuickChatSelect: (chat: MessageProp) => void;
}

export interface ChatInputProps {
    onSendMessage: (message: MessageProp) => void;
}

export type ToolAction = {
    tool: string;
    description: string;
    arguments: null | { 
        destinationAddress?: string; 
        amount?: number; 
        message?: string; 
    };
};

export interface EmailTemplateProps {
    message: string
}

export interface WalletHelperHookProps {
    wallet: WalletAdapter;
    connection: Connection;
    walletHelper: SolanaWalletHelper | null;
}