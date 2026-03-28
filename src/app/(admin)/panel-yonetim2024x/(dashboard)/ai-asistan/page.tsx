import AIChat from "./AIChat";

export default function AIAssistantPage() {
  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-2xl font-serif font-bold text-gray-900">AI Юридичний Асистент</h1>
        <p className="text-sm text-gray-500 mt-1">
          Ставте питання про українське право, створюйте чернетки документів
        </p>
      </div>
      <AIChat />
    </div>
  );
}
