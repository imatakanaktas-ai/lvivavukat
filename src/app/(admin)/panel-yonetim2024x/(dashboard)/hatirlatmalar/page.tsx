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
        <h1 className="text-2xl font-serif font-bold text-gray-900">Центр контролю</h1>
        <p className="text-sm text-gray-500 mt-1">Керуйте нагадуваннями, оплатами та судовими датами в одному місці</p>
      </div>
      <EventsDashboard initialItems={data.items} clientList={data.clients} />
    </div>
  );
}
