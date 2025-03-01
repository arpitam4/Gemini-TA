import React, { useContext } from "react";
import Sidebar from "./components/Sidebar";
import Chat from "./components/Chat";
import { Context } from "./context/Context";
import "./App.css";

const App = () => {
  const { chats, selectedChat, setSelectedChat, createNewChat, deleteChat } = useContext(Context);

  const handleNewChat = () => {
    // Create a new chat with empty link
    createNewChat("");
  };

  return (
    <div className="app">
      <Sidebar 
        chats={chats} 
        onNewChat={handleNewChat} 
        onSelectChat={setSelectedChat}
        selectedChat={selectedChat}
        onDeleteChat={deleteChat}
      />
      <Chat />
    </div>
  );
};

export default App;