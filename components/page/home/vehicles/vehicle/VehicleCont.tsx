"use client";
import 'react-medium-image-zoom/dist/styles.css';

import Breadcrumbs from "@/components/page/home/vehicles/vehicle/Breadcrumbs";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import styles from "@/app/css-modules/vehicles/vehicle/vehicle.module.css";
import { IoSpeedometerOutline } from "react-icons/io5";
import { MdOutlineCalendarMonth } from "react-icons/md";
import { GiGearStickPattern } from "react-icons/gi";
import { PiEngineBold, PiGasPump } from "react-icons/pi";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { ICar } from "@/app/models/car";
import { ICarImage } from "@/app/models/carimage";
import { useParams } from "next/navigation";
import { type CarouselApi } from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import RelatedVehicles from "@/components/page/home/vehicles/vehicle/RelatedVehicles";
import LoaderFullscreen from "@/components/page/LoaderFullscreen";
import { FaLocationDot } from "react-icons/fa6";
import Link from "next/link";
import Accordion from "./Accordion";

import { AppWindowIcon, CodeIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import AccordionDescription from "./AccordionDescription";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import Zoom from 'react-medium-image-zoom';

const VehicleCont = () => {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);
  const [vehicleData, setVehicleData] = useState<ICar>();
  const [gallery, setGallery] = useState<ICarImage[]>([]);
  const [latestVehicles, setLatestVehicles] = useState<ICar[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [activeAccordionIndex, setActiveAccordionIndex] = useState<number | null>(0);
  const [isOpen, setIsOpen] = useState(false);
  const [galleryIndex, setGalleryIndex] = useState(0);
  const { uuid } = useParams();

  useEffect(() => { }, []);

  useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  const plugin = React.useRef(
    Autoplay({ delay: 3500, stopOnInteraction: false })
  );

  async function getLastVehicles() {
    const latestVehicles = await fetch("/api/cars/latests/", {
      method: "GET",
      cache: "no-store",
    });
    const cars = await latestVehicles.json();

    if (cars.length !== 0) {
      setLatestVehicles(cars);
      console.log(cars);
    }
    return latestVehicles;
  }

  useEffect(() => {
    getLastVehicles();
    //fetch 10 lastest vehicles
  }, []);

  useEffect(() => {
    console.log(current);
  }, [current]);

  async function getCarData(uuid: string) {
    try {
      // get vehicle data
      const carsFetch = await fetch(`/api/cars/${uuid}`, {
        method: "GET",
        cache: "no-store",
      });
      const cars = await carsFetch.json();
      setVehicleData(cars);
      // get vehicle gallery
      const galleryFetch = await fetch(`/api/gallery/${uuid}`, {
        method: "GET",
        cache: "no-store",
      });
      const gallery = await galleryFetch.json();
      console.log(gallery)
      console.log(cars.image)
      setGallery(gallery);
      setLoading(false);
    } catch (error) {
      return;
    }
  }

  useEffect(() => {
    if (vehicleData?.name !== "") {
      document.title = `${vehicleData?.name} | Distrito Automotor`;
    }
  }, [vehicleData]);

  useEffect(() => {
    getCarData(uuid as string);
  }, [uuid]);

  return (
    <>
      {loading && <LoaderFullscreen />}
      {/* HEADER SEPARATOR */}
      <div className="w-full h-16 md:h-20"></div>

      {/* BREADCRUMBS */}
      <div className="w-full px-6 pt-5 pb-5 md:px-24 2xl:px-64 h-fit">
        <Breadcrumbs name={vehicleData?.name} />
      </div>
      <div className="w-full px-6 py-0 md:py-2 md:px-24 2xl:px-64 h-fit">
        <div className="flex flex-col gap-6 md:flex-row md:gap-20">

          {/* carousel */}
          <div className="relative w-full md:w-3/5 aspect-square ">
            {/* <Image src={car} alt="" className="w-full" width={500} height={500} /> */}
            <div className="relative">
              {/* Carousel */}

              <Carousel
                setApi={setApi}
                className="relative w-full h-full overflow-hidden rounded-lg aspect-square "
                //onMouseEnter={plugin.current.stop}
                //plugins={[plugin.current as any]}
                opts={{
                  align: "start",
                  loop: true,
                  startIndex: galleryIndex
                }}
              //onMouseLeave={plugin.current.reset}
              >
                <CarouselContent className="h-full">
                  <CarouselItem
                    className="w-full h-full overflow-hidden rounded-md "
                  >

                    <Image
                      src={vehicleData?.imagePath!}
                      alt={`Imagen `}
                      width={500}
                      objectFit="cover"
                      onClick={() => {
                        setGalleryIndex(0);
                        setIsOpen(true)
                      }}
                      height={500}
                      unoptimized
                      className="object-cover w-full h-full my-auto rounded-lg"
                    />
                  </CarouselItem>
                  {gallery.map((image, index) => (
                    <CarouselItem
                      key={image.uuid}
                      className="w-full h-full overflow-hidden rounded-md "
                    >
                      {/* <Zoom> */}
                      <Image
                        src={image.path}
                        alt={`Imagen `}
                        width={500}
                        objectFit="cover"
                        height={500}
                        unoptimized
                        onClick={() => { setGalleryIndex(index + 1); setIsOpen(true) }}
                        className="object-cover w-full h-full my-auto rounded-lg"
                      />
                      {/* </Zoom> */}
                    </CarouselItem>
                  ))}
                </CarouselContent>

              </Carousel>

              {/* Custom Indicators */}
              <div className="absolute left-0 right-0 flex justify-center space-x-2 bottom-4">
                {gallery.map((dot, index) => (
                  <button
                    key={dot.uuid}
                    className={`w-2 h-2 rounded-full ${index + 1 === current ? "bg-black" : "bg-gray-300"
                      }`}
                  />
                ))}
              </div>
            </div>
          </div>


          {/* vehicle details */}
          <div className="w-full md:w-2/3">
            {/* title, price and description */}
            <div className="flex flex-col gap-4">
              <h4 className="text-2xl font-semibold md:text-3xl">
                {vehicleData?.name}
              </h4>

              {/* vehicle data */}
              <div className="flex flex-wrap mt-2 gap-y-4 gap-x-8 md:mt-0">
                <div className="flex items-center gap-2 w-fit h-fit">
                  <IoSpeedometerOutline size={25} />
                  <span className="text-sm font-medium">
                    {vehicleData?.kilometers} km
                  </span>
                </div>
                <div className="flex items-center gap-2 w-fit h-fit">
                  <MdOutlineCalendarMonth size={25} />
                  <span className="text-sm font-medium">
                    {vehicleData?.year}
                  </span>
                </div>
                <div className="flex items-center gap-2 w-fit h-fit">
                  <GiGearStickPattern size={25} />
                  {vehicleData?.gearbox === "AUTOMATIC" && (
                    <span className="text-sm font-medium">Automático</span>
                  )}
                  {vehicleData?.gearbox === "MANUAL" && (
                    <span className="text-sm font-medium">Manual</span>
                  )}
                </div>
                <div className="flex items-center gap-2 w-fit h-fit">
                  <PiGasPump size={25} />

                  {vehicleData?.gas === "NAFTA" && (
                    <span className="text-sm font-medium">Nafta</span>
                  )}
                  {vehicleData?.gas === "GNC" && (
                    <span className="text-sm font-medium">GNC</span>
                  )}
                  {vehicleData?.gas === "DIESEL" && (
                    <span className="text-sm font-medium">Diésel</span>
                  )}
                </div>
                <div className="flex items-center gap-2 w-fit h-fit">
                  <PiEngineBold size={25} />
                  <span className="text-sm font-medium">
                    {vehicleData?.motor}
                  </span>
                </div>
              </div>

              <span className="my-3 text-2xl font-semibold md:mb-2">
                {vehicleData?.currency} ${vehicleData?.price}{" "}
              </span>

              {/* <div className="w-full h-fit rounded-xl ">
                <AccordionDescription
                  index={0}
                  activeIndex={activeAccordionIndex}
                  setActiveIndex={setActiveAccordionIndex}
                  description={vehicleData?.description ? vehicleData?.description : ""}
                  title="Descripción"
                />

                <Accordion
                  index={1}
                  activeIndex={activeAccordionIndex}
                  setActiveIndex={setActiveAccordionIndex}
                  vehicleData={vehicleData!}
                  title="Caracteristicas"
                />
              </div> */}

              <div className="h-fit">
                <Tabs defaultValue="description">
                  <TabsList>
                    <TabsTrigger value="description">Descripción</TabsTrigger>
                    <TabsTrigger value="features">Caracteristicas</TabsTrigger>
                  </TabsList>
                  <TabsContent value="description">
                    <Card className="px-4 py-1">
                      {/* <CardTitle>Account</CardTitle> */}
                      <pre
                        style={{ font: "inherit", textWrap: "wrap", fontSize: '14px' }}
                        className="w-full my-2 text-gray-500 h-fit md:my-2"
                      >
                        {vehicleData?.description}
                      </pre>

                    </Card>
                  </TabsContent>
                  <TabsContent value="features">
                    <Card className="flex flex-col gap-3 px-4 py-3 md:flex-row">
                      <div className="flex flex-col items-start justify-center w-full gap-3 h-fit">
                        <span className="text-sm md:text-xs text-wrap"><b>Marca:</b> {vehicleData?.brand} </span>
                        <span className="text-sm md:text-xs text-wrap"><b>Puertas:</b> {vehicleData?.doors?.replace("P", "")}</span>
                        <span className="text-sm md:text-xs text-wrap"><b>Último service:</b> {vehicleData?.lastestService} km</span>
                        {vehicleData?.hasVTV === true ? <span className="text-sm md:text-xs text-wrap"><b>VTV Vigente:</b> Si</span> :
                          <span className="text-sm md:text-xs text-wrap"><b>VTV Vigente:</b>No</span>

                        }
                        <span className="text-sm md:text-xs text-wrap"><b>Fecha de batería:</b> {vehicleData?.battery}</span>
                        <span className="text-sm md:text-xs text-wrap"><b>Cantidad de dueños:</b> {vehicleData?.ownerNumber}</span>
                        <span className="text-sm md:text-xs text-wrap"><b>Detalles de pintura:</b> {vehicleData?.paintDetails}</span>

                      </div>
                      <div className="flex flex-col items-start justify-center w-full gap-3 h-fit">
                        <span className="text-sm md:text-xs text-wrap"><b>Modelo:</b> {vehicleData?.modelName}</span>
                        <span className="text-sm md:text-xs text-wrap"><b>Condición general:</b> {vehicleData?.generalCondition}</span>
                        {vehicleData?.gearbox === "AUTOMATIC" && (
                          <span className="text-sm md:text-xs text-wrap"><b>Transmisión:</b> Automática</span>
                        )}
                        {vehicleData?.gearbox === "MANUAL" && (
                          <span className="text-sm md:text-xs text-wrap"><b>Transmisión:</b> Manual</span>
                        )}
                        <span className="text-sm md:text-xs text-wrap"><b>Tracción:</b> {vehicleData?.drive}</span>
                        <span className="text-sm md:text-xs text-wrap"><b>Vencimiento de VTV:</b> {vehicleData?.VTVExpDate}</span>
                        <span className="text-sm md:text-xs text-wrap"><b>Reemplazo kit de distribución:</b> {vehicleData?.timingBelt} km</span>
                        <span className="text-sm md:text-xs text-wrap"><b>Condición de neumáticos:</b> {vehicleData?.tireCondition}%</span>

                      </div>
                    </Card>
                  </TabsContent>
                </Tabs>
              </div>

              {/* <div className="w-full mt-4 h-fit">
                <pre
                  style={{ font: "inherit", textWrap: "wrap" }}
                  className="w-full mt-3 mb-2 text-xs text-gray-500 md:mt-0"
                >
                  {vehicleData?.description}
                </pre>
              </div> */}




              <div className="flex flex-col gap-5">
                {/* <div className="flex gap-2 ">
                  <FaLocationDot style={{ color: "#a1a1aa" }} size={15} />
                  <span
                    style={{ color: "#a1a1aa" }}
                    className="text-xs leading-4"
                  >
                    Ubicado en sucursal {vehicleData?.branchAddress}
                  </span>
                </div> */}

              </div>
              <Link className="mx-auto w-fit h-fit md:mx-0" href={'https://wa.me/5493424216075'}>
                <Button
                  variant={"default"}
                  className="w-full text-sm"
                  style={{ backgroundColor: '#ea580c' }}
                >
                  Consultar por la unidad
                </Button>
              </Link>
            </div>
          </div>
        </div>


      </div>


      <Dialog  open={isOpen} onOpenChange={setIsOpen} >
        <DialogContent onClick={() => setIsOpen(false)} className="w-full min-w-[400px] md:min-w-[500px] lg:min-w-[600px] xl:min-w-[750px] 2xl:min-w-[820px] p-0 text-transparent bg-transparent border-none shadow-none h-fit">

          {/* carousel */}
          {/* <Image src={car} alt="" className="w-full" width={500} height={500} /> */}
          {/* Carousel */}

          <Carousel
            setApi={setApi}
            className="relative w-full h-full max-w-full overflow-hidden rounded-lg aspect-square"
            //onMouseEnter={plugin.current.stop}
            //plugins={[plugin.current as any]}
            opts={{
              align: "start",
              loop: true,
              startIndex: galleryIndex
            }}
          //onMouseLeave={plugin.current.reset}
          >
            <CarouselContent className="h-full">
              <CarouselItem
                className="w-full h-full overflow-hidden rounded-md "
              >
                <Image
                  src={vehicleData?.imagePath!}
                  alt={`Imagen `}
                  width={500}
                  objectFit="cover"
                  //onClick={() => { setGalleryIndex(0); setIsOpen(true) }}
                  height={500}
                  unoptimized
                  className="object-cover w-full h-full my-auto rounded-lg"
                />
              </CarouselItem>
              {gallery.map((image, index) => (
                <CarouselItem
                  key={image.uuid}
                  onChange={() => setGalleryIndex(index)}
                  className="w-full h-full overflow-hidden rounded-md "
                >
                  {/* <Zoom> */}
                  <Image
                    src={image.path}
                    alt={`Imagen `}
                    width={500}
                    objectFit="cover"
                    height={500}
                    unoptimized

                    //onClick={() => { setGalleryIndex(index); setIsOpen(true) }}
                    className="object-cover w-full h-full my-auto rounded-lg"
                  />
                  {/* </Zoom> */}
                </CarouselItem>
              ))}
            </CarouselContent>

          </Carousel>

          {/* Custom Indicators */}
          <div className="absolute left-0 right-0 flex justify-center space-x-2 -bottom-4">
            {gallery.map((dot, index) => (
              <button
                key={dot.uuid}
                className={`w-2 h-2 rounded-full ${index + 1 === current ? "bg-black" : "bg-gray-300"
                  }`}
              />
            ))}
          </div>
        </DialogContent>
      </Dialog>

      <RelatedVehicles vehicles={latestVehicles} />
    </>
  );
};

export default VehicleCont;
