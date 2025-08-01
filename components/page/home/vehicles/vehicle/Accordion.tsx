"use client";
import { ICar } from "@/app/models/car";
import { motion } from "framer-motion";
import { useState } from "react";

const Accordion = ({
  title,
  vehicleData,
  index,
  activeIndex,
  setActiveIndex,
}: {
  title: string;
  vehicleData: ICar;
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
        className="flex items-center justify-between w-full h-full px-6 py-6"
      >
        <span className="font-medium text-left text-md xl:text-lg text-black">{title}</span>
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
        <p className={`overflow-hidden text-sm md:text-base text-black ${isActive ? "py-3" : "py-0"}`}>
          
        </p>
      </div>
    </motion.div>
  );
};

export default Accordion;
