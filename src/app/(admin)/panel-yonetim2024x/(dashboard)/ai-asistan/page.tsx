import AIChat from "./AIChat";
import AITrainingPanel from "./AITrainingPanel";

// A research reply runs draft → audit → revise and regularly needs more than
// the platform's 300 s default, which cut the request off and left the lawyer
// with an error page. 800 s is the Vercel Pro ceiling; the Server Actions on
// this page inherit it. REQUEST_BUDGET_MS in actions.ts must stay below it.
export const maxDuration = 800;

export default function AIAssistantPage() {
  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-serif font-bold text-gray-900">AI Юридичний Асистент</h1>
        <p className="text-sm text-gray-500 mt-1">
          Ставте питання, завантажуйте документи, отримуйте юридичні консультації
        </p>
      </div>
      <div className="grid grid-cols-1 2xl:grid-cols-7 gap-4">
        <div className="2xl:col-span-5">
          <AIChat />
        </div>
        <div className="2xl:col-span-2">
          <AITrainingPanel />
        </div>
      </div>
    </div>
  );
}
