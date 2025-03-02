import React, { useState, useContext, useEffect } from "react";
import { Context } from "../context/Context.jsx";
import "./Chat.css";

const Chat = () => {
  const { chats, selectedChat, onSent } = useContext(Context);
  const [link, setLink] = useState("");
  const [doubt, setDoubt] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [currentMessages, setCurrentMessages] = useState([]);

  // Update displayed messages when selected chat changes
  useEffect(() => {
    if (!selectedChat || !chats || chats.length === 0) {
      setCurrentMessages([]);
      setLink("");
      return;
    }
    
    const currentChat = chats.find(chat => chat.id === selectedChat);
    if (currentChat) {
      setCurrentMessages(currentChat.messages || []);
      setLink(currentChat.problemLink || "");
    }
  }, [selectedChat, chats]);

  const formatMessage = (text) => {
    return text
      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>") // Convert **bold** to <strong>bold</strong>
      .replace(/\*(.*?)\*/g, "<em>$1</em>"); // Convert *italic* to <em>italic</em>
  };

  const handleSend = async () => {
    if (doubt.trim()) {
      setIsLoading(true);
      await onSent(link.trim(), doubt.trim(), selectedChat);
      setIsLoading(false);
      setDoubt("");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="main-chat">
      <div className="chat-header">
        {selectedChat ? (
          chats.find(chat => chat.id === selectedChat)?.title
        ) : (
          "Select or create a chat"
        )}
      </div>
      
      <div className="chat-box">
        {!selectedChat ? (
          <div className="empty-chat">
            <h3>Welcome to DSA Problem Assistant</h3>
            <p>Create a new chat or select an existing one to get started.</p>
          </div>
        ) : currentMessages.length === 0 ? (
          <div className="empty-chat">
            <h3>DSA Problem Assistant</h3>
            <p>Enter a LeetCode problem link and your specific question to get started.</p>
          </div>
        ) : (
          currentMessages.map((msg, index) => (
            <div key={index} className={`message-container ${msg.type}-container`}>
              <div className={`message ${msg.type}-message`}>
                {msg.type === "user" ? (
                  <div className="user-content">
                    <strong>You:</strong>
                    <pre>{msg.text}</pre>
                  </div>
                ) : (
                  <div className="bot-content">
                    <strong>DSA Assistant:</strong>
                    <div className="bot-text" dangerouslySetInnerHTML={{ __html: formatMessage(msg.text) }}></div>
                  </div>
                )}
              </div>
            </div>
          ))
        )}
        
        {isLoading && (
          <div className="loading-indicator">
            <span>Thinking...</span>
          </div>
        )}
      </div>

      <div className="chat-inputs">
        <input 
          type="text" 
          placeholder="Enter LeetCode problem link..." 
          value={link} 
          onChange={(e) => setLink(e.target.value)} 
          disabled={!selectedChat}
        />
        <textarea 
          placeholder={selectedChat ? "What specific help do you need with this problem?" : "Select or create a chat first"}
          value={doubt} 
          onChange={(e) => setDoubt(e.target.value)}
          onKeyPress={handleKeyPress}
          rows={2}
          disabled={!selectedChat}
        />
        <button 
          onClick={handleSend} 
          disabled={isLoading || !doubt.trim() || !selectedChat}
        >
          {isLoading ? "Thinking..." : "Send"}
        </button>
      </div>
    </div>
  );
};

export default Chat;