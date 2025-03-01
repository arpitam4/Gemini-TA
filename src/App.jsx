import React from 'react';
import './App.css';
import ChatComponent from './components/chatcomponent';
function App() {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  console.log(apiKey); 

  return (
    <>

      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      <ChatComponent />
    </>
  );
}

export default App;