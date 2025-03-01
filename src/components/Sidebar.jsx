import React from "react";
import { FaPlus, FaCode } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import "./Sidebar.css";

const Sidebar = ({ chats, onNewChat, onSelectChat, selectedChat, onDeleteChat }) => {
  return (
    <div className="sidebar">
      <h2 className="sidebar-title">LeetCode Assistant</h2>
      <button className="new-chat-btn" onClick={onNewChat}>
        <FaPlus /> New Chat
      </button>
      <div className="chat-list-container">
        {chats.length === 0 ? (
          <p className="no-chats">No chats yet. Click "New Chat" to get started.</p>
        ) : (
          <ul className="chat-list">
            {chats.map(chat => (
              <li 
                key={chat.id} 
                onClick={() => onSelectChat(chat.id)}
                className={selectedChat === chat.id ? "selected" : ""}
              >
                <FaCode className="chat-icon" />
                <span className="chat-title">{chat.title}</span>
                <button 
                  className="delete-chat-btn" 
                  onClick={(e) => onDeleteChat(chat.id, e)}
                  aria-label="Delete chat"
                >
                  <MdDeleteOutline />
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Sidebar;