import Header from "@/components/page/Header";
import VehiclesCont from "@/components/page/home/vehicles/VehiclesCont";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Vehículos | Aspen Automotores",
  description:
    "Distrito Automotor, concesionaria de vehículos ubicada en Mar del Plata, Buenos Aires",
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
