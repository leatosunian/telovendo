"use client";
import { carBrands } from "@/app/utils/carBrands";
import { carYears } from "@/app/utils/carYears";
import React, { useEffect, useState } from "react";
import Breadcrumbs from "@/components/page/home/vehicles/Breadcrumbs";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/selectxs";
import styles from "@/app/css-modules/vehicles/vehicles.module.css";
import buttonStyle from "@/app/css-modules/home.search.module.css";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Footer from "@/components/page/home/Footer";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { CheckIcon, ChevronsUpDown } from "lucide-react";
import { ICar } from "@/app/models/car";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import LoaderFullscreen from "@/components/page/LoaderFullscreen";
import Link from "next/link";
import { FaRegCalendar } from "react-icons/fa";
import { IoSpeedometerOutline } from "react-icons/io5";
import { Badge } from "@/components/ui/badge";
import noresults from "@/public/noresults.png"
import { LuSearchX } from "react-icons/lu";

const VehiclesCont = () => {
  const [open, setOpen] = useState(false);
  const [brandFilter, setBrandFilter] = useState("");
  const [vehicleFetch, setVehicleFetch] = useState<ICar[]>([]);
  const [vehicleList, setVehicleList] = useState<ICar[]>([]);
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(true);
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const searchFilter = searchParams.get("search");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [currentVehicles, setCurrentVehicles] = useState<ICar[]>([]);
  const [vehiclesPerPage, setVehiclesPerPage] = useState<number>(12);
  const lastVehicleIndex = currentPage * vehiclesPerPage;
  const firstVehicleIndex = lastVehicleIndex - vehiclesPerPage;
  const [numberOfPages, setNumberOfPages] = useState<number[]>([0]);

  async function getCars() {
    try {
      const url =
        searchFilter && searchFilter !== "null"
          ? `/api/cars/?search=${searchFilter}`
          : `/api/cars/`;
      const carsFetch = await fetch(url, {
        method: "GET",
        cache: "no-store",
      });
      const cars = await carsFetch.json();
      setVehicleList(cars);
      setVehicleFetch(cars);
      setLoading(false);
      return cars;
    } catch (error) {
      return;
    }
  }

  function sortVehiclesByPriceDesc() {
    const vehiclesSorted = [...vehicleList].sort(
      (prev, next) => next.price - prev.price
    );
    setVehicleList(vehiclesSorted);
  }
  function sortVehiclesByPriceAsc() {
    const vehiclesSorted = [...vehicleList].sort(
      (prev, next) => prev.price - next.price
    );
    setVehicleList(vehiclesSorted);
  }
  function sortVehiclesByDateAsc() {
    const vehiclesSorted = [...vehicleList].sort((a, b) => {
      return (
        new Date(a.createdAt!).getTime() - new Date(b.createdAt!).getTime()
      );
    });
    setVehicleList(vehiclesSorted);
  }
  function sortVehiclesByDateDesc() {
    const vehiclesSorted = [...vehicleList].sort((a, b) => {
      return (
        new Date(b.createdAt!).getTime() - new Date(a.createdAt!).getTime()
      );
    });
    setVehicleList(vehiclesSorted);
  }
  function handleFilterByYear(year: string) {
    const vehiclesFiltered = vehicleFetch.filter((vehicle) => {
      return vehicle.year === Number(year);
    });
    setVehicleList(vehiclesFiltered);
  }
  function handleFilterByDoors(doors: string) {
    const vehiclesFiltered = vehicleFetch.filter((vehicle) => {
      return vehicle.doors === doors;
    });
    setVehicleList(vehiclesFiltered);
  }
  function handleFilterByBrand(brand: string) {
    const vehiclesFiltered = vehicleFetch.filter((vehicle) => {
      return vehicle.brand === brand;
    });
    setVehicleList(vehiclesFiltered);
  }
  function handleFilterByGearbox(gearbox: string) {
    const vehiclesFiltered = vehicleFetch.filter((vehicle) => {
      return vehicle.gearbox === gearbox;
    });
    setVehicleList(vehiclesFiltered);
  }
  function handleFilterByType(type: string) {
    const vehiclesFiltered = vehicleFetch.filter((vehicle) => {
      return vehicle.type === type;
    });
    setVehicleList(vehiclesFiltered);
  }
  function handlePrevAndNextPage(to: string) {
    if (to === "PREV") {
      if (currentPage === 1) return;
      setCurrentPage(currentPage - 1);
      return;
    }
    if (to === "NEXT") {
      if (numberOfPages.length === currentPage) return;
      setCurrentPage(currentPage + 1);
      return;
    }
  }

  function refresh() {
    router.replace("/vehicles");
    setTimeout(() => {
      if (pathname === "/vehicles" && searchFilter !== "") {
        window.location.reload();
      }
    }, 500);
  }

  useEffect(() => {
    const currentVehicles = vehicleList.slice(
      firstVehicleIndex,
      lastVehicleIndex
    );
    setCurrentVehicles(currentVehicles);

    let paginationPages: number[] = [];
    for (let i = 1; i <= Math.ceil(vehicleList.length / vehiclesPerPage); i++) {
      paginationPages.push(i);
    }
    setNumberOfPages(paginationPages);
    console.log("vehiclelist", vehicleList);

    console.log("numberOfPages", currentPage);
    console.log("numberOfPages", numberOfPages);
  }, [vehicleList, currentPage]);

  useEffect(() => {
    getCars();
  }, []);

  return (
    <>
      {loading && <LoaderFullscreen />}
      {/* HEADER SEPARATOR */}
      <div className="w-full h-16 md:h-20"></div>

      {/* BREADCRUMBS */}
      <div className="w-full px-6 pt-5 pb-3 md:pt-2 md:px-24 2xl:px-48 h-fit">
        <Breadcrumbs />
      </div>

      {/* container for padding */}
      <div className="px-6 md:px-24 2xl:px-48 ">
        {/*  title and sort by */}
        <div className="flex flex-col justify-between w-full gap-2 mt-0 md:mt-2 md:flex-row h-fit ">
          <div className="flex flex-col w-fit">
            <h4 className="text-2xl font-medium 2xl:text-3xl">
              Todos los vehículos
            </h4>
            <span className="mb-2 text-sm text-gray-400">
              Mostrando 1-12 de {vehicleList.length} vehículos
            </span>
          </div>

          {/* sort by  */}
          <div className="hidden my-auto w-fit h-fit md:block">
            <div className="hidden ml-auto w-fit h-fit md:block">
              <Select
                onValueChange={(type) => {
                  console.log(type);
                  if (type === "price-desc") {
                    sortVehiclesByPriceDesc();
                  }
                  if (type === "price-asc") {
                    sortVehiclesByPriceAsc();
                  }
                  if (type === "date-desc") {
                    sortVehiclesByDateDesc();
                  }
                  if (type === "date-asc") {
                    sortVehiclesByDateAsc();
                  }
                }}
              >
                <SelectTrigger className="py-2 w-[300px]">
                  <SelectValue className="" placeholder="Ordenar por..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="price-desc">
                      Mayor a menor precio
                    </SelectItem>
                    <SelectItem value="price-asc">
                      Menor a mayor precio
                    </SelectItem>
                    <SelectItem value="date-desc">
                      Mas recientes a mas antiguos
                    </SelectItem>
                    <SelectItem value="date-asc">
                      Mas antiguos a mas recientes
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* mobile sort by */}
          <div className="block md:hidden ">
            <Select
              onValueChange={(type) => {
                console.log(type);
                if (type === "price-desc") {
                  sortVehiclesByPriceDesc();
                }
                if (type === "price-asc") {
                  sortVehiclesByPriceAsc();
                }
                if (type === "date-desc") {
                  sortVehiclesByDateDesc();
                }
                if (type === "date-asc") {
                  sortVehiclesByDateAsc();
                }
              }}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Ordenar por..." />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="price-desc">
                    Mayor a menor precio
                  </SelectItem>
                  <SelectItem value="price-asc">
                    Menor a mayor precio
                  </SelectItem>
                  <SelectItem value="date-desc">
                    Mas recientes a mas antiguos
                  </SelectItem>
                  <SelectItem value="date-asc">
                    Mas antiguos a mas recientes
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* VEHICLE LIST */}
        <div className="flex mt-4 mb-10 md:mt-7">
          {/* FILTERS SIDEBAR */}
          <div
            style={{ border: "1px solid #0000001c" }}
            className="flex-col hidden w-1/4 px-5 pt-3 pb-5 bg-white rounded-md shadow-lg h-fit lg:flex"
          >
            <div className="">
              <span className="text-base font-semibold 2xl:text-lg">Filtros</span>
            </div>

            {/* divider */}
            <div
              style={{
                width: "100%",
                height: "1px",
                backgroundColor: "#0000001c",
                margin: "8px 0 12px  0 ",
              }}
            ></div>

            <div className="flex flex-col gap-3 2xl:gap-5">
              <div className="flex flex-col gap-1">
                <span className="text-xs font-semibold 2xl:text-sm">Tipo de vehículo</span>
                <Select
                  onValueChange={(type) => {
                    console.log(type);
                    handleFilterByType(type);
                  }}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Seleccionar tipo..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="HATCHBACK">Hatchback</SelectItem>
                      <SelectItem value="SEDAN">Sedán</SelectItem>
                      <SelectItem value="CABRIO">Descapotable</SelectItem>
                      <SelectItem value="WAGON">Rural</SelectItem>
                      <SelectItem value="COUPE">Coupé</SelectItem>
                      <SelectItem value="PICKUP">Pickup</SelectItem>
                      <SelectItem value="UTILITARY">Utilitario</SelectItem>
                      <SelectItem value="SUV">SUV</SelectItem>
                      <SelectItem value="VAN">Van</SelectItem>
                      <SelectItem value="CONVERTIBLE">Convertible</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-xs font-semibold 2xl:text-sm">Marca</span>
                <Popover open={open} onOpenChange={setOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      aria-expanded={open}
                      className="justify-between w-full h-8 text-xs font-normal"
                    >
                      {brandFilter
                        ? carBrands.find((brand) => brand === brandFilter)
                        : "Seleccionar marca..."}

                      <ChevronsUpDown className="w-4 h-4 ml-2 opacity-50 shrink-0" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-full p-0">
                    <Command>
                      <CommandInput
                        placeholder="Buscar marca..."
                        className="h-9"
                      />
                      <CommandList>
                        <CommandEmpty>No hay resultados.</CommandEmpty>
                        <CommandGroup>
                          {carBrands.map((brand) => (
                            <CommandItem
                              key={brand}
                              value={brand}
                              onSelect={() => {
                                console.log(brand);
                                setBrandFilter(brand);
                                handleFilterByBrand(brand);
                                setOpen(false);
                              }}
                            >
                              {brand}
                              <CheckIcon
                                className={cn(
                                  "ml-auto h-4 w-4",
                                  brandFilter === brand
                                    ? "opacity-100"
                                    : "opacity-0"
                                )}
                              />
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
              </div>

              {/* <div className="flex flex-col gap-1">
                <span className="text-xs font-semibold 2xl:text-sm">Cantidad de puertas</span>
                <Select
                  onValueChange={(doors) => {
                    console.log(doors);
                    handleFilterByDoors(doors);
                  }}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Seleccionar cantidad..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="2P">2 puertas</SelectItem>
                      <SelectItem value="3P">3 puertas</SelectItem>
                      <SelectItem value="4P">4 puertas</SelectItem>
                      <SelectItem value="5P">5 puertas</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div> */}

              <div className="flex flex-col gap-1">
                <span className="text-xs font-semibold 2xl:text-sm">Año</span>
                <Select
                  onValueChange={(year) => {
                    handleFilterByYear(year);
                  }}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Seleccionar año..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {carYears.map((year) => (
                        <SelectItem key={year} value={year}>
                          {year}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex flex-col gap-1">
                <span className="text-xs font-semibold 2xl:text-sm">Transmisión</span>
                <Select
                  onValueChange={(gearbox) => {
                    handleFilterByGearbox(gearbox);
                  }}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Seleccionar transm..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="MANUAL">Manual </SelectItem>
                      <SelectItem value="AUTOMATIC">Automática</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>

              <Button
                style={{ backgroundColor: '#ea580c' }}
                className="mt-2 text-xs 2xl:text-sm "
                onClick={() => {
                  console.log(searchFilter);

                  if (searchFilter === "") {
                    setVehicleList(vehicleFetch);
                    return;
                  }
                  if (searchFilter !== "") {
                    router.replace("/vehicles");
                    refresh();
                  }
                }}
              >
                Remover filtros
              </Button>
            </div>
          </div>

          {/* VEHICLES */}

          <div className="w-full mb-24 md:mb-32">
            {currentVehicles.length !== 0 && (
              <>
                <div
                  className={`${styles.vehiclesCont} xl:gap-10 gap-14 2xl:gap-12 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 py-5 md:py-0 pl-0 lg:pl-10   `}
                >
                  {currentVehicles.length > 0 &&
                    currentVehicles.map((car) => (
                      <>
                        <div
                          key={car.uuid}
                          className="col-span-1 md:h-full h-fit"
                        >
                          <Card className="flex flex-col h-full shadow-lg">
                            {car.status === "OPORTUNIDAD" && (
                              <Badge
                                className="absolute bg-orange-600 border-none shadow-lg mt-2 md:py-1 md:px-3 py-1.5 px-3.5 ml-2 text-white font-normal md:text-xs text-sm "
                                variant="outline"
                              >
                                Oportunidad
                              </Badge>
                            )}
                            {car.status === "RESERVED" && (
                              <Badge
                                className="absolute bg-orange-400 border-none shadow-lg mt-2 md:py-1 md:px-3 py-1.5 px-3.5 ml-2 text-white font-normal md:text-xs text-sm "
                                variant="outline"
                              >
                                Reservado
                              </Badge>
                            )}
                            {car.status === "SOLD" && (
                              <Badge
                                className="absolute bg-red-500 border-none shadow-lg mt-2 md:py-1 md:px-3 py-1.5 px-3.5 ml-2 text-white font-normal md:text-xs text-sm "
                                variant="outline"
                              >
                                Vendido
                              </Badge>
                            )}
                            <Image
                              src={car?.imagePath!}
                              alt="auto"
                              width={500}
                              height={500}
                              unoptimized
                              className="object-cover h-full mb-4 overflow-hidden rounded-t-md md:h-1/2 "
                            />
                            <div className="flex flex-col justify-between w-full h-full md:h-1/2">
                              <CardHeader
                                style={{ padding: "0 16px 0px 16px" }}
                              >
                                <CardTitle className="text-lg md:text-sm 2xl:text-base textCut">
                                  {car.name}
                                </CardTitle>
                                <CardDescription className="flex items-center justify-between w-full pt-1 pb-2 ">
                                  <div className="flex items-center gap-2">
                                    <FaRegCalendar /> <span className="text-base md:text-xs 2xl:text-base">{car.year}</span>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <IoSpeedometerOutline size={19} />
                                    <span className="text-base md:text-xs 2xl:text-base"> {car.kilometers} km</span>
                                  </div>
                                </CardDescription>
                                <p className="text-lg font-semibold md:text-sm 2xl:text-lg">
                                  {car.currency === "USD"
                                    ? `USD ${Number(car.price).toLocaleString()}`
                                    : `$${Number(car.price).toLocaleString()}`}
                                </p>
                              </CardHeader>
                              <CardFooter className="px-4 pb-5 mt-5 md:mt-3">
                                <Link
                                  href={`/vehicles/${car.uuid}`}
                                  className="w-full h-fit"
                                >
                                  <Button
                                    variant={"default"}
                                    style={{ backgroundColor: '#ea580c' }}
                                    className="w-full text-sm md:text-xs 2xl:text-sm"
                                  >
                                    Ver más
                                  </Button>
                                </Link>
                              </CardFooter>
                            </div>
                          </Card>
                        </div>
                      </>
                    ))}
                </div>
                {/* pagination */}
                <div className="mt-10 md:mt-20">
                  <Pagination>
                    <PaginationContent>
                      <PaginationItem>
                        <PaginationPrevious
                          href="#"
                          onClick={() => handlePrevAndNextPage("PREV")}
                        />
                      </PaginationItem>
                      {numberOfPages.map((page) => (
                        <>
                          <PaginationItem
                            onClick={() => {
                              console.log("setcurrentpage to ", page);
                              setCurrentPage(page);
                            }}
                          >
                            <PaginationLink
                              isActive={currentPage === page}
                              href="#"
                            >
                              {page}
                            </PaginationLink>
                          </PaginationItem>
                        </>
                      ))}

                      <PaginationItem>
                        <PaginationNext
                          href="#"
                          onClick={() => handlePrevAndNextPage("NEXT")}
                        />
                      </PaginationItem>
                    </PaginationContent>
                  </Pagination>
                </div>
              </>
            )}
            {vehicleList.length === 0 && (
              <>
                <div className="flex flex-col items-center justify-center w-full gap-6 my-12 h-fit">
                  <div className="flex flex-col items-center justify-center w-full gap-1 h-fit">
                    {/* <Image width={180} className="hidden mb-5 2xl:block" src={noresults} alt=""></Image>
                    <Image width={100} className="block mb-5 2xl:hidden" src={noresults} alt=""></Image> */}
                    <LuSearchX size={100} className="text-orange-600" />
                    <span className="text-xl font-semibold text-center 2xl:text-2xl">
                      No se encontró ningún resultado,
                    </span>
                    <span className="text-base font-semibold text-center 2xl:text-xl">pero <span className="text-base font-semibold text-orange-600 2xl:text-xl">podemos encontrar el vehículo que estás buscando.</span></span>
                  </div>
                  <Link href={"https://api.whatsapp.com/send/?phone=5493424216075"} target="_blank">
                    <button
                      style={{ backgroundColor: '#ea580c' }}
                      className={`${buttonStyle.button}`}
                    >
                      Contactanos
                    </button>
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
};

export default VehiclesCont;
