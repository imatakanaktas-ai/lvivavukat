import DocumentGenerator from "./DocumentGenerator";
import { getTemplates, getClientsForSelect } from "./actions";

export default async function DocumentsPage() {
  let templates: Awaited<ReturnType<typeof getTemplates>> = [];
  let clientsList: Awaited<ReturnType<typeof getClientsForSelect>> = [];
  try {
    [templates, clientsList] = await Promise.all([
      getTemplates(),
      getClientsForSelect(),
    ]);
  } catch {
    // DB not connected
  }

  return (
    <div className="space-y-6 max-w-6xl">
      <div>
        <h1 className="text-2xl font-serif font-bold text-gray-900">Генератор документів</h1>
        <p className="text-sm text-gray-500 mt-1">
          Створюйте професійні юридичні документи з шаблонів або за допомогою AI
        </p>
      </div>
      <DocumentGenerator templates={templates} clients={clientsList} />
    </div>
  );
}
