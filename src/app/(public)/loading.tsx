import { Scale } from "lucide-react";

export default function Loading() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-[#C9A84C]/10 border border-[#C9A84C]/20 animate-pulse mb-4">
          <Scale className="w-7 h-7 text-[#C9A84C]" />
        </div>
        <div className="flex items-center gap-1.5 justify-center">
          <div className="w-2 h-2 rounded-full bg-[#C9A84C] animate-bounce [animation-delay:-0.3s]" />
          <div className="w-2 h-2 rounded-full bg-[#C9A84C] animate-bounce [animation-delay:-0.15s]" />
          <div className="w-2 h-2 rounded-full bg-[#C9A84C] animate-bounce" />
        </div>
      </div>
    </div>
  );
}
