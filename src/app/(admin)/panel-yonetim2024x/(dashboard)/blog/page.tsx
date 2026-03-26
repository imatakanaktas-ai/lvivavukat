import Link from "next/link";
import {
  PenTool,
  Plus,
  Search,
  Eye,
  Pencil,
  Bot,
  Clock,
  FileText,
  CheckCircle2,
  Archive,
} from "lucide-react";
import { getBlogPosts } from "./actions";

const ADMIN_PREFIX = process.env.ADMIN_ROUTE_PREFIX || "panel-yonetim2024x";

const statusConfig: Record<string, { label: string; color: string; icon: typeof CheckCircle2 }> = {
  published: { label: "Yayında", color: "bg-emerald-100 text-emerald-700", icon: CheckCircle2 },
  draft: { label: "Taslak", color: "bg-amber-100 text-amber-700", icon: FileText },
  archived: { label: "Arşiv", color: "bg-gray-100 text-gray-500", icon: Archive },
};

export default async function BlogListPage({
  searchParams,
}: {
  searchParams: Promise<{ search?: string; status?: string; page?: string }>;
}) {
  const params = await searchParams;
  let data;
  try {
    data = await getBlogPosts({
      search: params.search,
      status: params.status,
      page: params.page ? parseInt(params.page) : 1,
    });
  } catch {
    data = { posts: [], total: 0, page: 1, totalPages: 0 };
  }

  return (
    <div className="space-y-6 max-w-7xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-serif font-bold text-gray-900">Blog Yazıları</h1>
          <p className="text-sm text-gray-500 mt-1">Toplam {data.total} yazı</p>
        </div>
        <div className="flex gap-3">
          <Link
            href={`/${ADMIN_PREFIX}/blog/yeni?ai=true`}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-indigo-600 
              hover:from-purple-700 hover:to-indigo-700 text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition-all"
          >
            <Bot className="w-4 h-4" />
            AI ile Yaz
          </Link>
          <Link
            href={`/${ADMIN_PREFIX}/blog/yeni`}
            className="inline-flex items-center gap-2 bg-[#0A1628] hover:bg-[#1B2A4A] text-white 
              px-5 py-2.5 rounded-xl text-sm font-semibold transition-colors"
          >
            <Plus className="w-4 h-4" />
            Yeni Yazı
          </Link>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <form className="flex-1 relative" action={`/${ADMIN_PREFIX}/blog`}>
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            name="search"
            defaultValue={params.search}
            placeholder="Başlık ara..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-gray-200 text-sm 
              text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#C9A84C]/30"
          />
          {params.status && <input type="hidden" name="status" value={params.status} />}
        </form>
        <div className="flex gap-2">
          {["all", "published", "draft", "archived"].map((s) => (
            <Link
              key={s}
              href={`/${ADMIN_PREFIX}/blog?status=${s}${params.search ? `&search=${params.search}` : ""}`}
              className={`px-4 py-2.5 rounded-xl text-xs font-semibold transition-colors
                ${(params.status || "all") === s
                  ? "bg-[#0A1628] text-white"
                  : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50"
                }`}
            >
              {s === "all" ? "Tümü" : s === "published" ? "Yayında" : s === "draft" ? "Taslak" : "Arşiv"}
            </Link>
          ))}
        </div>
      </div>

      {/* Posts Grid */}
      {data.posts.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 bg-white rounded-2xl border border-gray-200/80">
          <PenTool className="w-12 h-12 text-gray-200 mb-4" />
          <p className="text-gray-500 font-medium">Henüz blog yazısı yok</p>
          <p className="text-sm text-gray-400 mt-1">
            {params.search ? "Aramanızla eşleşen sonuç bulunamadı." : "İlk yazınızı oluşturun."}
          </p>
        </div>
      ) : (
        <>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {data.posts.map((post) => {
              const st = statusConfig[post.status] || statusConfig.draft;
              const StatusIcon = st.icon;
              return (
                <div
                  key={post.id}
                  className="group bg-white rounded-2xl border border-gray-200/80 overflow-hidden hover:shadow-md transition-shadow"
                >
                  {/* Color bar */}
                  <div
                    className={`h-1 ${
                      post.status === "published"
                        ? "bg-emerald-500"
                        : post.status === "draft"
                          ? "bg-amber-400"
                          : "bg-gray-300"
                    }`}
                  />
                  <div className="p-5">
                    <div className="flex items-center gap-2 mb-3">
                      <span
                        className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-semibold ${st.color}`}
                      >
                        <StatusIcon className="w-3 h-3" />
                        {st.label}
                      </span>
                      {post.aiGenerated && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-semibold text-purple-700 bg-purple-50">
                          <Bot className="w-3 h-3" />
                          AI
                        </span>
                      )}
                      {post.readingTime && (
                        <span className="flex items-center gap-1 text-[11px] text-gray-400">
                          <Clock className="w-3 h-3" />
                          {post.readingTime} dk
                        </span>
                      )}
                    </div>

                    <h3 className="text-sm font-bold text-gray-800 mb-2 line-clamp-2 group-hover:text-[#0A1628]">
                      {post.title}
                    </h3>

                    {post.excerpt && (
                      <p className="text-xs text-gray-500 line-clamp-2 mb-4">{post.excerpt}</p>
                    )}

                    <div className="flex items-center justify-between">
                      <p className="text-[11px] text-gray-400">
                        {post.publishedAt
                          ? new Date(post.publishedAt).toLocaleDateString("tr-TR", {
                              day: "numeric",
                              month: "short",
                              year: "numeric",
                            })
                          : new Date(post.createdAt).toLocaleDateString("tr-TR", {
                              day: "numeric",
                              month: "short",
                              year: "numeric",
                            })}
                      </p>
                      <div className="flex gap-1">
                        {post.status === "published" && (
                          <Link
                            href={`/blog/${post.slug}`}
                            target="_blank"
                            className="p-1.5 rounded-lg text-gray-400 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                            title="Önizle"
                          >
                            <Eye className="w-4 h-4" />
                          </Link>
                        )}
                        <Link
                          href={`/${ADMIN_PREFIX}/blog/${post.id}/duzenle`}
                          className="p-1.5 rounded-lg text-gray-400 hover:text-[#C9A84C] hover:bg-amber-50 transition-colors"
                          title="Düzenle"
                        >
                          <Pencil className="w-4 h-4" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Pagination */}
          {data.totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 pt-4">
              {Array.from({ length: data.totalPages }, (_, i) => i + 1).map((p) => (
                <Link
                  key={p}
                  href={`/${ADMIN_PREFIX}/blog?page=${p}${params.status ? `&status=${params.status}` : ""}${params.search ? `&search=${params.search}` : ""}`}
                  className={`w-9 h-9 flex items-center justify-center rounded-lg text-sm font-semibold transition-colors
                    ${p === data.page
                      ? "bg-[#0A1628] text-white"
                      : "text-gray-500 hover:bg-gray-100"
                    }`}
                >
                  {p}
                </Link>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
