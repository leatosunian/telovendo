"use client";
import { Separator } from "@/components/ui/separator";
import React, { useEffect, useState } from "react";
import contactImg from "@/public/contact.png";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import { IBranch } from "@/app/models/branch";
import {
  FaFacebook,
  FaInstagram,
  FaLocationDot,
  FaTwitter,
} from "react-icons/fa6";
import { SiMercadopago } from "react-icons/si";
import { formSchema } from "@/app/schemas/contactForm";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Dialog, DialogContent, DialogFooter } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import correct from "@/public/correct.png";
import { motion } from "framer-motion";
import Link from "next/link";

const ContactForm = () => {
  const [branches, setBranches] = useState<IBranch[]>();
  const [loading, setLoading] = useState(false);
  const [openCreatedLead, setOpenCreatedLead] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      surname: "",
      phone: "",
      vehicleInfo: "",
      vehicleKm: "",
      vehicleYear: "",
    },
  });

  async function getBranches() {
    try {
      const branchesFetch = await fetch("/api/branches", {
        method: "GET",
        cache: "no-store",
      }).then((response) => response.json());
      setBranches(branchesFetch.branches);
    } catch (error) { }
  }

  async function saveLead(values: any) {
    setLoading(true);
    try {
      const saveLeadFetch = await fetch("/api/leads/page", {
        method: "POST",
        body: JSON.stringify(values),
      }).then((response) => response.json());
      setLoading(false);
      setOpenCreatedLead(true);
      form.setValue("vehicleInfo", "");
      form.setValue("vehicleKm", "");
      form.setValue("vehicleYear", "");
      form.setValue("name", "");
      form.setValue("surname", "");
      form.setValue("phone", "");
    } catch (error) {
      toast({
        description: "No se pudo enviar tu solicitud de cotización",
        variant: "destructive",
      });
    }
  }

  useEffect(() => {
    getBranches();
  }, []);

  return (
    <>
      <div className="flex flex-col items-center justify-center gap-8 px-8 mx-auto my-20 md:gap-24 lg:flex-row md:my-44 md:px-32 w-fit ">
        <div className="flex flex-col items-start justify-start w-fit ">
          <div className="flex flex-row items-center justify-start w-full gap-5 md:gap-10 h-fit ">
            <div className="md:w-32 w-28 " >
              <Image alt="" src={contactImg} className="object-cover" />
            </div>
            <div className="flex flex-col">
              <span className="hidden mb-1 text-base font-bold text-orange-600 md:block" >
                Tu vehículo vale más con nosotros
              </span>
              <h4 className="text-2xl font-bold md:text-3xl ">
                Cotizamos tu vehículo
              </h4>
            </div>
          </div>
          <span className="mt-5 text-sm font-normal text-left text-black md:text-base md:mt-10">
            ¿Querés vender tu vehículo o entregarlo como parte de pago? Completá el formulario con los datos de tu vehículo y nos pondremos en contacto a la brevedad para ofrecerte una cotización al mejor valor del mercado.
          </span>
          <span className="text-base font-bold text-orange-600 mt-7 2xl:text-lg" >
            Aprovechá nuestra experiencia y red de compradores para conseguir la mejor oferta.
          </span>


          {/* <div className="hidden w-full h-fit md:flex">
                    <Separator className="hidden my-10 md:block" />
                      <div className="flex flex-col w-full gap-6 h-fit">
                        <span className="text-xl font-semibold">Visitanos en</span>
                        <div className="flex flex-col gap-3">
                          {branches &&
                            branches.map((branch) => (
                              <>
                                <div className="flex items-center gap-2 ">
                                  <FaLocationDot size={17} />
                                  <span className="text-sm">
                                    {branch.address}, {branch.city}, {branch.state}.
                                  </span>
                                </div>
                              </>
                            ))}
                          <div className="flex items-center gap-2 ">
                            <FaLocationDot size={17} />
                            <span className="text-sm">
                              Av. J. M. de Pueyrredón 2550, Córdoba
                            </span>
                          </div>
                          <div className="flex items-center gap-2 ">
                            <FaLocationDot size={17} />
                            <span className="text-sm">
                              Av. Fuerza Aerea Argentina 3020, Córdoba
                            </span>
                          </div>
                        </div>
                      </div>
                    </div> */}

          <Separator className="hidden my-10 md:block" />

          <div className="hidden w-full h-fit md:flex">
            <div className="flex flex-col w-full gap-4 h-fit">
              <span className="text-lg font-semibold 2xl:text-xl">
                Seguinos en nuestras redes
              </span>
              <div className="flex gap-3">
                <div className="flex flex-wrap gap-5 lg:mb-0">
                  {/* <Link target="_blank" href={"https://wa.me/5492235423025"}>
                              <button
                                className="flex items-center justify-center h-10 gap-3 px-4 font-normal transition duration-300 bg-white border border-gray-200 rounded-full shadow-lg outline-none w-fit hover:ring-1 hover:ring-orange-600 align-center hover:shadow-red-100 hover:outline-none"
                                type="button"
                              >
                                <FaWhatsapp  className="m-auto" size={20} />{" "}
                                <span className="text-xs font-medium">
                                  +54 9 223 542-3025
                                </span>
                              </button>
                            </Link> */}
                  <Link target="_blank" href={"https://www.instagram.com/"}>
                    <button
                      className="flex items-center justify-center h-10 gap-3 px-4 font-normal transition duration-300 bg-white border border-gray-200 rounded-full shadow-lg outline-none w-fit hover:ring-1 hover:ring-orange-600 align-center hover:shadow-red-100 hover:outline-none"
                      type="button"
                    >
                      <FaInstagram className="m-auto" size={20} />{" "}
                      <span className="text-xs font-medium">
                        telovendosantafe
                      </span>
                    </button>
                  </Link>
                  <Link target="_blank" href={"https://www.facebook.com/"}>
                    <button
                      className="flex items-center justify-center h-10 gap-3 px-4 font-normal transition bg-white border border-gray-200 rounded-full shadow-lg outline-none w-fit hover:shadow-red-100duration-300 hover:ring-1 hover:ring-orange-600 align-center hover:outline-none"
                      type="button"
                    >
                      <FaFacebook className="m-auto" size={20} />{" "}
                      <span className="text-xs font-medium">
                        Telovendo
                      </span>
                    </button>
                  </Link>
                  <Link
                    target="_blank"
                    href={"https://www.mercadolibre.com.ar/"}
                  >
                    <button
                      className="flex items-center justify-center h-10 gap-3 px-4 font-normal transition duration-300 bg-white border border-gray-200 rounded-full shadow-lg outline-none w-fit hover:shadow-red-100 hover:ring-1 hover:ring-orange-600 align-center hover:outline-none"
                      type="button"
                    >
                      <SiMercadopago className="m-auto" size={20} />{" "}
                      <span className="text-xs font-medium">
                        Telovendo
                      </span>
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container w-full px-0 mx-0 md:w-2/6 md:min-w-96 ">
          <div className="w-full mx-auto">
            <Card className="w-full px-5 py-4 ml-auto bg-white rounded-lg shadow-lg md:px-6">
              <h2 className="text-lg font-semibold md:text-xl ">
                Completá el formulario
              </h2>
              <Separator className="mt-3 mb-5" />
              <Form {...form}>
                <form onSubmit={form.handleSubmit(saveLead)}>
                  <div className="flex flex-col gap-5 mb-4 md:flex-row">
                    <div className="w-full md:w-1/2">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="block text-xs font-semibold xs:text-sm">
                              Nombre
                            </FormLabel>
                            <FormControl>
                              <input
                                {...field}
                                className="w-full px-4 py-2 text-xs font-normal transition duration-300 bg-gray-100 border border-gray-200 rounded-lg cursor-pointer focus:outline-none hover:bg-gray-200 focus:ring-1 focus:ring-orange-600"
                                placeholder="Ingrese su nombre"
                                id="name"
                                type="text"
                              />
                            </FormControl>
                            <FormMessage className="text-xs" />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="w-full md:w-1/2">
                      <FormField
                        control={form.control}
                        name="surname"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="block text-xs font-semibold xs:text-sm">
                              Apellido
                            </FormLabel>
                            <FormControl>
                              <input
                                {...field}
                                className="w-full px-4 py-2 text-xs font-normal transition duration-300 bg-gray-100 border border-gray-200 rounded-lg cursor-pointer focus:outline-none hover:bg-gray-200 focus:ring-1 focus:ring-orange-600"
                                placeholder="Ingrese su apellido"
                                id="surname"
                                type="text"
                              />
                            </FormControl>
                            <FormMessage className="text-xs" />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>

                  <div className="mb-4">
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="block text-xs font-semibold xs:text-sm">
                            Teléfono
                          </FormLabel>
                          <FormControl>
                            <input
                              {...field}
                              className="w-full px-4 py-2 text-xs font-normal transition duration-300 bg-gray-100 border border-gray-200 rounded-lg cursor-pointer focus:outline-none hover:bg-gray-200 focus:ring-1 focus:ring-orange-600"
                              placeholder="Ingrese su número de teléfono"
                              id="phone"
                              type="number"
                            />
                          </FormControl>
                          <FormMessage className="text-xs" />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="mb-4">
                    <FormField
                      control={form.control}
                      name="vehicleInfo"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="block text-xs font-semibold xs:text-sm">
                            Marca, modelo y versión del vehículo
                          </FormLabel>
                          <FormControl>
                            <input
                              {...field}
                              className="w-full px-4 py-2 text-xs font-normal transition duration-300 bg-gray-100 border border-gray-200 rounded-lg cursor-pointer focus:outline-none hover:bg-gray-200 focus:ring-1 focus:ring-orange-600"
                              placeholder="Ej. Chevrolet Cruze LTZ 1.4T"
                              id="vehicleInfo"
                              type="text"
                            />
                          </FormControl>
                          <FormMessage className="text-xs" />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="flex flex-col gap-5 mb-4 md:flex-row">
                    <div className="w-full md:w-1/2">
                      <FormField
                        control={form.control}
                        name="vehicleYear"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="block text-xs font-semibold xs:text-sm">
                              Año
                            </FormLabel>
                            <FormControl>
                              <input
                                {...field}
                                className="w-full px-4 py-2 text-xs font-normal transition duration-300 bg-gray-100 border border-gray-200 rounded-lg cursor-pointer focus:outline-none hover:bg-gray-200 focus:ring-1 focus:ring-orange-600"
                                placeholder="Ej. 2024"
                                id="vehicleYear"
                                type="text"
                              />
                            </FormControl>
                            <FormMessage className="text-xs" />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="w-full md:w-1/2">
                      <FormField
                        control={form.control}
                        name="vehicleKm"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="block text-xs font-semibold xs:text-sm">
                              Kilometraje
                            </FormLabel>
                            <FormControl>
                              <input
                                {...field}
                                className="w-full px-4 py-2 text-xs font-normal transition duration-300 bg-gray-100 border border-gray-200 rounded-lg cursor-pointer focus:outline-none hover:bg-gray-200 focus:ring-1 focus:ring-orange-600"
                                placeholder="Ej. 65000"
                                id="vehicleKm"
                                type="number"
                              />
                            </FormControl>
                            <FormMessage className="text-xs" />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>

                  {/* 
                                           <div className="w-full mb-4">
                                             <FormField
                                               control={form.control}
                                               name="details"
                                               render={({ field }) => (
                                                 <FormItem className="w-full ">
                                                   <FormLabel className="block mb-0 text-xs font-semibold xs:text-sm">
                                                     Escribinos tu consulta
                                                   </FormLabel>
                                                   <textarea
                                                     {...field}
                                                     className="w-full px-4 py-2 text-xs font-normal transition duration-300 bg-gray-100 border border-gray-200 rounded-lg h-28 md:h-24 focus:outline-none focus:ring-2 focus:ring-orange-600"
                                                     rows={4}
                                                     placeholder="Ingrese su consulta"
                                                     name="message"
                                                     id="message"
                                                   ></textarea>
                                                   <FormMessage className="text-xs" />
                                                 </FormItem>
                                               )}
                                             />
                                           </div> */}

                  {!loading && (
                    <button
                      className="w-full px-4 py-3 mt-2 mb-2 text-xs font-semibold text-white transition duration-300 bg-orange-600 rounded-md hover:bg-orange-700"
                      type="submit"
                    >
                      Solicitar cotización
                    </button>
                  )}

                  {loading && (
                    <>
                      <div
                        className="flex items-center justify-center w-full mt-1 overflow-y-hidden bg-white dark:bg-background"
                        style={{ zIndex: "99999999", height: "40px" }}
                      >
                        <div className=" loaderSmall"></div>
                      </div>
                    </>
                  )}
                </form>
              </Form>
            </Card>
          </div>
        </div>

        {/* <Separator className="block mt-2 md:hidden" />
        
                  <div className="flex w-full h-fit md:hidden">
                    <div className="flex flex-col w-full gap-7 h-fit">
                      <span className="text-2xl font-semibold">Visitanos en</span>
                      <div className="flex flex-col gap-3">
                        {branches &&
                          branches.map((branch) => (
                            <>
                              <div className="flex items-center gap-2 ">
                                <FaLocationDot size={17} />
                                <span className="text-sm">
                                  {branch.address}, {branch.city}, {branch.state}.{" "}
                                </span>
                              </div>
                            </>
                          ))} 
                        <div className="flex items-center gap-2 ">
                          <FaLocationDot size={17} />
                          <span className="text-sm">
                            Av. J. M. de Pueyrredón 2550, Córdoba
                          </span>
                        </div>
                        <div className="flex items-center gap-2 ">
                          <FaLocationDot size={17} />
                          <span className="text-sm">
                            Av. Fuerza Aerea Argentina 3020, Córdoba
                          </span>
                        </div>
                      </div>
                    </div>
                  </div> */}

        <Separator className="block mt-3 md:hidden" />

        <div className="flex w-full h-fit md:hidden">
          <div className="flex flex-col w-full gap-7 h-fit">
            <span className="text-2xl font-semibold">
              Seguinos en nuestras redes
            </span>
            <div className="flex gap-3">
              <div className="flex flex-wrap gap-6 md:gap-3 lg:mb-0">
                <Link target="_blank" href={"https://www.instagram.com/"}>
                  <button
                    className="flex items-center justify-center h-12 gap-3 px-5 font-normal transition duration-300 bg-white border border-gray-200 rounded-full shadow-lg outline-none w-fit hover:ring-1 hover:ring-orange-600 align-center hover:outline-none"
                    type="button"
                  >
                    <FaInstagram className="m-auto" size={23} />{" "}
                    <span className="text-sm font-medium">
                      telovendosantafe
                    </span>
                  </button>
                </Link>
                <Link target="_blank" href={"https://www.facebook.com/"}>
                  <button
                    className="flex items-center justify-center h-12 gap-3 px-5 font-normal transition duration-300 bg-white border border-gray-200 rounded-full shadow-lg outline-none w-fit hover:ring-1 hover:ring-orange-600 align-center hover:outline-none"
                    type="button"
                  >
                    <FaFacebook className="m-auto" size={23} />{" "}
                    <span className="text-sm font-medium">
Telovendo                    </span>
                  </button>
                </Link>
                <Link
                  target="_blank"
                  href={"https://www.mercadolibre.com.ar/"}
                >
                  <button
                    className="flex items-center justify-center h-12 gap-3 px-5 font-normal transition duration-300 bg-white border border-gray-200 rounded-full shadow-lg outline-none w-fit hover:ring-1 hover:ring-orange-600 align-center hover:outline-none"
                    type="button"
                  >
                    <SiMercadopago className="m-auto" size={23} />{" "}
                    <span className="text-sm font-medium">
                      Telovendo
                    </span>
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        <Dialog open={openCreatedLead} onOpenChange={setOpenCreatedLead}>
          <DialogContent className="py-10 sm:max-w-[625px]">
            <div className="flex flex-col items-center justify-center gap-4">
              <Image alt="" className="w-20" src={correct} />
              <div className="flex flex-col items-center gap-2 my-5">
                <span className="text-xl font-semibold">
                  ¡Tu solicitud de cotización fue enviada!
                </span>
                <span className="text-sm font-normal ">
                  Nos pondremos en contacto a la brevedad para contestar tu consulta
                </span>
              </div>
            </div>
            <DialogFooter className="mx-auto ">
              <Button onClick={() => setOpenCreatedLead(false)} type="submit">
                Entendido
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
};

export default ContactForm;
