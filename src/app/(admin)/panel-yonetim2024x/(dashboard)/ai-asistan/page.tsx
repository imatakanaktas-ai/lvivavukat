import AIChat from "./AIChat";
import AITrainingPanel from "./AITrainingPanel";

export default function AIAssistantPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-serif font-bold text-gray-900">AI Юридичний Асистент</h1>
        <p className="text-sm text-gray-500 mt-1">
          Ставте питання про українське право, створюйте чернетки документів
        </p>
      </div>
      <div className="grid grid-cols-1 xl:grid-cols-5 gap-6">
        <div className="xl:col-span-3">
          <AIChat />
        </div>
        <div className="xl:col-span-2">
          <AITrainingPanel />
        </div>
      </div>
    </div>
  );
}
