import { getReminders } from "./actions";
import RemindersList from "./RemindersList";

export default async function RemindersPage({
  searchParams,
}: {
  searchParams: Promise<{ show?: string }>;
}) {
  const params = await searchParams;
  const showCompleted = params.show === "completed";

  let reminders: Awaited<ReturnType<typeof getReminders>> = [];
  try {
    reminders = await getReminders({ showCompleted });
  } catch {
    // DB not connected
  }

  return (
    <div className="space-y-6 max-w-5xl">
      <div>
        <h1 className="text-2xl font-serif font-bold text-gray-900">Hatırlatmalar</h1>
        <p className="text-sm text-gray-500 mt-1">Önemli tarihleri ve görevleri takip edin</p>
      </div>
      <RemindersList initialReminders={reminders} showCompleted={showCompleted} />
    </div>
  );
}
