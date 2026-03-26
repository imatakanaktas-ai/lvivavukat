"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import {
  Mail,
  Phone,
  Clock,
  Trash2,
  Eye,
  X,
  Loader2,
  CheckCircle2,
  Circle,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { markAsRead, deleteSubmission } from "./actions";

const ADMIN_PREFIX = process.env.NEXT_PUBLIC_ADMIN_ROUTE_PREFIX || "panel-yonetim2024x";

type Submission = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  subject: string;
  message: string;
  isRead: boolean;
  createdAt: Date;
};

export default function SubmissionsList({
  submissions: initial,
  page,
  totalPages,
}: {
  submissions: Submission[];
  page: number;
  totalPages: number;
}) {
  const [submissions, setSubmissions] = useState(initial);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [isMarking, startMark] = useTransition();

  const selected = submissions.find((s) => s.id === selectedId);

  const handleOpen = (id: string) => {
    setSelectedId(id);
    const sub = submissions.find((s) => s.id === id);
    if (sub && !sub.isRead) {
      startMark(async () => {
        await markAsRead(id);
        setSubmissions((prev) =>
          prev.map((s) => (s.id === id ? { ...s, isRead: true } : s))
        );
      });
    }
  };

  const handleDelete = async (id: string) => {
    setDeletingId(id);
    await deleteSubmission(id);
    setSubmissions((prev) => prev.filter((s) => s.id !== id));
    if (selectedId === id) setSelectedId(null);
    setDeletingId(null);
  };

  return (
    <>
      <div className="space-y-2">
        {submissions.map((sub) => (
          <div
            key={sub.id}
            onClick={() => handleOpen(sub.id)}
            className={`group flex items-start gap-3 p-4 rounded-xl border cursor-pointer transition-all
              ${sub.isRead
                ? "bg-white border-gray-200/80 hover:shadow-sm"
                : "bg-blue-50/50 border-blue-200 hover:border-blue-300"
              }`}
          >
            <div className="mt-1 flex-shrink-0">
              {sub.isRead ? (
                <CheckCircle2 className="w-4 h-4 text-gray-300" />
              ) : (
                <Circle className="w-4 h-4 text-blue-500 fill-blue-500" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-1">
                <h3 className={`text-sm font-semibold truncate ${sub.isRead ? "text-gray-700" : "text-gray-900"}`}>
                  {sub.name}
                </h3>
                <span className="text-[11px] text-gray-400 flex-shrink-0 ml-2 flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {new Date(sub.createdAt).toLocaleDateString("tr-TR", {
                    day: "numeric", month: "short", hour: "2-digit", minute: "2-digit",
                  })}
                </span>
              </div>
              <p className={`text-xs truncate ${sub.isRead ? "text-gray-500" : "text-gray-700 font-medium"}`}>
                {sub.subject}
              </p>
              <p className="text-xs text-gray-400 truncate mt-0.5">{sub.message}</p>
            </div>
            <button
              onClick={(e) => { e.stopPropagation(); handleDelete(sub.id); }}
              disabled={deletingId === sub.id}
              className="opacity-0 group-hover:opacity-100 p-1.5 rounded-lg text-gray-400 
                hover:text-red-500 hover:bg-red-50 transition-all flex-shrink-0"
            >
              {deletingId === sub.id ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Trash2 className="w-4 h-4" />
              )}
            </button>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 pt-4">
          {page > 1 && (
            <Link
              href={`/${ADMIN_PREFIX}/iletisim?page=${page - 1}`}
              className="p-2 rounded-lg text-gray-500 hover:bg-gray-100"
            >
              <ChevronLeft className="w-4 h-4" />
            </Link>
          )}
          <span className="text-sm text-gray-500">
            {page} / {totalPages}
          </span>
          {page < totalPages && (
            <Link
              href={`/${ADMIN_PREFIX}/iletisim?page=${page + 1}`}
              className="p-2 rounded-lg text-gray-500 hover:bg-gray-100"
            >
              <ChevronRight className="w-4 h-4" />
            </Link>
          )}
        </div>
      )}

      {/* Detail Modal */}
      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg">
            <div className="flex items-center justify-between p-5 border-b border-gray-100">
              <h3 className="text-lg font-bold text-gray-900">{selected.subject}</h3>
              <button onClick={() => setSelectedId(null)} className="p-1 hover:bg-gray-100 rounded-lg">
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>
            <div className="p-5 space-y-4">
              <div className="flex flex-wrap gap-3 text-sm">
                <span className="flex items-center gap-1.5 text-gray-600">
                  <span className="font-semibold">{selected.name}</span>
                </span>
                <span className="flex items-center gap-1.5 text-gray-500">
                  <Mail className="w-3.5 h-3.5" />
                  {selected.email}
                </span>
                {selected.phone && (
                  <span className="flex items-center gap-1.5 text-gray-500">
                    <Phone className="w-3.5 h-3.5" />
                    {selected.phone}
                  </span>
                )}
              </div>
              <div className="p-4 rounded-xl bg-gray-50 border border-gray-100">
                <p className="text-sm text-gray-700 whitespace-pre-wrap leading-relaxed">
                  {selected.message}
                </p>
              </div>
              <p className="text-xs text-gray-400 flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {new Date(selected.createdAt).toLocaleString("tr-TR")}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
