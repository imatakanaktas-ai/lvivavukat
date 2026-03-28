"use client";

import { useActionState, useState, useEffect, useTransition } from "react";
import { useRouter } from "next/navigation";
import {
  Save,
  Loader2,
  AlertCircle,
  Bot,
  Sparkles,
  FileText,
  Globe,
  Tag,
  BookOpen,
  Eye,
  EyeOff,
  Wand2,
} from "lucide-react";
import {
  createBlogPost,
  updateBlogPost,
  generateBlogContent,
  generateTitleAlternatives,
  type BlogActionState,
} from "../actions";

const ADMIN_PREFIX = process.env.NEXT_PUBLIC_ADMIN_ROUTE_PREFIX || "panel-yonetim2024x";

interface BlogFormProps {
  post?: {
    id: string;
    title: string;
    slug: string;
    content: string;
    excerpt: string | null;
    metaDescription: string | null;
    metaKeywords: string | null;
    status: string;
    coverImageUrl: string | null;
    aiGenerated: boolean | null;
  };
  aiMode?: boolean;
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/ğ/g, "g").replace(/ü/g, "u").replace(/ş/g, "s")
    .replace(/ı/g, "i").replace(/ö/g, "o").replace(/ç/g, "c")
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

export default function BlogPostForm({ post, aiMode = false }: BlogFormProps) {
  const isEdit = !!post;
  const router = useRouter();

  const action = isEdit ? updateBlogPost.bind(null, post.id) : createBlogPost;
  const [state, formAction, isPending] = useActionState<BlogActionState, FormData>(action, null);

  const [title, setTitle] = useState(post?.title || "");
  const [slug, setSlug] = useState(post?.slug || "");
  const [content, setContent] = useState(post?.content || "");
  const [excerpt, setExcerpt] = useState(post?.excerpt || "");
  const [metaDesc, setMetaDesc] = useState(post?.metaDescription || "");
  const [metaKeywords, setMetaKeywords] = useState(post?.metaKeywords || "");
  const [statusVal, setStatusVal] = useState(post?.status || "draft");
  const [showPreview, setShowPreview] = useState(false);
  const [isAiGenerated, setIsAiGenerated] = useState(post?.aiGenerated || aiMode);

  // AI states
  const [aiIsGenerating, startAiGenerate] = useTransition();
  const [aiTopic, setAiTopic] = useState("");
  const [aiKeyword, setAiKeyword] = useState("");
  const [aiError, setAiError] = useState("");
  const [titleSuggestions, setTitleSuggestions] = useState<string[]>([]);
  const [isGeneratingTitles, startGenTitles] = useTransition();

  useEffect(() => {
    if (state?.success && state.id && !isEdit) {
      router.push(`/${ADMIN_PREFIX}/blog/${state.id}/duzenle`);
    }
  }, [state, isEdit, router]);

  const autoSlug = (val: string) => {
    setTitle(val);
    if (!isEdit) setSlug(slugify(val));
  };

  const handleAIGenerate = () => {
    if (!aiTopic.trim()) return;
    setAiError("");
    startAiGenerate(async () => {
      const result = await generateBlogContent(aiTopic, aiKeyword || aiTopic);
      if (result.success && result.content) {
        setContent(result.content);
        setIsAiGenerated(true);
        if (result.meta) {
          if (result.meta.metaTitle && !title) setTitle(result.meta.metaTitle);
          if (result.meta.slug && !slug) setSlug(result.meta.slug);
          if (result.meta.metaDescription) setMetaDesc(result.meta.metaDescription);
          if (result.meta.excerpt) setExcerpt(result.meta.excerpt);
          if (result.meta.keywords) setMetaKeywords(result.meta.keywords.join(", "));
        }
      } else {
        setAiError(result.error || "AI не зміг створити контент.");
      }
    });
  };

  const handleTitleSuggestions = () => {
    if (!aiTopic.trim() && !title.trim()) return;
    startGenTitles(async () => {
      const result = await generateTitleAlternatives(aiTopic || title);
      if (result.success && result.titles) {
        setTitleSuggestions(result.titles);
      }
    });
  };

  return (
    <div className="grid lg:grid-cols-3 gap-6">
      {/* Main Content */}
      <div className="lg:col-span-2 space-y-5">
        {/* AI Panel */}
        {(aiMode || isAiGenerated) && (
          <div className="p-5 rounded-2xl bg-gradient-to-r from-purple-50 to-indigo-50 border border-purple-200/60">
            <h3 className="text-sm font-bold text-purple-900 mb-3 flex items-center gap-2">
              <Bot className="w-4 h-4" />
              AI генератор контенту
            </h3>
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-purple-800 mb-1">Тема</label>
                <input
                  type="text"
                  value={aiTopic}
                  onChange={(e) => setAiTopic(e.target.value)}
                  placeholder="Нпр: Як отримати посвідку на проживання в Україні?"
                  className="w-full px-4 py-2.5 rounded-xl border border-purple-200 text-sm text-gray-800 bg-white
                    focus:outline-none focus:ring-2 focus:ring-purple-300/50 placeholder:text-gray-400"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-purple-800 mb-1">
                  Цільове ключове слово (опціонально)
                </label>
                <input
                  type="text"
                  value={aiKeyword}
                  onChange={(e) => setAiKeyword(e.target.value)}
                  placeholder="Нпр: посвідка на проживання україна"
                  className="w-full px-4 py-2.5 rounded-xl border border-purple-200 text-sm text-gray-800 bg-white
                    focus:outline-none focus:ring-2 focus:ring-purple-300/50 placeholder:text-gray-400"
                />
              </div>
              {aiError && (
                <div className="flex items-center gap-2 p-3 rounded-xl bg-red-50 border border-red-200">
                  <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0" />
                  <p className="text-sm text-red-600">{aiError}</p>
                </div>
              )}
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={handleAIGenerate}
                  disabled={aiIsGenerating || !aiTopic.trim()}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold
                    bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:from-purple-700 hover:to-indigo-700
                    transition-all disabled:opacity-50"
                >
                  {aiIsGenerating ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Sparkles className="w-4 h-4" />
                  )}
                  {aiIsGenerating ? "Створення..." : "Створити контент"}
                </button>
                <button
                  type="button"
                  onClick={handleTitleSuggestions}
                  disabled={isGeneratingTitles || (!aiTopic.trim() && !title.trim())}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold
                    border border-purple-200 text-purple-700 hover:bg-purple-50 transition-colors disabled:opacity-50"
                >
                  {isGeneratingTitles ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Wand2 className="w-4 h-4" />
                  )}
                  Пропонувати заголовок
                </button>
              </div>
              {titleSuggestions.length > 0 && (
                <div className="space-y-1.5 mt-2">
                  <p className="text-xs font-semibold text-purple-800">Пропозиції заголовків:</p>
                  {titleSuggestions.map((t, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => {
                        autoSlug(t);
                        setTitleSuggestions([]);
                      }}
                      className="block w-full text-left px-3 py-2 rounded-lg text-sm text-purple-800
                        bg-white/70 hover:bg-white border border-purple-100 transition-colors"
                    >
                      {t}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        <form action={formAction} className="space-y-5">
          {state && !state.success && (
            <div className="flex items-center gap-2 p-3 rounded-xl bg-red-50 border border-red-200">
              <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0" />
              <p className="text-sm text-red-600">{state.message}</p>
            </div>
          )}
          {state?.success && isEdit && (
            <div className="flex items-center gap-2 p-3 rounded-xl bg-emerald-50 border border-emerald-200">
              <p className="text-sm text-emerald-600">{state.message}</p>
            </div>
          )}

          {/* Title */}
          <div className="p-6 rounded-2xl bg-white border border-gray-200/80">
            <div className="space-y-4">
              <div>
                <label htmlFor="title" className="block text-xs font-medium text-gray-600 mb-1">
                  Заголовок <span className="text-red-400">*</span>
                </label>
                <input
                  id="title"
                  type="text"
                  name="title"
                  value={title}
                  onChange={(e) => autoSlug(e.target.value)}
                  required
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-base font-semibold text-gray-800
                    focus:outline-none focus:ring-2 focus:ring-[#C9A84C]/30"
                  placeholder="Заголовок статті"
                />
              </div>
              <div>
                <label htmlFor="slug" className="block text-xs font-medium text-gray-600 mb-1">
                  URL Slug <span className="text-red-400">*</span>
                </label>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-400">/blog/</span>
                  <input
                    id="slug"
                    type="text"
                    name="slug"
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                    required
                    className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-800
                      focus:outline-none focus:ring-2 focus:ring-[#C9A84C]/30"
                    placeholder="url-slug"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 rounded-2xl bg-white border border-gray-200/80">
            <div className="flex items-center justify-between mb-3">
              <label htmlFor="content" className="text-xs font-medium text-gray-600 flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-gray-400" />
                Контент (Markdown) <span className="text-red-400">*</span>
              </label>
              <button
                type="button"
                onClick={() => setShowPreview(!showPreview)}
                className="inline-flex items-center gap-1 text-xs text-gray-500 hover:text-gray-700"
              >
                {showPreview ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                {showPreview ? "Редагувати" : "Перегляд"}
              </button>
            </div>
            {showPreview ? (
              <div
                className="prose prose-sm max-w-none min-h-[400px] p-4 rounded-xl bg-gray-50 border border-gray-100"
                dangerouslySetInnerHTML={{ __html: simpleMarkdownToHtml(content) }}
              />
            ) : (
              <textarea
                id="content"
                name="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
                rows={20}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm text-gray-800 
                  font-mono resize-y focus:outline-none focus:ring-2 focus:ring-[#C9A84C]/30"
                  placeholder="Контент статті у форматі Markdown..."
              />
            )}
          </div>

          {/* Hidden fields */}
          <input type="hidden" name="excerpt" value={excerpt} />
          <input type="hidden" name="metaDescription" value={metaDesc} />
          <input type="hidden" name="metaKeywords" value={metaKeywords} />
          <input type="hidden" name="status" value={statusVal} />
          <input type="hidden" name="coverImageUrl" value="" />
          <input type="hidden" name="categoryId" value="" />
          {isAiGenerated && <input type="hidden" name="aiGenerated" value="true" />}

          {/* Submit */}
          <div className="flex items-center gap-3">
            <button
              type="submit"
              disabled={isPending}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold
                bg-[#0A1628] hover:bg-[#1B2A4A] text-white transition-colors disabled:opacity-50"
            >
              {isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              {isEdit ? "Оновити" : "Зберегти"}
            </button>
            {!isEdit && (
              <button
                type="submit"
                disabled={isPending}
                onClick={() => setStatusVal("published")}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold
                  bg-emerald-600 hover:bg-emerald-700 text-white transition-colors disabled:opacity-50"
              >
                <Globe className="w-4 h-4" />
                Опублікувати
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Sidebar */}
      <div className="space-y-5">
        {/* Status & Settings */}
        <div className="p-5 rounded-2xl bg-white border border-gray-200/80 space-y-4">
          <h3 className="text-sm font-bold text-gray-800 flex items-center gap-2">
            <FileText className="w-4 h-4 text-gray-400" />
            Налаштування
          </h3>
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Статус</label>
            <select
              value={statusVal}
              onChange={(e) => setStatusVal(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-800
                focus:outline-none focus:ring-2 focus:ring-[#C9A84C]/30"
            >
              <option value="draft">Чернетка</option>
              <option value="published">Опубліковано</option>
              <option value="archived">Архів</option>
            </select>
          </div>
          {isAiGenerated && (
            <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-purple-50 text-purple-700 text-xs font-semibold">
              <Bot className="w-3.5 h-3.5" />
              Створено AI
            </div>
          )}
        </div>

        {/* SEO */}
        <div className="p-5 rounded-2xl bg-white border border-gray-200/80 space-y-4">
          <h3 className="text-sm font-bold text-gray-800 flex items-center gap-2">
            <Globe className="w-4 h-4 text-gray-400" />
            SEO
          </h3>
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Опис</label>
            <textarea
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              rows={2}
              className="w-full px-3 py-2 rounded-xl border border-gray-200 text-sm text-gray-800 resize-none
                focus:outline-none focus:ring-2 focus:ring-[#C9A84C]/30"
              placeholder="Короткий опис (макс 200 символів)"
            />
            <p className="text-[10px] text-gray-400 mt-1">{excerpt.length}/200</p>
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Мета опис</label>
            <textarea
              value={metaDesc}
              onChange={(e) => setMetaDesc(e.target.value)}
              rows={2}
              className="w-full px-3 py-2 rounded-xl border border-gray-200 text-sm text-gray-800 resize-none
                focus:outline-none focus:ring-2 focus:ring-[#C9A84C]/30"
              placeholder="Мета опис (макс 155 символів)"
            />
            <p className="text-[10px] text-gray-400 mt-1">{metaDesc.length}/155</p>
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1 flex items-center gap-1">
              <Tag className="w-3 h-3" /> Ключові слова
            </label>
            <input
              type="text"
              value={metaKeywords}
              onChange={(e) => setMetaKeywords(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-gray-200 text-sm text-gray-800
                focus:outline-none focus:ring-2 focus:ring-[#C9A84C]/30"
              placeholder="kelime1, kelime2, kelime3"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

// Simple markdown to html for preview (basic)
function simpleMarkdownToHtml(md: string): string {
  return md
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/^### (.+)$/gm, "<h3>$1</h3>")
    .replace(/^## (.+)$/gm, "<h2>$1</h2>")
    .replace(/^# (.+)$/gm, "<h1>$1</h1>")
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.+?)\*/g, "<em>$1</em>")
    .replace(/\n\n/g, "</p><p>")
    .replace(/^/, "<p>")
    .replace(/$/, "</p>");
}
