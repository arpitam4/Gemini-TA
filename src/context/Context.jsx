import { createContext, useState } from "react";
import { run } from "../config/gemini.js";

export const Context = createContext(null);

const ContextProvider = ({ children }) => {
  const [chats, setChats] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);

  // Extract problem name from LeetCode URL
  const extractProblemName = (url) => {
    if (!url || !url.includes("leetcode.com/problems/")) return "New Chat";
    try {
      const problemSlug = url.split("leetcode.com/problems/")[1].split("/")[0];
      return problemSlug.split("-").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
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
    e.stopPropagation();
    setChats(prev => prev.filter(chat => chat.id !== chatId));
    if (selectedChat === chatId) {
      const remainingChats = chats.filter(chat => chat.id !== chatId);
      setSelectedChat(remainingChats.length > 0 ? remainingChats[0].id : null);
    }
  };

  const onSent = async (link, query, chatId) => {
    const activeChatId = chatId || selectedChat || createNewChat(link);
    if (!activeChatId) return;

    const updatedChats = [...chats];
    const chatIndex = updatedChats.findIndex(chat => chat.id === activeChatId);
    if (chatIndex === -1) return;

    updatedChats[chatIndex].messages.push({ type: "user", text: query });
    setChats(updatedChats);

    const botResponse = await run(link, query, activeChatId);

    updatedChats[chatIndex].messages.push({ type: "bot", text: botResponse });
    setChats(updatedChats);

    if (updatedChats[chatIndex].messages.length === 2 && link && updatedChats[chatIndex].title === "New Chat") {
      updatedChats[chatIndex].title = extractProblemName(link);
      updatedChats[chatIndex].problemLink = link;
    }
  };

  return (
    <Context.Provider value={{ chats, selectedChat, setSelectedChat, createNewChat, deleteChat, onSent }}>
      {children}
    </Context.Provider>
  );
};

export default ContextProvider;
