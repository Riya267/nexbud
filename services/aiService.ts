import toast from "react-hot-toast";

export const sendQueryToAIAgent = async (query: string): Promise<any> => {
    try {
        const apiUrl = process.env.AI_MODAL_API_URL;
        if (!apiUrl) {
            throw new Error("API URL is not defined in environment variables.");
        }

        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ query }),
        });

        if (!response.ok) {
            throw new Error(`Error in API call: ${response.statusText}`);
        }

        const data = await response.json();
        return data;

    } catch (error) {
        console.error("Error in sendQueryToAIAgent:", error);
        toast("Not Connected to AI Modal", {
            icon: '👎🏻',
            style: {
              borderRadius: '10px',
              background: '#ab210a',
              color: '#ffffff',
            },
          });
        return null;
    }
};
