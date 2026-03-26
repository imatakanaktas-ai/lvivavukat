"use client";

import { useState, useTransition } from "react";
import { StickyNote, Plus, Trash2, Loader2 } from "lucide-react";
import { addClientNote, deleteClientNote } from "../actions";

interface Note {
  id: string;
  content: string;
  createdAt: Date;
}

export default function ClientNotesSection({
  clientId,
  notes,
}: {
  clientId: string;
  notes: Note[];
}) {
  const [newNote, setNewNote] = useState("");
  const [isPending, startTransition] = useTransition();

  function handleAdd() {
    if (!newNote.trim()) return;
    startTransition(async () => {
      await addClientNote(clientId, newNote);
      setNewNote("");
    });
  }

  function handleDelete(noteId: string) {
    startTransition(async () => {
      await deleteClientNote(noteId, clientId);
    });
  }

  return (
    <div className="p-6 rounded-2xl bg-white border border-gray-200/80">
      <h2 className="text-sm font-semibold text-gray-800 flex items-center gap-2 mb-4">
        <StickyNote className="w-4 h-4 text-gray-400" />
        Notlar
      </h2>

      {/* Add note */}
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
          placeholder="Not ekle..."
          className="flex-1 px-3 py-2 rounded-lg bg-gray-50 border border-gray-200 text-sm
            focus:outline-none focus:ring-2 focus:ring-[#C9A84C]/30"
          onKeyDown={(e) => e.key === "Enter" && handleAdd()}
        />
        <button
          onClick={handleAdd}
          disabled={isPending || !newNote.trim()}
          className="w-9 h-9 rounded-lg bg-[#0A1628] text-white flex items-center justify-center 
            hover:bg-[#1B2A4A] disabled:opacity-40 transition-colors"
        >
          {isPending ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Plus className="w-3.5 h-3.5" />}
        </button>
      </div>

      {/* Notes list */}
      {notes.length === 0 ? (
        <p className="text-sm text-gray-400 text-center py-4">Henüz not eklenmemiş</p>
      ) : (
        <div className="space-y-2 max-h-64 overflow-y-auto">
          {notes.map((note) => (
            <div key={note.id} className="group flex items-start gap-2 p-2.5 rounded-lg bg-gray-50">
              <p className="flex-1 text-sm text-gray-600">{note.content}</p>
              <button
                onClick={() => handleDelete(note.id)}
                className="opacity-0 group-hover:opacity-100 w-6 h-6 rounded flex items-center justify-center 
                  text-gray-300 hover:text-red-500 transition-all"
                aria-label="Notu sil"
              >
                <Trash2 className="w-3 h-3" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
