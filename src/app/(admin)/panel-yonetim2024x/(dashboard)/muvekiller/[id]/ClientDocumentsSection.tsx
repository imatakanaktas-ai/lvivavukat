"use client";

import { useState, useTransition, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import {
  FileText,
  Upload,
  Search,
  X,
  Trash2,
  Download,
  Eye,
  Image as ImageIcon,
  File,
  FileSpreadsheet,
  Loader2,
  FolderOpen,
  ChevronDown,
  ChevronUp,
  Plus,
} from "lucide-react";
import { deleteDocument, deleteDocumentFile } from "../actions";

// ============================================================
// Types
// ============================================================

interface DocFile {
  id: string;
  fileUrl: string;
  fileName: string;
  fileSize: number | null;
  mimeType: string | null;
  sortOrder: number;
}

interface Document {
  id: string;
  title: string;
  category: string;
  uploadedAt: Date;
  files: DocFile[];
}

// ============================================================
// Constants
// ============================================================

const CATEGORIES: Record<string, { label: string; color: string }> = {
  kimlik: { label: "Kimlik", color: "bg-blue-100 text-blue-700" },
  sozlesme: { label: "Sözleşme", color: "bg-purple-100 text-purple-700" },
  mahkeme: { label: "Mahkeme", color: "bg-red-100 text-red-700" },
  devlet: { label: "Devlet", color: "bg-emerald-100 text-emerald-700" },
  diger: { label: "Diğer", color: "bg-gray-100 text-gray-600" },
};

function formatFileSize(bytes: number | null): string {
  if (!bytes) return "—";
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function getFileIcon(mimeType: string | null) {
  if (!mimeType) return File;
  if (mimeType.startsWith("image/")) return ImageIcon;
  if (mimeType === "application/pdf") return FileText;
  if (mimeType.includes("spreadsheet") || mimeType.includes("excel")) return FileSpreadsheet;
  return File;
}

function isPreviewable(mimeType: string | null): boolean {
  if (!mimeType) return false;
  return mimeType.startsWith("image/") || mimeType === "application/pdf";
}

// ============================================================
// Upload Modal
// ============================================================

function UploadModal({
  clientId,
  onClose,
  onSuccess,
}: {
  clientId: string;
  onClose: () => void;
  onSuccess: () => void;
}) {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("diger");
  const [files, setFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const dropZoneRef = useRef<HTMLDivElement>(null);
  const [dragOver, setDragOver] = useState(false);

  function handleFiles(newFiles: FileList | File[]) {
    const arr = Array.from(newFiles);
    setFiles((prev) => [...prev, ...arr]);
    setError("");
  }

  function removeFile(index: number) {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  }

  function handleDragOver(e: React.DragEvent) {
    e.preventDefault();
    setDragOver(true);
  }

  function handleDragLeave(e: React.DragEvent) {
    e.preventDefault();
    setDragOver(false);
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer.files.length) {
      handleFiles(e.dataTransfer.files);
    }
  }

  async function handleUpload() {
    if (!title.trim()) {
      setError("Belge başlığı gereklidir.");
      return;
    }
    if (files.length === 0) {
      setError("En az bir dosya seçin.");
      return;
    }

    setUploading(true);
    setError("");

    try {
      const formData = new FormData();
      formData.append("clientId", clientId);
      formData.append("title", title.trim());
      formData.append("category", category);
      files.forEach((f) => formData.append("files", f));

      const res = await fetch("/api/documents", {
        method: "POST",
        body: formData,
      });

      const contentType = res.headers.get("content-type");
      if (!contentType?.includes("application/json")) {
        setError(`Sunucu hatası (${res.status}). Lütfen tekrar deneyin.`);
        setUploading(false);
        return;
      }

      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Yükleme sırasında hata oluştu.");
        setUploading(false);
        return;
      }

      onSuccess();
      onClose();
    } catch (err) {
      console.error("Document upload error:", err);
      setError("Bağlantı hatası. Tekrar deneyin.");
      setUploading(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50" onClick={onClose}>
      <div
        className="bg-white rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-5 border-b border-gray-100">
          <h3 className="text-base font-semibold text-gray-900">Belge Yükle</h3>
          <button onClick={onClose} className="w-8 h-8 rounded-lg hover:bg-gray-100 flex items-center justify-center">
            <X className="w-4 h-4 text-gray-500" />
          </button>
        </div>

        <div className="p-5 space-y-4">
          {/* Title */}
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1.5">Belge Başlığı</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="ör. Pasaport Fotokopisi"
              className="w-full px-3 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-sm
                focus:outline-none focus:ring-2 focus:ring-[#C9A84C]/30 focus:border-[#C9A84C]/50"
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1.5">Kategori</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-sm
                focus:outline-none focus:ring-2 focus:ring-[#C9A84C]/30 focus:border-[#C9A84C]/50"
            >
              {Object.entries(CATEGORIES).map(([key, { label }]) => (
                <option key={key} value={key}>
                  {label}
                </option>
              ))}
            </select>
          </div>

          {/* Drop zone */}
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1.5">
              Dosyalar <span className="text-gray-400 font-normal">(birden fazla seçilebilir)</span>
            </label>
            <div
              ref={dropZoneRef}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-colors
                ${dragOver 
                  ? "border-[#C9A84C] bg-[#C9A84C]/5" 
                  : "border-gray-200 hover:border-gray-300 bg-gray-50/50"}`}
            >
              <Upload className={`w-8 h-8 mx-auto mb-2 ${dragOver ? "text-[#C9A84C]" : "text-gray-300"}`} />
              <p className="text-sm text-gray-500">
                Dosyaları sürükleyip bırakın veya <span className="text-[#C9A84C] font-medium">seçin</span>
              </p>
              <p className="text-[11px] text-gray-400 mt-1">PDF, Resim, Word, Excel — max 20MB</p>
            </div>
            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept="image/*,.pdf,.doc,.docx,.xls,.xlsx,.txt"
              className="hidden"
              onChange={(e) => e.target.files && handleFiles(e.target.files)}
            />
          </div>

          {/* File list */}
          {files.length > 0 && (
            <div className="space-y-2">
              {files.map((file, i) => {
                const Icon = getFileIcon(file.type);
                return (
                  <div key={`${file.name}-${i}`} className="flex items-center gap-3 p-2.5 rounded-lg bg-gray-50">
                    <Icon className="w-4 h-4 text-gray-400 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-gray-700 truncate">{file.name}</p>
                      <p className="text-[11px] text-gray-400">{formatFileSize(file.size)}</p>
                    </div>
                    <button
                      onClick={(e) => { e.stopPropagation(); removeFile(i); }}
                      className="w-6 h-6 rounded flex items-center justify-center text-gray-300 hover:text-red-500"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                );
              })}
            </div>
          )}

          {error && (
            <p className="text-sm text-red-600 bg-red-50 px-3 py-2 rounded-lg">{error}</p>
          )}
        </div>

        <div className="flex gap-3 p-5 border-t border-gray-100">
          <button
            onClick={onClose}
            disabled={uploading}
            className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 text-sm font-medium text-gray-600
              hover:bg-gray-50 disabled:opacity-40 transition-colors"
          >
            İptal
          </button>
          <button
            onClick={handleUpload}
            disabled={uploading || !title.trim() || files.length === 0}
            className="flex-1 px-4 py-2.5 rounded-xl bg-[#0A1628] text-white text-sm font-semibold
              hover:bg-[#1B2A4A] disabled:opacity-40 transition-colors flex items-center justify-center gap-2"
          >
            {uploading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Yükleniyor...
              </>
            ) : (
              <>
                <Upload className="w-4 h-4" />
                Yükle ({files.length} dosya)
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// Preview Modal
// ============================================================

function PreviewModal({ file, onClose }: { file: DocFile; onClose: () => void }) {
  const isImage = file.mimeType?.startsWith("image/");
  const isPdf = file.mimeType === "application/pdf";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70" onClick={onClose}>
      <div
        className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden shadow-xl flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-100">
          <h3 className="text-sm font-semibold text-gray-800 truncate">{file.fileName}</h3>
          <div className="flex items-center gap-2">
            <a
              href={file.fileUrl}
              download={file.fileName}
              className="w-8 h-8 rounded-lg hover:bg-gray-100 flex items-center justify-center"
              title="İndir"
            >
              <Download className="w-4 h-4 text-gray-500" />
            </a>
            <button onClick={onClose} className="w-8 h-8 rounded-lg hover:bg-gray-100 flex items-center justify-center">
              <X className="w-4 h-4 text-gray-500" />
            </button>
          </div>
        </div>
        <div className="flex-1 overflow-auto bg-gray-100 flex items-center justify-center p-4">
          {isImage && (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              src={file.fileUrl}
              alt={file.fileName}
              className="max-w-full max-h-[75vh] object-contain rounded-lg shadow-sm"
            />
          )}
          {isPdf && (
            <iframe
              src={file.fileUrl}
              className="w-full h-[75vh] rounded-lg"
              title={file.fileName}
            />
          )}
        </div>
      </div>
    </div>
  );
}

// ============================================================
// Document Card
// ============================================================

function DocumentCard({
  doc,
  clientId,
  onPreview,
}: {
  doc: Document;
  clientId: string;
  onPreview: (file: DocFile) => void;
}) {
  const [expanded, setExpanded] = useState(false);
  const [isPending, startTransition] = useTransition();
  const cat = CATEGORIES[doc.category] || CATEGORIES.diger;

  function handleDeleteDoc() {
    if (!confirm(`"${doc.title}" belgesini ve tüm dosyalarını silmek istediğinize emin misiniz?`)) return;
    startTransition(async () => {
      await deleteDocument(doc.id, clientId);
    });
  }

  function handleDeleteFile(fileId: string) {
    if (!confirm("Bu dosyayı silmek istediğinize emin misiniz?")) return;
    startTransition(async () => {
      await deleteDocumentFile(fileId, doc.id, clientId);
    });
  }

  return (
    <div className={`rounded-xl border border-gray-200/80 bg-white overflow-hidden transition-all ${isPending ? "opacity-50" : ""}`}>
      {/* Header */}
      <div
        className="flex items-center gap-3 p-3.5 cursor-pointer hover:bg-gray-50/50 transition-colors"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="w-9 h-9 rounded-lg bg-gray-50 flex items-center justify-center flex-shrink-0">
          <FolderOpen className="w-4 h-4 text-gray-400" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <p className="text-sm font-medium text-gray-800 truncate">{doc.title}</p>
            <span className={`px-1.5 py-0.5 rounded text-[10px] font-medium ${cat.color}`}>
              {cat.label}
            </span>
          </div>
          <p className="text-[11px] text-gray-400">
            {doc.files.length} dosya · {new Date(doc.uploadedAt).toLocaleDateString("tr-TR")}
          </p>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={(e) => { e.stopPropagation(); handleDeleteDoc(); }}
            className="w-7 h-7 rounded-lg flex items-center justify-center text-gray-300 hover:text-red-500 hover:bg-red-50 transition-colors"
            title="Belgeyi sil"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
          {expanded ? (
            <ChevronUp className="w-4 h-4 text-gray-400" />
          ) : (
            <ChevronDown className="w-4 h-4 text-gray-400" />
          )}
        </div>
      </div>

      {/* Files */}
      {expanded && (
        <div className="border-t border-gray-100 divide-y divide-gray-50">
          {doc.files.map((file) => {
            const Icon = getFileIcon(file.mimeType);
            const canPreview = isPreviewable(file.mimeType);
            return (
              <div key={file.id} className="flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50/50">
                <Icon className="w-4 h-4 text-gray-400 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-700 truncate">{file.fileName}</p>
                  <p className="text-[11px] text-gray-400">{formatFileSize(file.fileSize)}</p>
                </div>
                <div className="flex items-center gap-1">
                  {canPreview && (
                    <button
                      onClick={() => onPreview(file)}
                      className="w-7 h-7 rounded-lg flex items-center justify-center text-gray-400 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                      title="Önizleme"
                    >
                      <Eye className="w-3.5 h-3.5" />
                    </button>
                  )}
                  <a
                    href={file.fileUrl}
                    download={file.fileName}
                    className="w-7 h-7 rounded-lg flex items-center justify-center text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 transition-colors"
                    title="İndir"
                  >
                    <Download className="w-3.5 h-3.5" />
                  </a>
                  <button
                    onClick={() => handleDeleteFile(file.id)}
                    className="w-7 h-7 rounded-lg flex items-center justify-center text-gray-300 hover:text-red-500 hover:bg-red-50 transition-colors"
                    title="Sil"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

// ============================================================
// Main Section
// ============================================================

export default function ClientDocumentsSection({
  clientId,
  documents,
}: {
  clientId: string;
  documents: Document[];
}) {
  const [search, setSearch] = useState("");
  const [showUpload, setShowUpload] = useState(false);
  const [previewFile, setPreviewFile] = useState<DocFile | null>(null);
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const router = useRouter();

  const filtered = documents.filter((doc) => {
    const matchSearch = !search.trim() || doc.title.toLowerCase().includes(search.toLowerCase())
      || doc.files.some((f) => f.fileName.toLowerCase().includes(search.toLowerCase()));
    const matchCategory = categoryFilter === "all" || doc.category === categoryFilter;
    return matchSearch && matchCategory;
  });

  const handleUploadSuccess = useCallback(() => {
    router.refresh();
  }, [router]);

  return (
    <>
      <div className="p-6 rounded-2xl bg-white border border-gray-200/80">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-semibold text-gray-800 flex items-center gap-2">
            <FileText className="w-4 h-4 text-gray-400" />
            Belgeler
            {documents.length > 0 && (
              <span className="text-[11px] font-normal text-gray-400">({documents.length})</span>
            )}
          </h2>
          <button
            onClick={() => setShowUpload(true)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#0A1628] text-white text-xs font-medium
              hover:bg-[#1B2A4A] transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            Belge Ekle
          </button>
        </div>

        {/* Search & Filter */}
        {documents.length > 0 && (
          <div className="flex gap-2 mb-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Belge veya dosya adı ara..."
                className="w-full pl-9 pr-3 py-2 rounded-lg bg-gray-50 border border-gray-200 text-sm
                  focus:outline-none focus:ring-2 focus:ring-[#C9A84C]/30 focus:border-[#C9A84C]/50"
              />
              {search && (
                <button
                  onClick={() => setSearch("")}
                  className="absolute right-2 top-1/2 -translate-y-1/2 w-5 h-5 rounded flex items-center justify-center text-gray-400 hover:text-gray-600"
                >
                  <X className="w-3 h-3" />
                </button>
              )}
            </div>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="px-3 py-2 rounded-lg bg-gray-50 border border-gray-200 text-sm text-gray-600
                focus:outline-none focus:ring-2 focus:ring-[#C9A84C]/30"
            >
              <option value="all">Tümü</option>
              {Object.entries(CATEGORIES).map(([key, { label }]) => (
                <option key={key} value={key}>
                  {label}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Document List */}
        {filtered.length === 0 ? (
          <div className="text-center py-8">
            {documents.length === 0 ? (
              <>
                <FolderOpen className="w-10 h-10 text-gray-200 mx-auto mb-2" />
                <p className="text-sm text-gray-400">Henüz belge yüklenmemiş</p>
                <button
                  onClick={() => setShowUpload(true)}
                  className="mt-3 text-sm text-[#C9A84C] hover:underline"
                >
                  İlk belgeyi yükleyin
                </button>
              </>
            ) : (
              <>
                <Search className="w-8 h-8 text-gray-200 mx-auto mb-2" />
                <p className="text-sm text-gray-400">Aramanızla eşleşen belge bulunamadı</p>
              </>
            )}
          </div>
        ) : (
          <div className="space-y-2">
            {filtered.map((doc) => (
              <DocumentCard
                key={doc.id}
                doc={doc}
                clientId={clientId}
                onPreview={setPreviewFile}
              />
            ))}
          </div>
        )}
      </div>

      {/* Upload Modal */}
      {showUpload && (
        <UploadModal
          clientId={clientId}
          onClose={() => setShowUpload(false)}
          onSuccess={handleUploadSuccess}
        />
      )}

      {/* Preview Modal */}
      {previewFile && (
        <PreviewModal
          file={previewFile}
          onClose={() => setPreviewFile(null)}
        />
      )}
    </>
  );
}
