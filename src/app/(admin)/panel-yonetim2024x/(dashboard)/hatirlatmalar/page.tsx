import { getAllEvents } from "./actions";
import EventsDashboard from "./EventsDashboard";

export default async function RemindersPage() {
  let data: Awaited<ReturnType<typeof getAllEvents>> = { items: [], clients: [] };
  try {
    data = await getAllEvents();
  } catch {
    // DB not connected
  }

  return (
    <div className="space-y-6 max-w-7xl">
      <div>
        <h1 className="text-2xl font-serif font-bold text-gray-900">Takip Merkezi</h1>
        <p className="text-sm text-gray-500 mt-1">Hatırlatmalar, ödemeler ve mahkeme tarihlerini tek yerden yönetin</p>
      </div>
      <EventsDashboard initialItems={data.items} clientList={data.clients} />
    </div>
  );
}
