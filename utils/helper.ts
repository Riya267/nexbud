import { aiResponse1, aiResponse2, aiResponse3, aiResponse4, aiResponse5 } from "@/output";

export const scrollToBottom = (id: string) => {
  const container = document.getElementById(id)!;
  container.scrollTop = container.scrollHeight;
};

export const sendQueryToAIAgent = (query: string, messageLength: number) => {
    try {

      if (messageLength === 1) {
        // First response
        return aiResponse1;
      } else if (messageLength === 2) {
        // Second response
        return aiResponse2;
      } else if (messageLength === 3) {
        // Third response
        return aiResponse3;
      } else if (messageLength === 4) {
        // Fourth response
        return aiResponse4;
      } else if (messageLength === 5) {
        // Fourth response
        return aiResponse5;
      } else {
        // After 4 calls, return null
        return null;
      }
    } catch (error) {
      console.error("Error in callAIAgent:", error);
      return null;
    }
  };
