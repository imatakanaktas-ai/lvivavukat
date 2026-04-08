"use client";

import { useState, useTransition } from "react";
import {
  MessageSquare,
  Plus,
  Trash2,
  Pencil,
  Check,
  X,
  Clock,
} from "lucide-react";
import {
  createSession,
  deleteSession,
  renameSession,
} from "./actions";
import type { AIChatSession } from "@/lib/db/schema";

interface Props {
  sessions: AIChatSession[];
  activeSessionId: string | null;
  onSelectSession: (id: string) => void;
  onNewSession: (session: AIChatSession) => void;
  onSessionDeleted: (id: string) => void;
  onSessionRenamed: (id: string, title: string) => void;
}

export default function ChatSidebar({
  sessions,
  activeSessionId,
  onSelectSession,
  onNewSession,
  onSessionDeleted,
  onSessionRenamed,
}: Props) {
  const [isPending, startTransition] = useTransition();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState("");

  const handleNewSession = () => {
    startTransition(async () => {
      const result = await createSession();
      if (result.success && result.session) {
        onNewSession(result.session);
      }
    });
  };

  const handleDelete = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    startTransition(async () => {
      const result = await deleteSession(id);
      if (result.success) {
        onSessionDeleted(id);
      }
    });
  };

  const handleStartRename = (e: React.MouseEvent, session: AIChatSession) => {
    e.stopPropagation();
    setEditingId(session.id);
    setEditTitle(session.title);
  };

  const handleSaveRename = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!editingId || !editTitle.trim()) return;
    const id = editingId;
    const title = editTitle.trim();
    setEditingId(null);
    startTransition(async () => {
      const result = await renameSession(id, title);
      if (result.success) {
        onSessionRenamed(id, title);
      }
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

  return (
    <div className="flex flex-col h-full">
      {/* New chat button */}
      <button
        onClick={handleNewSession}
        disabled={isPending}
        className="flex items-center gap-2 w-full px-4 py-3 rounded-xl bg-[#0A1628] text-white text-sm font-semibold
          hover:bg-[#1B2A4A] transition-colors disabled:opacity-50 mb-3"
      >
        <Plus className="w-4 h-4" />
        Нова розмова
      </button>

      {/* Session list */}
      <div className="flex-1 overflow-y-auto space-y-1 pr-1">
        {sessions.length === 0 ? (
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
                onClick={() => !isEditing && onSelectSession(s.id)}
                className={`group relative flex items-center gap-2 px-3 py-2.5 rounded-xl cursor-pointer transition-all
                  ${isActive
                    ? "bg-purple-50 border border-purple-200 text-purple-800"
                    : "hover:bg-gray-50 border border-transparent text-gray-700"
                  }`}
              >
                <MessageSquare className={`w-4 h-4 flex-shrink-0 ${isActive ? "text-purple-500" : "text-gray-400"}`} />

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
                      <button onClick={handleSaveRename} className="p-0.5 text-emerald-500 hover:text-emerald-700">
                        <Check className="w-3.5 h-3.5" />
                      </button>
                      <button onClick={handleCancelRename} className="p-0.5 text-gray-400 hover:text-gray-600">
                        <X className="w-3.5 h-3.5" />
                      </button>
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

                {/* Actions (hover) */}
                {!isEditing && (
                  <div className="flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={(e) => handleStartRename(e, s)}
                      className="p-1 rounded hover:bg-gray-200 text-gray-400 hover:text-blue-600 transition-colors"
                      title="Перейменувати"
                    >
                      <Pencil className="w-3 h-3" />
                    </button>
                    <button
                      onClick={(e) => handleDelete(e, s.id)}
                      className="p-1 rounded hover:bg-red-50 text-gray-400 hover:text-red-500 transition-colors"
                      title="Видалити"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
