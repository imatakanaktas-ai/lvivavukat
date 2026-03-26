import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getClientById } from "../../actions";
import ClientForm from "../../components/ClientForm";

const ADMIN_PREFIX = process.env.ADMIN_ROUTE_PREFIX || "panel-yonetim2024x";

export default async function EditClientPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  let client;
  try {
    client = await getClientById(id);
  } catch {
    client = null;
  }

  if (!client) notFound();

  return (
    <div className="max-w-3xl space-y-6">
      <div className="flex items-center gap-4">
        <Link
          href={`/${ADMIN_PREFIX}/muvekiller/${client.id}`}
          className="w-9 h-9 rounded-xl bg-white border border-gray-200 flex items-center justify-center 
            text-gray-500 hover:text-gray-800 hover:border-gray-300 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
        </Link>
        <div>
          <h1 className="text-2xl font-serif font-bold text-gray-900">
            {client.firstName} {client.lastName}
          </h1>
          <p className="text-sm text-gray-500 mt-0.5">Müvekkil bilgilerini düzenleyin</p>
        </div>
      </div>
      <ClientForm client={client} />
    </div>
  );
}
