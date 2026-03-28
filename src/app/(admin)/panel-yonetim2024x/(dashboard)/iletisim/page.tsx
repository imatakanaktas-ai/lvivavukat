import { MessageSquare } from "lucide-react";
import { getContactSubmissions } from "./actions";
import SubmissionsList from "./SubmissionsList";

export default async function ContactSubmissionsPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const params = await searchParams;
  let data;
  try {
    data = await getContactSubmissions({
      page: params.page ? parseInt(params.page) : 1,
    });
  } catch {
    data = { submissions: [], total: 0, page: 1, totalPages: 0 };
  }

  return (
    <div className="space-y-6 max-w-5xl">
      <div>
        <h1 className="text-2xl font-serif font-bold text-gray-900">Контактні форми</h1>
        <p className="text-sm text-gray-500 mt-1">
          Всього {data.total} контактних форм
        </p>
      </div>

      {data.submissions.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 bg-white rounded-2xl border border-gray-200/80">
          <MessageSquare className="w-12 h-12 text-gray-200 mb-4" />
          <p className="text-gray-500 font-medium">Контактних форм поки немає</p>
        </div>
      ) : (
        <SubmissionsList
          submissions={data.submissions}
          page={data.page}
          totalPages={data.totalPages}
        />
      )}
    </div>
  );
}
