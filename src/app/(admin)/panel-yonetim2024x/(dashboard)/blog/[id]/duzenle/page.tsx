import { notFound } from "next/navigation";
import { getBlogPostById } from "../../actions";
import BlogPostForm from "../../components/BlogPostForm";

export default async function EditBlogPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  let post;
  try {
    post = await getBlogPostById(id);
  } catch {
    notFound();
  }
  if (!post) notFound();

  return (
    <div className="space-y-6 max-w-7xl">
      <div>
        <h1 className="text-2xl font-serif font-bold text-gray-900">Редагувати статтю</h1>
        <p className="text-sm text-gray-500 mt-1 truncate max-w-lg">{post.title}</p>
      </div>
      <BlogPostForm post={post} />
    </div>
  );
}
