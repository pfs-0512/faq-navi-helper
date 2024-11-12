import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { faqData } from "@/lib/faq-data";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";

const FAQ = () => {
  const [selectedCategory, setSelectedCategory] = useState<"料金" | "サービス">("料金");
  const [openItem, setOpenItem] = useState<number | null>(null);

  const categories = ["料金", "サービス"] as const;
  const filteredFAQs = faqData.filter((item) => item.category === selectedCategory);

  const toggleItem = (index: number) => {
    setOpenItem(openItem === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-[#f3f9fc] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-900">
          よくある質問
        </h1>

        <div className="flex space-x-4 mb-8 justify-center">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={cn(
                "px-6 py-2 rounded-full text-sm font-medium transition-colors duration-200 shadow-sm",
                selectedCategory === category
                  ? "bg-blue-500 text-white shadow-md transform scale-105"
                  : "bg-white text-gray-600 hover:bg-gray-50 hover:text-blue-500"
              )}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="space-y-4">
          {filteredFAQs.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 hover:shadow-md transition-shadow duration-200"
            >
              <button
                onClick={() => toggleItem(index)}
                className={cn(
                  "w-full px-6 py-4 text-left flex justify-between items-center transition-colors duration-200",
                  openItem === index
                    ? "bg-blue-50"
                    : "hover:bg-gray-50"
                )}
              >
                <span className="font-medium text-gray-900 flex-1 pr-4">{item.question}</span>
                <ChevronDown
                  className={cn(
                    "w-5 h-5 text-blue-500 transition-transform duration-200",
                    openItem === index ? "transform rotate-180" : ""
                  )}
                />
              </button>
              <AnimatePresence>
                {openItem === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 py-4 text-gray-600 bg-gray-50">
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