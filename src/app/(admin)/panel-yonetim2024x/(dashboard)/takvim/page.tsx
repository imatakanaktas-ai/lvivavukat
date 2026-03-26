import { getCalendarEvents } from "./actions";
import CalendarView from "./CalendarView";

export default async function CalendarPage() {
  let events: Awaited<ReturnType<typeof getCalendarEvents>> = [];
  try {
    events = await getCalendarEvents();
  } catch {
    // DB not connected
  }

  return (
    <div className="space-y-6 max-w-7xl">
      <div>
        <h1 className="text-2xl font-serif font-bold text-gray-900">Takvim</h1>
        <p className="text-sm text-gray-500 mt-1">Etkinliklerinizi ve randevularınızı yönetin</p>
      </div>
      <CalendarView initialEvents={events} />
    </div>
  );
}
