import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useChat } from "../hook/useChat.js";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkBreaks from "remark-breaks";

const Dashboard = () => {
  const chat = useChat();
  const [chatInput, setChatInput] = useState("");

  const chats = useSelector((state) => state.chat.chats);
  const currentChatId = useSelector((state) => state.chat.currentChatId);

  useEffect(() => {
    chat.initializeSocketConnection();
    chat.handleGetChats();
  }, []);

  const handleSubmitMessage = (e) => {
    e.preventDefault();
    const trimmedMessage = chatInput.trim();
    if (!trimmedMessage) return;

    chat.handleSendMessage({ message: trimmedMessage, chatId: currentChatId });
    setChatInput("");
  };

  const openChat = (chatId) => {
    chat.handleOpenChat(chatId);
    currentChatId = chatId;
  };

  return (
    <div className="flex h-screen w-screen bg-[#070b09] text-gray-200 overflow-hidden font-sans p-4">
      {/* Container with frosted glass effect border */}
      <div className="flex w-full h-full border border-gray-800 rounded-3xl overflow-hidden bg-linear-to-br from-[#101815] to-[#040605] shadow-[0_0_50px_rgba(20,50,30,0.3)]">
        {/* Left Sidebar - App Icons */}
        <div className="w-16 flex flex-col items-center py-6 border-r border-[#1a231f] space-y-6 shrink-0">
          <div className="w-8 h-8 bg-[#0891b2] rounded flex justify-center items-center text-black font-bold mb-4 shadow-[0_0_15px_#0891b2]">
            T
          </div>
          {/* Nav Icons placeholders */}
          <div className="flex flex-col space-y-4 text-gray-500 flex-1">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="w-8 h-8 rounded-full border border-gray-700 flex justify-center items-center hover:text-[#0891b2] hover:border-[#0891b2] cursor-pointer transition"
              >
                <span className="text-xs">{i}</span>
              </div>
            ))}
          </div>
          <div className="flex flex-col space-y-4 text-gray-500">
            <div className="w-8 h-8 rounded-full border border-gray-700 flex justify-center items-center hover:text-white cursor-pointer transition">
              ⚙
            </div>
            <div className="w-8 h-8 rounded-full border border-gray-700 flex justify-center items-center hover:text-white cursor-pointer transition">
              ⍈
            </div>
          </div>
        </div>

        {/* Center Main Content */}
        <div className="flex-1 flex flex-col relative w-full overflow-hidden">
          {/* Top Navigation */}
          <div className="h-20 flex justify-between items-center px-8 shrink-0">
            {/* Tabs */}
            <div className="flex bg-[#0d1410] rounded-full p-1 border border-[#1a231f] overflow-x-auto hide-scrollbar">
              <button className="px-5 py-2 text-sm text-gray-400 hover:text-white transition whitespace-nowrap">
                Dashboard
              </button>
              <button className="px-5 py-2 text-sm bg-[#132218] border border-[#0891b2]/30 text-white rounded-full shadow-[0_0_10px_rgba(8,145,178,0.1)] whitespace-nowrap">
                AI Chat
              </button>
              <button className="px-5 py-2 text-sm text-gray-400 hover:text-white transition whitespace-nowrap">
                Help
              </button>
              <button className="px-5 py-2 text-sm text-gray-400 hover:text-white transition whitespace-nowrap">
                Account
              </button>
            </div>

            {/* User Controls */}
            <div className="flex items-center space-x-4 bg-[#0d1410] rounded-full p-2 border border-[#1a231f] shrink-0">
              <button className="w-8 h-8 rounded-full hover:bg-white/10 flex justify-center items-center text-gray-400">
                ☼
              </button>
              <button className="w-8 h-8 rounded-full hover:bg-white/10 flex justify-center items-center text-[#0891b2]">
                ☾
              </button>
              <button className="w-8 h-8 rounded-full hover:bg-white/10 flex justify-center items-center text-gray-400">
                💬
              </button>
              <button className="w-8 h-8 rounded-full hover:bg-white/10 flex justify-center items-center text-gray-400">
                🔔
              </button>
              <div className="w-8 h-8 rounded-full bg-gray-500 overflow-hidden ml-2 shrink-0">
                <img
                  src="https://ui-avatars.com/api/?name=User&background=random"
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* Chat Interface */}
          <div className="flex-1 flex flex-col items-center justify-center relative px-8 overflow-y-auto w-full">
            <div className="absolute top-4 left-6 bg-[#0d1410] border border-[#1a231f] rounded-full px-4 py-2 flex items-center space-x-2">
              <div className="w-4 h-4 bg-black border-2 border-[#0891b2] rounded-full shadow-[0_0_8px_#0891b2]"></div>
              <span className="text-sm">Chatterbox AI</span>
            </div>

            <button className="absolute top-4 right-6 w-10 h-10 border border-[#1a231f] rounded-full flex justify-center items-center text-gray-400 hover:text-white">
              ⋮
            </button>

            {/* Chat Data */}
            <div className="w-full max-w-3xl flex flex-col space-y-6 mb-8 mt-4 overflow-y-auto max-h-[60vh] px-4">
              {(chats[currentChatId]?.messages || []).map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.role === "user" ? "justify-end" : "justify-start items-start space-x-4"}`}
                >
                  {message.role === "AI" && (
                    <div className="w-8 h-8 rounded-full bg-cyan-600/20 border border-cyan-500/50 flex shrink-0 items-center justify-center mt-1 shadow-[0_0_10px_rgba(8,145,178,0.2)]">
                      <svg
                        className="w-4 h-4 text-cyan-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M13 10V3L4 14h7v7l9-11h-7z"
                        ></path>
                      </svg>
                    </div>
                  )}
                  <div
                    className={`${message.role === "user" ? "bg-zinc-800 bg-opacity-60 text-white px-5 py-3 rounded-2xl rounded-tr-sm max-w-[80%] border border-zinc-700/50 shadow-md backdrop-blur-sm" : "text-zinc-200 px-1 py-1 rounded-2xl max-w-[85%] w-full overflow-hidden"}`}
                  >
                    {message.role === "AI" ? (
                      <div className="prose prose-invert prose-zinc max-w-full prose-p:leading-relaxed prose-pre:bg-zinc-800 prose-pre:border prose-pre:border-zinc-700 mt-1">
                        <ReactMarkdown
                          remarkPlugins={[remarkGfm, remarkBreaks]}
                          components={{
                            h1: ({ children }) => (
                              <h1 className="text-xl font-bold mb-3">
                                {children}
                              </h1>
                            ),
                            h2: ({ children }) => (
                              <h2 className="text-lg font-semibold mb-2">
                                {children}
                              </h2>
                            ),
                            p: ({ children }) => (
                              <p className="mb-3 leading-relaxed">{children}</p>
                            ),
                            li: ({ children }) => (
                              <li className="ml-4 list-disc mb-1">
                                {children}
                              </li>
                            ),
                            code: ({ inline, children }) =>
                              inline ? (
                                <code className="bg-zinc-800 px-1 rounded">
                                  {children}
                                </code>
                              ) : (
                                <pre className="bg-zinc-800 p-3 rounded overflow-x-auto">
                                  <code>{children}</code>
                                </pre>
                              ),
                          }}
                        >
                          {message.content || ""}
                        </ReactMarkdown>
                      </div>
                    ) : (
                      <p className="text-[15px] leading-relaxed m-0">
                        {message.content}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Input Box */}
            <form
              onSubmit={handleSubmitMessage}
              className="w-full max-w-2xl bg-[#0a100d] border border-[#1d2924] rounded-2xl p-4 flex flex-col space-y-4 shadow-xl relative z-10 mx-auto"
            >
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder="Start your request, and let Orion handle everything."
                className="bg-transparent w-full text-white placeholder-gray-500 outline-none text-lg px-2 max-h-20 overflow-y-auto resize-none"
              />
              <div className="flex flex-wrap justify-between items-center pt-4 gap-4">
                <div className="flex flex-wrap space-x-3 gap-y-2">
                  <button
                    type="button"
                    className="w-10 h-10 rounded-full border border-[#1d2924] flex justify-center items-center text-gray-400 hover:text-white transition"
                  >
                    📎
                  </button>
                  <button
                    type="button"
                    className="px-4 py-2 border border-[#1d2924] rounded-full text-sm text-gray-300 flex items-center space-x-2 hover:bg-[#131d18] transition"
                  >
                    <span>💡</span> <span>Reasoning</span>
                  </button>
                  <button
                    type="button"
                    className="px-4 py-2 border border-[#1d2924] rounded-full text-sm text-gray-300 flex items-center space-x-2 hover:bg-[#131d18] transition"
                  >
                    <span>📊</span> <span>Deep Research</span>
                  </button>
                </div>
                <div className="flex items-center space-x-3 ml-auto">
                  <button
                    type="button"
                    className="w-10 h-10 rounded-full border border-[#1d2924] flex justify-center items-center text-gray-400 hover:text-white transition"
                  >
                    🎤
                  </button>
                  <button
                    type="submit"
                    className="w-10 h-10 rounded-full bg-linear-to-br from-[#0891b2] to-[#0891b2] flex justify-center items-center text-black hover:scale-105 transition shadow-[0_0_15px_rgba(8,145,178,0.4)]"
                  >
                    ➤
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>

        {/* Right Sidebar - Chat History */}
        <div className="w-80 border-l border-[#1a231f] bg-[#0d1410]/50 p-6 flex flex-col shrink-0">
          <div className="flex justify-between items-center mb-6 shrink-0">
            <h2 className="text-lg font-medium text-white">History Chat</h2>
            <button className="px-3 py-1.5 bg-[#131d18] text-white text-xs border border-[#1d2924] rounded-full hover:border-[#0891b2] transition">
              + New Chat
            </button>
          </div>

          <div className="flex-1 overflow-y-auto space-y-6 pr-2 custom-scrollbar">
            {/* Today */}
            <div>
              <p className="text-xs text-gray-500 mb-3 block">Today</p>
              <div className="space-y-2">
                {Object.values(chats).map((chat, index) => (
                  <div
                    onClick={() => {
                      openChat(chat.id);
                    }}
                    key={index}
                    className="flex items-center space-x-3 p-3 bg-[#0a100d] border border-[#1a231f] rounded-xl hover:border-[#0891b2]/50 cursor-pointer transition"
                  >
                    <span className="text-gray-500 text-sm shrink-0">💬</span>
                    <span className="text-sm text-gray-300 truncate w-full block">
                      {chat.title}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
