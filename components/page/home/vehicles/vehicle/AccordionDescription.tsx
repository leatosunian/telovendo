"use client";
import { ICar } from "@/app/models/car";
import { motion } from "framer-motion";
import { useState } from "react";

const AccordionDescription = ({
  title,
  description,
  index,
  activeIndex,
  setActiveIndex,
}: {
  title: string;
  description: string;
  index: number;
  activeIndex: number | null;
  setActiveIndex: (index: number | null) => void;
}) => {
  const isActive = index === activeIndex;

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ amount: "all", once: true }}
      className="w-full mb-6 text-white h-fit accordionCard"
    >
      <button
        onClick={() => setActiveIndex(isActive ? null : index)}
        className="flex items-center justify-between w-full h-full px-4 py-3"
      >
        <span className="font-medium text-left text-sm  text-black">{title}</span>
        <svg
          className="ml-8 fill-orange-600 shrink-0"
          width="16"
          height="16"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            y="7"
            width="16"
            height="2"
            rx="1"
            className={`transform origin-center transition duration-200 ease-out ${isActive && "!rotate-180"
              }`}
          />
          <rect
            y="7"
            width="16"
            height="2"
            rx="1"
            className={`transform origin-center rotate-90 transition duration-200 ease-out ${isActive && "!rotate-180"
              }`}
          />
        </svg>
      </button>

      <div
        className={`grid overflow-hidden accordionAnswer transition-all duration-300 ease-in-out text-sm  ${isActive
          ? "grid-rows-[1fr] opacity-100 px-6 py-3"
          : "grid-rows-[0fr] opacity-0 px-0 py-0"
          }`}
      >
        <pre style={{ font: "inherit", textWrap: "wrap" }}
          className={`w-full text-xs overflow-hidden text-gray-500  ${isActive ? `pb-1` : "pb-0"} `}>
          {description}
        </pre>
      </div>
    </motion.div>
  );
};

export default AccordionDescription;
