"use client";
import React from "react";
import { MdHomeWork } from "react-icons/md";
import { GiStarsStack } from "react-icons/gi";
import { TbHomeDollar } from "react-icons/tb";
import { PiUsersThreeFill } from "react-icons/pi";
import { Separator } from "@/components/ui/separator";
import AnimatedCounter from "./AnimatedCounter";
import { IoCarSportSharp } from "react-icons/io5";

const Counters = () => {
  return (
    <>
      <Separator className="w-2/3 mx-auto mt-16 mb-5" />
      <div className="flex flex-col items-center justify-around w-full gap-10 py-10 sm:flex-row sm:gap-0 h-fit">
        <div className="flex flex-col items-center justify-center gap-4 w-fit h-fit">
          <GiStarsStack className="text-orange-600" size={100} />
          <div className="flex flex-col items-center ">
            <span className="text-2xl font-bold">
              +<AnimatedCounter from={0} to={5} />
            </span>
            <span className="text-xl font-semibold">Años en el mercado</span>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center gap-4 w-fit h-fit">
          <IoCarSportSharp  className="text-orange-600" size={100} />
          <div className="flex flex-col items-center ">
            <span className="text-2xl font-bold">
              +<AnimatedCounter from={0} to={12} />
            </span>
            <span className="text-xl font-semibold">Unidades disponibles</span>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center gap-4 w-fit h-fit">
          <PiUsersThreeFill className="text-orange-600" size={100} />
          <div className="flex flex-col items-center ">
            <span className="text-2xl font-bold">
              +<AnimatedCounter from={0} to={400} />
            </span>
            <span className="text-xl font-semibold">Clientes satisfechos</span>
          </div>
        </div>
      </div>
      <Separator className="w-2/3 mx-auto my-5" />
    </>
  );
};

export default Counters;
