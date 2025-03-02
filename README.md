# Gemini-TA

## Overview
Gemini-TA is a Teaching Assistant chatbot designed to help users understand **Data Structures & Algorithms (DSA) problems** from LeetCode. It provides **hints, thought processes, and optimization techniques** without giving direct solutions, encouraging problem-solving skills.

This project is built using **Vite + React (frontend), Node.js (backend), and the Google Gemini API** for AI-powered responses.

---

## 📑 Table of Contents
- [🎥 Demo Video & Features](#-demo-video--features)
- [⚙️ Setup Instructions](#%EF%B8%8F-setup-instructions)
- [🛠️ Architecture Overview](#%EF%B8%8F-architecture-overview)
- [🚀 How to Use](#-how-to-use)
- [🤖 GPT Integration Details](#-gpt-integration-details)

---

## 🎥 Demo Video & Features

### 🔹 DEMO:

https://github.com/user-attachments/assets/9828ca72-0f71-4a47-af96-e3fbd15f3e7d



### 🔹 Key Features:
✔️ **Chat-based interface** for asking doubts about LeetCode problems.

✔️ **Saves chat history** per LeetCode problem.

✔️ **Locks problem link** after first message in a chat.

✔️ **Formats AI responses** (bold, italic for better readability).

✔️ **Provides hints & thought process**, not direct solutions.

✔️ **Fast & lightweight** using Vite & React.

---

## ⚙️ Setup Instructions

### Prerequisites
- **Node.js** (v16+ recommended)
- **npm** or **yarn** installed
- A **Google Gemini API key**

### 🔧 Installation Steps
1. Clone the repository:
   ```sh
   git clone https://github.com/yourusername/Gemini-TA.git
   cd Gemini-TA
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Create an **.env** file and add your **Google Gemini API key**:
   ```env
   VITE_GEMINI_API_KEY=your_api_key_here
   ```
4. Start the application:
   ```sh
   npm run dev
   ```

Your app will be running at `http://localhost:5173` 🚀

---

## 🛠️ Architecture Overview
### **Tech Stack:**
- **Frontend:** Vite + React
- **Backend:** Node.js
- **AI Integration:** Google Gemini API
- **State Management:** React Context API

### **Component Breakdown:**
1. **Sidebar** → Handles chat selection and creation.
2. **Chat Interface** → Displays messages and input fields.
3. **API Handler** → Communicates with Gemini API.

**Data Flow:**
1. **User enters LeetCode link + query.**
2. **AI processes query** and provides hints.
3. **Messages are stored per chat.**

---

## 🚀 How to Use
1. **Start a new chat** by clicking **+ New Chat**.
2. **Enter a LeetCode problem link** and your query.
3. **Receive AI hints & suggestions** to approach the problem.
4. **Ask follow-up questions** (without re-entering the link).
5. **Revisit old chats** for reference.

🔹 *Note:* Once a LeetCode problem is entered, the link **locks** for that chat.

---

## 🤖 Gemini Integration Details
We use **Google Gemini API** to process user queries. The API:
- **Understands DSA concepts** and problem-solving approaches.
- **Generates hints, key concepts, and thought processes.**
- **Formats responses** (bold & italics) for clarity.
- **Maintains chat history** to give contextual answers.

### 🔹 API Request Flow:
1. **First Query:** Sends problem link + structured hints request.
2. **Follow-up Messages:** Sends only the user’s new question.
3. **AI Response Processing:** Formats markdown to **bold/italic text.**


