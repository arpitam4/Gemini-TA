import { createContext, useState } from "react";
import { run } from "../config/gemini.js";

export const Context = createContext(null);

const ContextProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);
  const [chats, setChats] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);

  // Extract problem name from LeetCode URL
  const extractProblemName = (url) => {
    if (!url || !url.includes("leetcode.com/problems/")) return "New Chat";
    
    try {
      // Extract the problem slug from the URL
      const problemSlug = url.split("leetcode.com/problems/")[1].split("/")[0];
      
      // Convert slug to title case (e.g., "add-two-numbers" -> "Add Two Numbers")
      return problemSlug
        .split("-")
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
    } catch (error) {
      console.error("Error extracting problem name:", error);
      return "New Chat";
    }
  };

  const createNewChat = (link = "") => {
    const chatTitle = link ? extractProblemName(link) : "New Chat";
    const newChat = { 
      id: Date.now(), 
      title: chatTitle, 
      messages: [],
      problemLink: link || ""
    };
    
    setChats(prev => [newChat, ...prev]);
    setSelectedChat(newChat.id);
    return newChat.id;
  };

  const deleteChat = (chatId, e) => {
    // Stop event propagation to prevent selecting the chat when deleting
    e.stopPropagation();
    
    // Remove the chat
    setChats(prev => prev.filter(chat => chat.id !== chatId));
    
    // If the deleted chat was selected, select another chat or nothing
    if (selectedChat === chatId) {
      const remainingChats = chats.filter(chat => chat.id !== chatId);
      if (remainingChats.length > 0) {
        setSelectedChat(remainingChats[0].id);
      } else {
        setSelectedChat(null);
      }
    }
  };

  const onSent = async (link, query, chatId) => {
    // If no chat is selected or provided, create a new one
    const activeChatId = chatId || selectedChat || createNewChat(link);
    
    if (!activeChatId) return;
    
    // Show user message with both link and query
    const userMessage = link ? `Problem: ${link}\n\nQuery: ${query}` : query;
    
    // Find the current chat
    const updatedChats = [...chats];
    const chatIndex = updatedChats.findIndex(chat => chat.id === activeChatId);
    
    if (chatIndex === -1) return;
    
    // Add user message to this chat's messages
    updatedChats[chatIndex].messages.push({ type: "user", text: userMessage });
    setChats(updatedChats);
    
    // Get AI response
    const botResponse = await run(link, query);
    
    // Update with AI response
    updatedChats[chatIndex].messages.push({ type: "bot", text: botResponse });
    setChats(updatedChats);
    
    // If this is the first message and we have a link, update the chat title
    if (updatedChats[chatIndex].messages.length <= 2 && link && updatedChats[chatIndex].title === "New Chat") {
      updatedChats[chatIndex].title = extractProblemName(link);
      updatedChats[chatIndex].problemLink = link;
    }
  };

  return (
    <Context.Provider value={{ 
      messages,
      chats, 
      selectedChat, 
      setSelectedChat,
      createNewChat,
      deleteChat,
      onSent 
    }}>
      {children}
    </Context.Provider>
  );
};

export default ContextProvider;