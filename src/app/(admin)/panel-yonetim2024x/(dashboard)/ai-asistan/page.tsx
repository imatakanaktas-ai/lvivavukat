import AIChat from "./AIChat";

export default function AIAssistantPage() {
  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-2xl font-serif font-bold text-gray-900">AI Hukuk Asistanı</h1>
        <p className="text-sm text-gray-500 mt-1">
          Ukrayna hukuku hakkında sorular sorun, belge taslakları oluşturun
        </p>
      </div>
      <AIChat />
    </div>
  );
}
