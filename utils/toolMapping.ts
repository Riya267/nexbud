import sendEmail from "../services/sendEmail";

export const toolMapping: { tool: string; function: Function, context?: string }[] = [];

export const registerTool = (toolName: string, toolFunction: Function, context?: string): void => {
  toolMapping.push({ tool: toolName, function: toolFunction, context });
};

registerTool("send_notification_email_tool", sendEmail);