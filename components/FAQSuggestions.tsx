"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles } from "lucide-react";

interface FAQSuggestionsProps {
  questions: string[];
  onSelect: (q: string) => void;
}

const FAQSuggestions: React.FC<FAQSuggestionsProps> = ({ questions, onSelect }) => {
  if (!questions || questions.length === 0) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 10 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="flex flex-col items-end gap-3 p-4 bg-gradient-to-r from-gray-50 via-gray-100 to-gray-50 border-t shadow-inner rounded-t-lg"
      >
        {/* Heading */}
        <div className="flex items-center gap-1 self-end text-gray-700">
          <Sparkles className="h-4 w-4 text-[#4D7DFB]" />
          <h3 className="text-sm font-medium tracking-wide">You could also ask:</h3>
        </div>

        {/* Suggestions */}
        <div className="flex flex-col items-end gap-2 w-full sm:w-auto p-1">
          {questions.map((q, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.08 }}
            >
              <Button
                variant="outline"
                onClick={() => onSelect(q)}
                className="text-sm text-right max-w-lg whitespace-normal px-4 py-2 border-[#4D7DFB]/50 hover:bg-[#4D7DFB]/10 hover:border-[#4D7DFB] hover:text-[#4D7DFB] transition-all duration-200 rounded-lg shadow-sm"
              >
                {q}
              </Button>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default FAQSuggestions;
