"use client";

import { MessageCircle } from "lucide-react";
import { motion } from "framer-motion";

export default function WhatsAppButton() {
  return (
    <motion.a
      href="https://wa.me/380000000000"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 
        bg-[#25D366] hover:bg-[#20BD5A] text-white rounded-full shadow-lg shadow-[#25D366]/30 
        transition-all duration-300 hover:scale-110 group"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1, type: "spring", stiffness: 200 }}
      aria-label="WhatsApp ile iletişime geçin"
    >
      <MessageCircle className="w-7 h-7" />
      {/* Pulse ring */}
      <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-25" />
      
      {/* Tooltip */}
      <span className="absolute right-full mr-3 px-3 py-1.5 bg-white text-foreground text-sm 
        font-medium rounded-lg shadow-lg whitespace-nowrap opacity-0 group-hover:opacity-100 
        transition-opacity pointer-events-none">
        Bize yazın!
      </span>
    </motion.a>
  );
}
