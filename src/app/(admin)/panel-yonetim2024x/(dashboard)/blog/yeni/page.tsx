import BlogPostForm from "../components/BlogPostForm";

export default async function NewBlogPostPage({
  searchParams,
}: {
  searchParams: Promise<{ ai?: string }>;
}) {
  const params = await searchParams;
  const aiMode = params.ai === "true";

  return (
    <div className="space-y-6 max-w-7xl">
      <div>
        <h1 className="text-2xl font-serif font-bold text-gray-900">
          {aiMode ? "Створити статтю з AI" : "Нова стаття"}
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          {aiMode
            ? "Введіть тему, AI створить професійну статтю"
            : "Створіть нову статтю блогу"}
        </p>
      </div>
      <BlogPostForm aiMode={aiMode} />
    </div>
  );
}
