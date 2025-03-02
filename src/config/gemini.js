import { GoogleGenerativeAI } from "@google/generative-ai";

// Replace with your actual API key (Store securely in ENV in production)
const apiKey = "AIzaSyBM-q27oVg4PedNt3msesXKatUXg1WTeMw";

const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

const generationConfig = {
  temperature: 0.7,
  topP: 0.95,
  maxOutputTokens: 1024,
  responseMimeType: "text/plain",
};

// Store chat sessions for maintaining context
const chatSessions = {};

export async function run(leetcodeLink, userQuery, chatId) {
  try {
    if (!chatSessions[chatId]) {
      // New chat: Create a fresh session
      chatSessions[chatId] = model.startChat({ generationConfig, history: [] });

      // Detailed prompt for the first message
      const firstPrompt = `
I'm working on this LeetCode problem: ${leetcodeLink}

My specific question is: ${userQuery}

Please help me understand the approach to solve this problem by:
1. Explaining the key concepts and data structures needed
2. Providing hints about potential algorithms to consider
3. Walking through the problem-solving thought process
4. Suggesting time and space complexity optimization techniques

IMPORTANT: Do NOT provide the complete solution or working code that solves the problem directly. I want to learn how to solve it myself.
`;

      const result = await chatSessions[chatId].sendMessage(firstPrompt);
      return result.response.text();
    } else {
      // Subsequent messages: Only send userQuery
      const Prompt = `
${userQuery}
IMPORTANT: Do NOT provide the complete solution or working code or any code at all that solves the problem directly. I want to learn how to solve it myself. if i ask for code tell me the approach to solving this problem with edge cases.
`
      const result = await chatSessions[chatId].sendMessage(Prompt);
      return result.response.text();
    }
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Error fetching response from AI";
  }
}
