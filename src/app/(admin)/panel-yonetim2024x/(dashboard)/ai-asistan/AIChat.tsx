"use client";

import { useState, useRef, useEffect, useTransition, useCallback } from "react";
import {
  Send,
  Loader2,
  Bot,
  User,
  Sparkles,
  Copy,
  Check,
  Paperclip,
  FileText,
  ImageIcon,
  X,
  Download,
  MessageSquare,
  Plus,
  Trash2,
  Pencil,
  Clock,
} from "lucide-react";
import {
  sendAIMessage,
  getSessions,
  createSession,
  deleteSession,
  renameSession,
  getMessages,
  generatePdfFromText,
} from "./actions";
import type { AIChatSession, AIChatMessage } from "@/lib/db/schema";

type FileAttachment = {
  base64: string;
  mimeType: string;
  fileName: string;
  extractedText?: string;
  previewUrl?: string;
};

const QUICK_PROMPTS = [
  "Які види посвідки на проживання в Україні?",
  "Як громадянин Туреччини може відкрити компанію в Україні?",
  "Необхідні документи для шлюбу в Україні",
  "Що робити, якщо заявку на посвідку відхилено?",
  "Процес купівлі нерухомості в Україні",
  "Процедура отримання дозволу на роботу",
];

export default function AIChat() {
  // Sessions
  const [sessions, setSessions] = useState<AIChatSession[]>([]);
  const [activeSessionId, setActiveSessionId] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState("");

  // Messages
  const [messages, setMessages] = useState<AIChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [isSending, startSend] = useTransition();
  const [isLoadingSessions, startLoadSessions] = useTransition();
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // File
  const [attachment, setAttachment] = useState<FileAttachment | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // PDF Download
  const [generatingPdfId, setGeneratingPdfId] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Auto-scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Load sessions on mount
  useEffect(() => {
    startLoadSessions(async () => {
      const result = await getSessions();
      if (result.success && result.sessions) {
        setSessions(result.sessions);
        if (result.sessions.length > 0) {
          setActiveSessionId(result.sessions[0].id);
        }
      }
    });
  }, []);

  // Load messages when session changes
  const loadMessages = useCallback((sessionId: string) => {
    startLoadSessions(async () => {
      const result = await getMessages(sessionId);
      if (result.success && result.messages) {
        setMessages(result.messages);
      }
    });
  }, []);

  useEffect(() => {
    if (activeSessionId) {
      loadMessages(activeSessionId);
    } else {
      setMessages([]);
    }
  }, [activeSessionId, loadMessages]);

  // ===== SESSION MANAGEMENT =====

  const handleNewSession = () => {
    startLoadSessions(async () => {
      const result = await createSession();
      if (result.success && result.session) {
        setSessions((prev) => [result.session, ...prev]);
        setActiveSessionId(result.session.id);
        setMessages([]);
      }
    });
  };

  const handleDeleteSession = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    startLoadSessions(async () => {
      const result = await deleteSession(id);
      if (result.success) {
        setSessions((prev) => prev.filter((s) => s.id !== id));
        if (activeSessionId === id) {
          const remaining = sessions.filter((s) => s.id !== id);
          setActiveSessionId(remaining[0]?.id ?? null);
        }
      }
    });
  };

  const handleStartRename = (e: React.MouseEvent, s: AIChatSession) => {
    e.stopPropagation();
    setEditingId(s.id);
    setEditTitle(s.title);
  };

  const handleSaveRename = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!editingId || !editTitle.trim()) return;
    const id = editingId;
    const title = editTitle.trim();
    setEditingId(null);
    setSessions((prev) =>
      prev.map((s) => (s.id === id ? { ...s, title } : s))
    );
    startLoadSessions(async () => {
      await renameSession(id, title);
    });
  };

  const handleCancelRename = (e: React.MouseEvent) => {
    e.stopPropagation();
    setEditingId(null);
  };

  const formatDate = (date: Date) => {
    const d = new Date(date);
    const now = new Date();
    const diff = now.getTime() - d.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    if (days === 0) return "Сьогодні";
    if (days === 1) return "Вчора";
    if (days < 7) return `${days} дн. тому`;
    return d.toLocaleDateString("uk-UA", { day: "numeric", month: "short" });
  };

  // ===== FILE UPLOAD =====

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    e.target.value = "";

    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/ai-upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (data.success) {
        const previewUrl =
          data.mimeType.startsWith("image/")
            ? `data:${data.mimeType};base64,${data.base64}`
            : undefined;

        setAttachment({
          base64: data.base64,
          mimeType: data.mimeType,
          fileName: data.fileName,
          extractedText: data.extractedText,
          previewUrl,
        });
      }
    } catch (err) {
      console.error("Upload failed:", err);
    } finally {
      setIsUploading(false);
    }
  };

  const clearAttachment = () => setAttachment(null);

  // ===== SEND MESSAGE =====

  const sendMessage = async (text?: string) => {
    const msg = text || input.trim();
    if (!msg && !attachment) return;

    // Ensure we have a session
    let sessionId = activeSessionId;
    if (!sessionId) {
      const result = await createSession();
      if (result.success && result.session) {
        setSessions((prev) => [result.session, ...prev]);
        sessionId = result.session.id;
        setActiveSessionId(sessionId);
      } else {
        return;
      }
    }

    const currentAttachment = attachment;
    setInput("");
    setAttachment(null);

    // Optimistic user message
    const tempUserMsg: AIChatMessage = {
      id: crypto.randomUUID(),
      sessionId: sessionId,
      role: "user",
      content: msg,
      fileName: currentAttachment?.fileName ?? null,
      fileType: currentAttachment
        ? currentAttachment.mimeType === "application/pdf"
          ? "pdf"
          : "image"
        : null,
      fileUrl: currentAttachment?.previewUrl ?? null,
      createdAt: new Date(),
    };
    setMessages((prev) => [...prev, tempUserMsg]);

    startSend(async () => {
      const result = await sendAIMessage(
        sessionId!,
        msg,
        currentAttachment
          ? {
              base64: currentAttachment.base64,
              mimeType: currentAttachment.mimeType,
              fileName: currentAttachment.fileName,
              extractedText: currentAttachment.extractedText,
            }
          : undefined
      );

      if (result.success && result.reply) {
        const assistantMsg: AIChatMessage = {
          id: crypto.randomUUID(),
          sessionId: sessionId!,
          role: "assistant",
          content: result.reply,
          fileName: null,
          fileType: null,
          fileUrl: null,
          createdAt: new Date(),
        };
        setMessages((prev) => [...prev, assistantMsg]);

        // Update session title in sidebar
        if (messages.length === 0) {
          const titleText = msg.slice(0, 80) || currentAttachment?.fileName || "Розмова";
          setSessions((prev) =>
            prev.map((s) =>
              s.id === sessionId ? { ...s, title: titleText, updatedAt: new Date() } : s
            )
          );
        }
      } else {
        const errorMsg: AIChatMessage = {
          id: crypto.randomUUID(),
          sessionId: sessionId!,
          role: "assistant",
          content: result.error || "Сталася помилка.",
          fileName: null,
          fileType: null,
          fileUrl: null,
          createdAt: new Date(),
        };
        setMessages((prev) => [...prev, errorMsg]);
      }
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

  // ===== PDF DOWNLOAD =====

  const handleDownloadPdf = async (msgId: string, text: string) => {
    setGeneratingPdfId(msgId);
    try {
      const result = await generatePdfFromText(text);
      if (result.success && result.base64) {
        const link = document.createElement("a");
        link.href = `data:application/pdf;base64,${result.base64}`;
        link.download = "document.pdf";
        link.click();
      }
    } catch {
      // ignore
    } finally {
      setGeneratingPdfId(null);
    }
  };

  return (
    <div className="flex h-[calc(100vh-180px)] min-h-[500px] gap-4">
      {/* ===== SIDEBAR ===== */}
      <div className="w-64 flex-shrink-0 flex flex-col bg-white rounded-2xl border border-gray-200/80 p-3">
        <button
          onClick={handleNewSession}
          disabled={isLoadingSessions}
          className="flex items-center gap-2 w-full px-3 py-2.5 rounded-xl bg-[#0A1628] text-white text-xs font-semibold
            hover:bg-[#1B2A4A] transition-colors disabled:opacity-50 mb-3"
        >
          <Plus className="w-4 h-4" />
          Нова розмова
        </button>

        <div className="flex-1 overflow-y-auto space-y-1 pr-1">
          {sessions.length === 0 && !isLoadingSessions ? (
            <div className="flex flex-col items-center justify-center h-32 text-center">
              <MessageSquare className="w-8 h-8 text-gray-300 mb-2" />
              <p className="text-xs text-gray-400">Ще немає розмов</p>
            </div>
          ) : (
            sessions.map((s) => {
              const isActive = s.id === activeSessionId;
              const isEditing = editingId === s.id;

              return (
                <div
                  key={s.id}
                  onClick={() => !isEditing && setActiveSessionId(s.id)}
                  className={`group relative flex items-center gap-2 px-3 py-2.5 rounded-xl cursor-pointer transition-all
                    ${isActive
                      ? "bg-purple-50 border border-purple-200 text-purple-800"
                      : "hover:bg-gray-50 border border-transparent text-gray-700"
                    }`}
                >
                  <MessageSquare className={`w-3.5 h-3.5 flex-shrink-0 ${isActive ? "text-purple-500" : "text-gray-400"}`} />
                  <div className="flex-1 min-w-0">
                    {isEditing ? (
                      <div className="flex items-center gap-1">
                        <input
                          value={editTitle}
                          onChange={(e) => setEditTitle(e.target.value)}
                          onClick={(e) => e.stopPropagation()}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") handleSaveRename(e as unknown as React.MouseEvent);
                            if (e.key === "Escape") handleCancelRename(e as unknown as React.MouseEvent);
                          }}
                          className="flex-1 px-1.5 py-0.5 text-xs bg-white border border-purple-300 rounded focus:outline-none"
                          autoFocus
                        />
                        <button onClick={handleSaveRename} className="p-0.5 text-emerald-500"><Check className="w-3 h-3" /></button>
                        <button onClick={handleCancelRename} className="p-0.5 text-gray-400"><X className="w-3 h-3" /></button>
                      </div>
                    ) : (
                      <>
                        <p className="text-xs font-medium truncate">{s.title}</p>
                        <p className="text-[10px] text-gray-400 flex items-center gap-1 mt-0.5">
                          <Clock className="w-2.5 h-2.5" />
                          {formatDate(s.updatedAt)}
                        </p>
                      </>
                    )}
                  </div>
                  {!isEditing && (
                    <div className="flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button onClick={(e) => handleStartRename(e, s)} className="p-1 rounded hover:bg-gray-200 text-gray-400 hover:text-blue-600"><Pencil className="w-3 h-3" /></button>
                      <button onClick={(e) => handleDeleteSession(e, s.id)} className="p-1 rounded hover:bg-red-50 text-gray-400 hover:text-red-500"><Trash2 className="w-3 h-3" /></button>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* ===== CHAT AREA ===== */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Messages */}
        <div className="flex-1 overflow-y-auto rounded-2xl bg-white border border-gray-200/80 p-4 space-y-4">
          {!activeSessionId ? (
            <div className="flex flex-col items-center justify-center h-full text-center px-4">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-100 to-indigo-100 flex items-center justify-center mb-4">
                <Bot className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-800 mb-1">Lviv Avukat AI Асистент</h3>
              <p className="text-sm text-gray-500 mb-6 max-w-md">
                Створіть нову розмову або оберіть існуючу зліва.
              </p>
              <button
                onClick={handleNewSession}
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-[#0A1628] text-white text-sm font-semibold hover:bg-[#1B2A4A] transition-colors"
              >
                <Plus className="w-4 h-4" />
                Почати розмову
              </button>
            </div>
          ) : messages.length === 0 && !isSending ? (
            <div className="flex flex-col items-center justify-center h-full text-center px-4">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-100 to-indigo-100 flex items-center justify-center mb-4">
                <Bot className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-800 mb-1">Lviv Avukat AI Асистент</h3>
              <p className="text-sm text-gray-500 mb-6 max-w-md">
                Ставте питання, завантажуйте PDF або зображення для аналізу.
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
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center">
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
                    {/* File indicator */}
                    {msg.fileName && (
                      <div className={`flex items-center gap-2 mb-2 px-2 py-1.5 rounded-lg text-xs
                        ${msg.role === "user" ? "bg-white/10" : "bg-gray-100"}`}>
                        {msg.fileType === "pdf" ? (
                          <FileText className="w-4 h-4 text-red-400" />
                        ) : (
                          <ImageIcon className="w-4 h-4 text-blue-400" />
                        )}
                        <span className="truncate">{msg.fileName}</span>
                      </div>
                    )}

                    {/* Image preview */}
                    {msg.fileUrl && msg.fileType === "image" && (
                      <img
                        src={msg.fileUrl}
                        alt={msg.fileName || "image"}
                        className="max-w-full max-h-48 rounded-lg mb-2 object-contain"
                      />
                    )}

                    <div className="whitespace-pre-wrap">{msg.content}</div>

                    <div className={`flex items-center gap-2 mt-2 ${msg.role === "user" ? "justify-end" : "justify-between"}`}>
                      <span className="text-[10px] text-gray-400">
                        {new Date(msg.createdAt).toLocaleTimeString("uk-UA", { hour: "2-digit", minute: "2-digit" })}
                      </span>
                      {msg.role === "assistant" && (
                        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-all">
                          <button
                            onClick={() => handleCopy(msg.id, msg.content)}
                            className="p-1 rounded text-gray-400 hover:text-gray-600"
                            title="Копіювати"
                          >
                            {copiedId === msg.id ? (
                              <Check className="w-3.5 h-3.5 text-emerald-500" />
                            ) : (
                              <Copy className="w-3.5 h-3.5" />
                            )}
                          </button>
                          {msg.content.length > 100 && (
                            <button
                              onClick={() => handleDownloadPdf(msg.id, msg.content)}
                              className="p-1 rounded text-gray-400 hover:text-red-500"
                              title="Завантажити як PDF"
                            >
                              {generatingPdfId === msg.id ? (
                                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                              ) : (
                                <Download className="w-3.5 h-3.5" />
                              )}
                            </button>
                          )}
                        </div>
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
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center flex-shrink-0">
                    <Bot className="w-4 h-4 text-white" />
                  </div>
                  <div className="px-4 py-3 rounded-2xl rounded-bl-md bg-gray-50 border border-gray-100">
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Думаю...
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </>
          )}
        </div>

        {/* Attachment preview */}
        {attachment && (
          <div className="mt-2 flex items-center gap-2 px-3 py-2 rounded-xl bg-purple-50 border border-purple-200">
            {attachment.mimeType === "application/pdf" ? (
              <FileText className="w-5 h-5 text-red-500" />
            ) : attachment.previewUrl ? (
              <img src={attachment.previewUrl} alt="" className="w-10 h-10 rounded object-cover" />
            ) : (
              <ImageIcon className="w-5 h-5 text-blue-500" />
            )}
            <span className="text-xs text-gray-700 truncate flex-1">{attachment.fileName}</span>
            <button onClick={clearAttachment} className="p-1 rounded hover:bg-purple-100 text-gray-400">
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Input area */}
        {activeSessionId && (
          <div className="mt-3 flex gap-2">
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf,image/jpeg,image/png,image/webp,image/gif"
              className="hidden"
              onChange={handleFileSelect}
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              disabled={isSending || isUploading}
              className="flex-shrink-0 p-3 rounded-xl border border-gray-200 text-gray-400
                hover:text-purple-600 hover:border-purple-200 hover:bg-purple-50 transition-all disabled:opacity-30"
              title="Завантажити файл (PDF, зображення)"
            >
              {isUploading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Paperclip className="w-5 h-5" />}
            </button>

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
                placeholder={attachment ? `"${attachment.fileName}" hakkında sorunuzu yazın...` : "Напишіть ваше питання..."}
              />
              <button
                onClick={() => sendMessage()}
                disabled={isSending || (!input.trim() && !attachment)}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-2.5 rounded-xl
                  bg-[#0A1628] text-white hover:bg-[#1B2A4A] transition-colors disabled:opacity-30"
              >
                {isSending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
