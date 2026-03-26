"use client";

import { useState, useRef, useEffect, useTransition } from "react";
import {
  Send,
  Loader2,
  Bot,
  User,
  Sparkles,
  Trash2,
  Copy,
  Check,
} from "lucide-react";
import { sendAIMessage } from "./actions";

type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
};

const QUICK_PROMPTS = [
  "Ukrayna'da oturum izni türleri nelerdir?",
  "Türk vatandaşı Ukrayna'da nasıl şirket kurar?",
  "Ukrayna'da evlilik işlemleri için gerekli belgeler",
  "Oturum izni başvurusu reddedilirse ne yapılmalı?",
  "Ukrayna'da gayrimenkul alım süreci",
  "Çalışma izni başvuru prosedürü",
];

export default function AIChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isSending, startSend] = useTransition();
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = (text?: string) => {
    const msg = text || input.trim();
    if (!msg) return;

    const userMsg: Message = {
      id: crypto.randomUUID(),
      role: "user",
      content: msg,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");

    startSend(async () => {
      const result = await sendAIMessage(msg);
      const assistantMsg: Message = {
        id: crypto.randomUUID(),
        role: "assistant",
        content: result.success && result.reply ? result.reply : (result.error || "Bir hata oluştu."),
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, assistantMsg]);
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const clearChat = () => setMessages([]);

  return (
    <div className="flex flex-col h-[calc(100vh-220px)] min-h-[500px]">
      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto rounded-2xl bg-white border border-gray-200/80 p-4 space-y-4">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center px-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-100 to-indigo-100 
              flex items-center justify-center mb-4">
              <Bot className="w-8 h-8 text-purple-600" />
            </div>
            <h3 className="text-lg font-bold text-gray-800 mb-1">Lviv Avukat AI Asistanı</h3>
            <p className="text-sm text-gray-500 mb-6 max-w-md">
              Ukrayna hukuku, oturum izni, evlilik, şirket kurma ve daha fazlası hakkında sorularınızı yanıtlayabilirim.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 w-full max-w-lg">
              {QUICK_PROMPTS.map((prompt) => (
                <button
                  key={prompt}
                  onClick={() => sendMessage(prompt)}
                  disabled={isSending}
                  className="text-left px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 
                    text-sm text-gray-700 hover:bg-gray-100 hover:border-gray-300 transition-all"
                >
                  <span className="flex items-center gap-2">
                    <Sparkles className="w-3.5 h-3.5 text-purple-400 flex-shrink-0" />
                    <span className="line-clamp-1">{prompt}</span>
                  </span>
                </button>
              ))}
            </div>
          </div>
        ) : (
          <>
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-3 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                {msg.role === "assistant" && (
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 
                    flex items-center justify-center">
                    <Bot className="w-4 h-4 text-white" />
                  </div>
                )}
                <div
                  className={`group relative max-w-[80%] px-4 py-3 rounded-2xl text-sm leading-relaxed
                    ${msg.role === "user"
                      ? "bg-[#0A1628] text-white rounded-br-md"
                      : "bg-gray-50 text-gray-700 border border-gray-100 rounded-bl-md"
                    }`}
                >
                  <div className="whitespace-pre-wrap">{msg.content}</div>
                  <div className={`flex items-center gap-2 mt-2 ${msg.role === "user" ? "justify-end" : "justify-between"}`}>
                    <span className={`text-[10px] ${msg.role === "user" ? "text-gray-400" : "text-gray-400"}`}>
                      {msg.timestamp.toLocaleTimeString("tr-TR", { hour: "2-digit", minute: "2-digit" })}
                    </span>
                    {msg.role === "assistant" && (
                      <button
                        onClick={() => handleCopy(msg.id, msg.content)}
                        className="opacity-0 group-hover:opacity-100 p-1 rounded text-gray-400 hover:text-gray-600 transition-all"
                      >
                        {copiedId === msg.id ? (
                          <Check className="w-3.5 h-3.5 text-emerald-500" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                      </button>
                    )}
                  </div>
                </div>
                {msg.role === "user" && (
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#0A1628] flex items-center justify-center">
                    <User className="w-4 h-4 text-white" />
                  </div>
                )}
              </div>
            ))}
            {isSending && (
              <div className="flex gap-3 justify-start">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 
                  flex items-center justify-center flex-shrink-0">
                  <Bot className="w-4 h-4 text-white" />
                </div>
                <div className="px-4 py-3 rounded-2xl rounded-bl-md bg-gray-50 border border-gray-100">
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Düşünüyorum...
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </>
        )}
      </div>

      {/* Input */}
      <div className="mt-4 flex gap-3">
        {messages.length > 0 && (
          <button
            onClick={clearChat}
            className="flex-shrink-0 p-3 rounded-xl border border-gray-200 text-gray-400 
              hover:text-red-500 hover:border-red-200 hover:bg-red-50 transition-all"
            title="Sohbeti temizle"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        )}
        <div className="flex-1 relative">
          <textarea
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            rows={1}
            disabled={isSending}
            className="w-full px-5 py-3.5 pr-14 rounded-2xl bg-white border border-gray-200 text-sm text-gray-800 
              resize-none focus:outline-none focus:ring-2 focus:ring-[#C9A84C]/30 disabled:opacity-50"
            placeholder="Sorunuzu yazın..."
          />
          <button
            onClick={() => sendMessage()}
            disabled={isSending || !input.trim()}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-2.5 rounded-xl 
              bg-[#0A1628] text-white hover:bg-[#1B2A4A] transition-colors disabled:opacity-30"
          >
            {isSending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </div>
  );
}
