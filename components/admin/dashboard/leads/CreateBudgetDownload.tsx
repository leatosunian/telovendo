"use client";
import React, { useEffect, useRef, useState } from "react";
import styles from "@/app/css-modules/budget/budget.module.css";
import logo from "@/public/logomuestrablack.png";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { FaPhoneAlt, FaUserAlt, FaUserTie } from "react-icons/fa";
import { IoIosMail } from "react-icons/io";
import { ICar } from "@/app/models/car";
import { ILeadVehicle } from "@/app/models/leadvehicles";
import { IoLocationSharp } from "react-icons/io5";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { Button } from "@/components/ui/button";
import { ILead } from "@/app/models/lead";
import { useSession } from "next-auth/react";
import { FiDownload } from "react-icons/fi";
import { IBonif } from "@/app/models/budgetbonif";
import { IBudget } from "@/app/models/budget";
import { format } from "date-fns";
import dayjs from "dayjs";

interface props {
  budget: IBudget | undefined;
  budgetBonifs: IBonif[] | undefined;
}

const CreateBudgetDownload = ({ budget, budgetBonifs }: props) => {
  const budgetRef = useRef<HTMLDivElement>(null);

  function createRandomFiveDigits() {
    return Math.floor(10000 + Math.random() * 90000);
  }

  async function generatePDF() {
    const data = budgetRef.current;
    try {
      if (data) {
        const randomFiveDigits = createRandomFiveDigits();
        const canvas = await html2canvas(data, {
          scale: 1.8,
        });
        const img = canvas.toDataURL("image/png");

        const pdf = new jsPDF({
          orientation: "portrait",
          unit: "px",
          format: "a4",
        });

        const clientName = budget?.clientName.split(" ")[0];
        const clientSurname = budget?.clientName.split(" ")[1];

        const width = pdf.internal.pageSize.getWidth();
        const height = (canvas.height * width) / canvas.width;

        pdf.addImage(img, "PNG", 0, 0, width, height);
        const as = pdf.save(
          `Presupuesto-${budget?.budgetNumber}-${clientName}_${clientSurname}.pdf`
        );
        budget = undefined
        budgetBonifs = undefined
        console.log('budget:', budget, 'budgetbonifs', budgetBonifs);

      }
    } catch (error) { }
  }

  useEffect(() => {
    console.log(budget);
    if (budget !== undefined) {
      generatePDF();
    }
  }, [budget]);

  return (
    <>
      <div ref={budgetRef} className={`${styles.page} sr-only px-8 text-black`}>
        {/* header */}
        <div className="flex items-center justify-between text-black h-28">
          <div className="h-fit w-fit">
            <Image src={logo} width={80} alt="Te lo Vendo" />
          </div>
          <div className="flex flex-col items-start w-fit h-fit justify-self-center">
            <span className="text-lg font-medium text-black uppercase">
              Presupuesto
            </span>
            <span className="text-sm font-normal text-gray-600">
              N° {budget?.budgetNumber}{" "}
            </span>
          </div>
          <div className="flex gap-8">
            {/* <div className="flex flex-col ">
              <span className="text-xs font-semibold">Tipo de negocio</span>
              <span className="text-xs font-light">
                {budget?.businessType}{" "}
              </span>
            </div> */}
            <div className="flex flex-col ">
              <span className="text-xs font-semibold">Fecha </span>
              <span className="text-xs font-light">
                {dayjs(budget?.createdAt).format("DD/MM/YYYY")}{" "}
              </span>
            </div>
          </div>
        </div>

        {/* seller and client info */}
        <div>
          <Card
            style={{ borderColor: "rgb(228, 228, 231)" }}
            className="flex flex-col w-full bg-white h-fit border-border"
          >
            <div className="flex">
              {/* seller */}
              <div className="flex flex-col justify-between w-1/2 gap-3 p-4 text-black">
                <span
                  style={{ lineHeight: "13px" }}
                  className="text-sm font-semibold"
                >
                  Vendedor
                </span>
                <div className="flex flex-col flex-wrap w-full gap-1">
                  <div className="flex flex-row justify-between">
                    <span
                      style={{ fontSize: "11px" }}
                      className="flex items-center gap-1.5 font-light"
                    >
                      <FaUserTie /> {budget?.sellerName}
                    </span>
                    <span
                      style={{ fontSize: "11px" }}
                      className="flex items-center gap-1.5 font-light"
                    >
                      <FaPhoneAlt /> {budget?.sellerPhone}
                    </span>
                  </div>
                  <span
                    style={{ fontSize: "11px" }}
                    className="flex items-center gap-1.5 font-light"
                  >
                    <IoIosMail />
                    {budget?.sellerEmail}
                  </span>
                </div>
              </div>
              {/* seller */}

              <Separator
                style={{ backgroundColor: "rgb(228, 228, 231, 80%)" }}
                className="h-[50px] mx-1 my-auto "
                orientation="vertical"
              />

              {/* client */}
              <div className="flex flex-col justify-between w-1/2 gap-3 p-4 text-black">
                <span
                  style={{ lineHeight: "13px" }}
                  className="text-sm font-semibold"
                >
                  Cliente
                </span>
                <div className="flex flex-col flex-wrap w-full gap-1 mb-auto">
                  <div className="flex flex-row justify-between">
                    <span
                      style={{ fontSize: "11px" }}
                      className="flex items-center gap-1.5 font-light"
                    >
                      <FaUserAlt />
                      {budget?.clientName}
                    </span>
                    <span
                      style={{ fontSize: "11px" }}
                      className="flex items-center gap-1.5 font-light"
                    >
                      <FaPhoneAlt />
                      {budget?.clientPhone}
                    </span>
                  </div>
                  {/* <span
                    style={{ fontSize: "11px" }}
                    className="flex items-center gap-1.5 font-light"
                  >
                    <IoIosMail />
                    {budget?.clientEmail}
                  </span> */}
                </div>
              </div>
              {/* client */}
            </div>
          </Card>
        </div>

        <Separator
          className="px-5 mx-auto my-3 "
          style={{ backgroundColor: "rgb(228, 228, 231, 100%)" }}
          orientation="horizontal"
        />

        {/* vehicles and budget details */}
        <div className="flex flex-col w-full h-full gap-0 mt-3">
          {/* vehicles' details */}
          <div className="flex flex-col w-full gap-3 h-fit">
            {(budget?.vehicleName !== '' && budget?.vehicleName) && (<>
              <Card
                style={{ borderColor: "rgb(228, 228, 231)" }}
                className="flex w-full h-full p-5 bg-white border-border"
              >
                <div className="flex flex-col w-full gap-0">
                  <span
                    style={{ fontSize: "15px" }}
                    className="font-semibold text-black "
                  >
                    Vehículo a comprar
                  </span>

                  <Separator
                    className="px-5 mx-auto my-4 "
                    style={{ backgroundColor: "rgb(228, 228, 231, 100%)" }}
                    orientation="horizontal"
                  />
                  <div className="flex flex-row flex-wrap gap-y-3 ">
                    <div className="flex flex-col w-1/2 text-black">

                      <span className="text-xs font-semibold ">Vehículo</span>
                      <span className="text-xs text-gray-400">
                        {budget?.vehicleName}
                      </span>
                    </div>

                    {/* <Separator
                      className="px-5 mx-auto my-2 "
                      style={{ backgroundColor: "rgb(228, 228, 231, 100%)" }}
                      orientation="horizontal"
                    /> */}

                    <div className="flex flex-col w-1/2 text-black">
                      <span className="text-xs font-semibold ">
                        Tipo de vehículo
                      </span>
                      <span className="text-xs text-gray-400">
                        {budget?.vehicleType === "CAR" && "Automóvil"}
                        {budget?.vehicleType === "BIKE" && "Motocicleta"}
                        {budget?.vehicleType === "PICKUP" && "Pickup"}
                        {budget?.vehicleType === "UTILITARY" && "Utilitario"}
                        {budget?.vehicleType === "SUV" && "SUV"}
                        {budget?.vehicleType === "VAN" && "Van"}
                        {budget?.vehicleType === "COUPE" && "Coupe"}
                        {budget?.vehicleType === "HATCHBACK" && "Hatchback"}
                        {budget?.vehicleType === "CONVERTIBLE" && "Convertible"}
                        {budget?.vehicleType === "QUAD" && "Cuatriciclo"}
                        {budget?.vehicleType === "UTV" && "UTV"}
                      </span>
                    </div>

                    {/* <Separator
                      className="px-5 mx-auto my-2 "
                      style={{ backgroundColor: "rgb(228, 228, 231, 100%)" }}
                      orientation="horizontal"
                    /> */}

                    <div className="flex flex-col w-1/2 text-black ">
                      <span className="text-xs font-semibold ">
                        Año de fabricación
                      </span>
                      <span className="text-xs text-gray-400">
                        {budget?.vehicleYear}
                      </span>
                    </div>

                    {/* <Separator
                      className="px-5 mx-auto my-2 "
                      style={{ backgroundColor: "rgb(228, 228, 231, 100%)" }}
                      orientation="horizontal"
                    /> */}

                    <div className="flex flex-col w-1/2 text-black">
                      <span className="text-xs font-semibold ">Kilometraje</span>
                      <span className="text-xs text-gray-400">
                        {budget?.vehicleKilometers?.toLocaleString()} km
                      </span>
                    </div>

                    {/* <Separator
                      className="px-5 mx-auto my-2 "
                      style={{ backgroundColor: "rgb(228, 228, 231, 100%)" }}
                      orientation="horizontal"
                    /> 

                    <div className="flex flex-col text-black">
                      <span className="text-xs font-semibold ">Motorizacíon</span>
                      <span className="text-xs text-gray-400">
                        {budget?.vehicleMotor}
                      </span>
                    </div>

                    <Separator
                      className="px-5 mx-auto my-2 "
                      style={{ backgroundColor: "rgb(228, 228, 231, 100%)" }}
                      orientation="horizontal"
                    />

                    <div className="flex flex-col text-black">
                      <span className="text-xs font-semibold ">
                        Cantidad de puertas
                      </span>
                      <span className="text-xs text-gray-400">
                        {budget?.vehicleDoors === "2P" && "2 puertas"}
                        {budget?.vehicleDoors === "3P" && "3 puertas"}
                        {budget?.vehicleDoors === "4P" && "4 puertas"}
                        {budget?.vehicleDoors === "5P" && "5 puertas"}
                      </span>
                    </div>

                    <Separator
                      className="px-5 mx-auto my-2 "
                      style={{ backgroundColor: "rgb(228, 228, 231, 100%)" }}
                      orientation="horizontal"
                    />*/}

                    <div className="flex flex-col w-1/2 text-black">
                      <span className="text-xs font-semibold ">Combustible</span>
                      <span className="text-xs text-gray-400 ">
                        {budget?.vehicleGas === "DIESEL" && "Diésel"}
                        {budget?.vehicleGas === "GNC" && "GNC"}
                        {budget?.vehicleGas === "NAFTA" && "Nafta"}
                      </span>
                    </div>

                    {/* <Separator
                      className="px-5 mx-auto my-2 "
                      style={{ backgroundColor: "rgb(228, 228, 231, 100%)" }}
                      orientation="horizontal"
                    /> */}

                    <div className="flex flex-col w-1/2 text-black">
                      <span className="text-xs font-semibold ">Transmisión</span>
                      <span className="text-xs text-gray-400">
                        {budget?.vehicleGearbox === "AUTOMATIC" && "Automática"}
                        {budget?.vehicleGearbox === "MANUAL" && "Manual"}
                      </span>
                    </div>
                  </div>
                </div>
              </Card>
            </>)}

            {budget?.clientVehicleName !== "" && (
              <Card
                style={{ borderColor: "rgb(228, 228, 231)" }}
                className="flex w-full h-full px-5 py-3 bg-white border-border"
              >
                <div className="flex flex-col w-full ">
                  <span
                    style={{ fontSize: "16px" }}
                    className="font-semibold text-black "
                  >
                    Vehículo usado
                  </span>

                  <Separator
                    className="px-5 mx-auto my-3 "
                    style={{ backgroundColor: "rgb(228, 228, 231, 100%)" }}
                    orientation="horizontal"
                  />
                  <div className="flex flex-wrap gap-y-3 ">
                    <div className="flex flex-col w-1/2 text-black">
                      <span className="text-xs font-semibold ">Vehículo</span>
                      <span className="text-xs text-gray-400">
                        {budget?.clientVehicleName}
                      </span>
                    </div>

                    {budget?.clientVehicleYear && (
                      <>
                        {/* <Separator
                          className="px-5 mx-auto my-2 "
                          style={{
                            backgroundColor: "rgb(228, 228, 231, 100%)",
                          }}
                          orientation="horizontal"
                        /> */}

                        <div className="flex flex-col w-1/2 text-black">
                          <span className="text-xs font-semibold ">
                            Año de fabricación
                          </span>
                          <span className="text-xs text-gray-400">
                            {budget?.clientVehicleYear}
                          </span>
                        </div>
                      </>
                    )}
                    {budget?.clientVehicleKilometers && (
                      <>
                        {/* <Separator
                          className="px-5 mx-auto my-2 "
                          style={{
                            backgroundColor: "rgb(228, 228, 231, 100%)",
                          }}
                          orientation="horizontal"
                        /> */}
                        <div className="flex flex-col w-1/2 text-black">

                          <span className="text-xs font-semibold text-black ">
                            Kilometraje
                          </span>
                          <span className="text-xs text-gray-400">
                            {budget?.clientVehicleKilometers}
                          </span>
                        </div>
                      </>
                    )}

                    {budget?.clientVehicleMotor !== "" && (
                      <>
                        {/* <Separator
                          className="px-5 mx-auto my-2 "
                          style={{
                            backgroundColor: "rgb(228, 228, 231, 100%)",
                          }}
                          orientation="horizontal"
                        /> */}
                        <div className="flex flex-col w-1/2 text-black">
                          <span className="text-xs font-semibold ">
                            Motorizacíon
                          </span>
                          <span className="text-xs text-gray-400">
                            {budget?.clientVehicleMotor}
                          </span>
                        </div>
                      </>
                    )}
                  </div>
                  {(budget?.MLValue || budget?.infoAutosValue) && (<>
                    <Separator
                      className="px-5 mx-auto my-3 "
                      style={{ backgroundColor: "rgb(228, 228, 231, 100%)" }}
                      orientation="horizontal"
                    />
                    <div className="flex w-full text-xs text-black h-fit">
                      {(!Number.isNaN(budget?.infoAutosValue) && budget?.infoAutosValue !== undefined) && (
                        <div className="w-1/2">
                          <span className="font-semibold">Valor en InfoAutos: {" "} </span> <span className="font-semibold underline">ARS ${Number(budget?.infoAutosValue).toLocaleString()} </span>
                        </div>
                      )}
                      {(!Number.isNaN(budget?.MLValue) && budget?.MLValue !== undefined) && (
                        <div className="w-1/2">
                          <span className="font-semibold">Valor promedio en Mercado Libre: {" "} </span> <span className="font-semibold underline">ARS ${Number(budget?.MLValue).toLocaleString()}</span>
                        </div>
                      )}
                    </div>
                  </>)}
                </div>
              </Card>
            )}
          </div>
          <Separator
            className="px-5 mx-auto my-3 "
            style={{ backgroundColor: "rgb(228, 228, 231, 100%)" }}
            orientation="horizontal"
          />
          {/* resumen de presupuesto */}
          <Card
            style={{ borderColor: "rgb(228, 228, 231)" }}
            className="w-full px-5 py-3 bg-white h-fit"
          >
            <div className="flex flex-col gap-0 text-black bg-white">
              <span
                style={{ fontSize: "15px" }}
                className="font-semibold text-black "
              >
                Resumen
              </span>

              <Separator
                className="my-3 "
                style={{ backgroundColor: "rgb(228, 228, 231, 100%)" }}
                orientation="horizontal"
              />
              <div>
                {budget?.vehiclePrice && (<>

                  {/* precio del vehiculo */}
                  <div className="flex flex-col gap-1">
                    <div className="flex items-start justify-between w-full">
                      <span className="text-xs font-semibold">
                        Precio del vehículo
                      </span>
                      <span className="text-xs font-semibold">
                        {budget?.budgetCurrency} $
                        {budget?.vehiclePrice.toLocaleString()}{" "}
                      </span>
                    </div>
                    <span className="text-xs text-gray-400">
                      {budget?.vehicleName}
                    </span>
                  </div>
                  <Separator
                    className="my-3 "
                    style={{ backgroundColor: "rgb(228, 228, 231, 100%)" }}
                    orientation="horizontal"
                  />
                  {/* precio del vehiculo */}
                  {/* bonificaciones */}
                  {budgetBonifs && budgetBonifs?.length > 0 && (
                    <>
                      {/* <Separator
                        className="my-5 "
                        style={{ backgroundColor: "rgb(228, 228, 231, 100%)" }}
                        orientation="horizontal"
                      /> */}
                      <div className="flex flex-col mt-3">
                        <span className="mb-3 text-xs font-semibold ">
                          Bonificaciones
                        </span>
                        {/* <Separator className="my-1" orientation="horizontal" /> */}
                        <div className="flex flex-col gap-2">
                          {budgetBonifs?.map((bonif) => (
                            <>
                              <div className="flex items-start justify-between w-full">
                                <span className="text-xs font-normal text-gray-400">
                                  {bonif.details}
                                </span>
                                <span className="text-xs text-gray-400 ">
                                  {bonif.addOrSub} {budget?.budgetCurrency} $
                                  {bonif.amount.toLocaleString()}{" "}
                                </span>
                              </div>
                            </>
                          ))}
                        </div>
                        <div className="flex items-start justify-between w-full mt-2">
                          <span className="text-xs font-semibold">
                            Subtot. de bonificaciones
                          </span>
                          <span className="text-xs font-semibold">
                            {Number(budget?.bonifsSubtotal.toLocaleString()) < 0
                              ? "-"
                              : ""}{" "}
                            {budget?.budgetCurrency} $
                            {Number(budget?.bonifsSubtotal.toLocaleString()) < 0
                              ? Number(budget?.bonifsSubtotal.toLocaleString()) *
                              -1
                              : Number(budget?.bonifsSubtotal.toLocaleString())}
                          </span>
                        </div>
                      </div>
                      <Separator
                        className="my-3 "
                        style={{ backgroundColor: "rgb(228, 228, 231, 100%)" }}
                        orientation="horizontal"
                      />
                    </>
                  )}
                  {/* bonificaciones */}
                </>)}


                {/* entrega de usado */}
                {budget?.clientVehicleName !== "" && (
                  <>
                    <div className="flex flex-col gap-1">
                      <div className="flex items-start justify-between w-full">
                        <span className="text-xs font-semibold">
                          Entrega de vehículo
                        </span>
                        <span className="text-xs font-semibold">
                          {(budget?.vehicleName !== "" && budget?.vehicleName) ? "- " : ""} {budget?.budgetCurrency} $
                          {Number(budget?.clientVehiclePrice).toLocaleString()}
                        </span>
                      </div>
                      <span className="text-xs text-gray-400">
                        {budget?.clientVehicleName}
                      </span>
                    </div>
                    <Separator
                      className="my-3 "
                      style={{ backgroundColor: "rgb(228, 228, 231, 100%)" }}
                      orientation="horizontal"
                    />
                  </>
                )}
                {/* entrega de usado */}



                {(budget?.vehicleName !== "" && budget?.vehicleName) && (<>

                  {/* costos de transferencia */}
                  <div className="flex items-start justify-between w-full">
                    <span className="text-xs font-semibold">
                      Costos de transferencia
                    </span>
                    <span className="text-xs font-semibold">
                      {budget?.budgetCurrency} $
                      {budget?.transfer.toLocaleString()}
                    </span>
                  </div>
                  {/* costos de transferencia */}</>)}



                {/* total a pagar */}
                {(budget?.vehicleName !== "" && budget?.vehicleName) && (<>
                  <Separator
                    className="my-3 "
                    style={{ backgroundColor: "rgb(228, 228, 231, 100%)" }}
                    orientation="horizontal"
                  />
                  <div className="flex items-start justify-between w-full">
                    <span className="text-sm font-semibold underline">
                      Total a pagar
                    </span>
                    <span className="text-sm font-semibold underline">
                      {budget?.budgetCurrency} $
                      {budget?.total
                        ? Number(budget.total.toFixed(2)).toLocaleString()
                        : "0"}
                    </span>
                  </div>
                </>)}
                {/* total a pagar */}
                {((budget?.vehicleName === "" || !budget?.vehicleName) && budget?.clientVehicleName) && (<>
                  <div className="flex items-start justify-between w-full">
                    <span className="text-xs font-semibold">
                      Comisión por venta (4%)
                    </span>
                    <span className="text-xs font-semibold">
                      {budget?.budgetCurrency} $
                      {(Number(budget?.clientVehiclePrice ?? 0) * 0.04).toLocaleString()}
                    </span>
                  </div>
                  <Separator
                    className="my-3 "
                    style={{ backgroundColor: "rgb(228, 228, 231, 100%)" }}
                    orientation="horizontal"
                  />
                  <div className="flex items-start justify-between w-full">
                    <span className="text-sm font-semibold underline">
                      Ganancia neta del titular
                    </span>
                    <span className="text-sm font-semibold underline">
                      {budget?.budgetCurrency} $
                      {(Number(budget?.clientVehiclePrice ?? 0) - (Number(budget?.clientVehiclePrice ?? 0) * 0.04)).toLocaleString()}
                    </span>
                  </div>
                </>)}
              </div>
            </div>
          </Card>
          {/* resumen de presupuesto */}
        </div>
      </div>
    </>
  );
};

export default CreateBudgetDownload;
