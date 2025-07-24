import Header from "@/components/page/Header";
import VehiclesCont from "@/components/page/home/vehicles/VehiclesCont";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Vehículos | Telovendo",
  description:
    "Telovendo, concesionario de automoviles, Santa Fe, Argentina.",
};

const Page = () => {
  return (
    <>
      <Header />
      <VehiclesCont />
    </>
  );
};

export default Page;
