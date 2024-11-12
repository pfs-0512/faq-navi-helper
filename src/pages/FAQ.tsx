import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { faqData, FAQItem } from "@/lib/faq-data";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";

const FAQ = () => {
  const [selectedCategory, setSelectedCategory] = useState<"料金" | "サービス">("料金");
  const [openItems, setOpenItems] = useState<number[]>([]);

  const categories = ["料金", "サービス"] as const;
  const filteredFAQs = faqData.filter((item) => item.category === selectedCategory);

  const toggleItem = (index: number) => {
    setOpenItems((current) =>
      current.includes(index)
        ? current.filter((i) => i !== index)
        : [...current, index]
    );
  };

  return (
    <div className="min-h-screen bg-[#f3f9fc] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-900">
          よくある質問
        </h1>

        {/* Category Tabs */}
        <div className="flex space-x-4 mb-8 justify-center">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={cn(
                "px-6 py-2 rounded-full text-sm font-medium transition-colors",
                selectedCategory === category
                  ? "bg-blue-500 text-white"
                  : "bg-white text-gray-600 hover:bg-gray-100"
              )}
            >
              {category}
            </button>
          ))}
        </div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {filteredFAQs.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-sm overflow-hidden"
            >
              <button
                onClick={() => toggleItem(index)}
                className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50"
              >
                <span className="font-medium text-gray-900">{item.question}</span>
                <ChevronDown
                  className={cn(
                    "w-5 h-5 text-gray-500 transition-transform",
                    openItems.includes(index) ? "transform rotate-180" : ""
                  )}
                />
              </button>
              <AnimatePresence>
                {openItems.includes(index) && (
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: "auto" }}
                    exit={{ height: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 py-4 text-gray-600 border-t border-gray-100">
                      {item.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQ;