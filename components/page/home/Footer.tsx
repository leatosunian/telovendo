import React from "react";
import Image from "next/image";
import logo from "@/public/logomuestrablackletras.png";
import { FaFacebook, FaInstagram, FaTwitter, FaWhatsapp } from "react-icons/fa";
import { SiMercadopago } from "react-icons/si";
import Link from "next/link";
import { GrInstagram } from "react-icons/gr";
import { Separator } from "@/components/ui/separator";

const Footer = () => {
  return (
    <>
      <footer
        style={{ borderTop: "1px solid #0000001f" }}
        className="relative pt-8 pb-6 bg-blueGray-200"
      >
        <div className="container px-4 mx-auto">
          <div className="flex flex-wrap text-left lg:text-left">
            <div className="w-full px-4 lg:w-5/12">
              {/* <h4 className="text-3xl fonat-semibold text-blueGray-700">
                HASCAR
              </h4> */}
              <Image
                src={logo}
                alt=""
                width={130}
                height={100}
                className="block md:hidden"
              />
              <Image
                src={logo}
                alt=""
                width={150}
                height={100}
                className="hidden md:block"
              />
              {/* <h5 className="mt-3 mb-2 ml-2 font-semibold text-orange-400 text-md md:text-xl text-blueGray-600">
                TE LO VENDO | SERVICIO PERSONALIZADO
              </h5> */}
              {/* <h5 className="mt-3 mb-2 ml-2 font-semibold uppercase text-md md:text-xl text-blueGray-600">
                Te lo Vendo
              </h5> */}

              <Separator className="my-3 bg-orange-800 opacity-35 md:my-3"></Separator>

              <h5 className="mt-2 mb-2 ml-0 text-sm font-normal md:ml-2 md:text-base text-blueGray-600">
                Vendé tu vehículo de manera particular, sin complicaciones.
              </h5>
              {/* <div className="mt-6 mb-6 lg:mb-0">
                <Link target="_blank" href={"https://www.instagram.com/"}>
                  <button
                    className="items-center justify-center w-10 h-10 mr-2 font-normal bg-white rounded-full shadow-lg outline-none text-lightBlue-600 align-center focus:outline-none"
                    type="button"
                  >
                    <FaInstagram className="m-auto" />
                  </button>
                </Link>
                <Link target="_blank" href={"https://www.facebook.com/"}>
                  <button
                    className="items-center justify-center w-10 h-10 mr-2 font-normal bg-white rounded-full shadow-lg outline-none text-blueGray-800 align-center focus:outline-none"
                    type="button"
                  >
                    <FaFacebook className="m-auto" />
                  </button>
                </Link>
                <Link target="_blank" href={"https://www.mercadolibre.com.ar/"}>
                  <button
                    className="items-center justify-center w-10 h-10 mr-2 font-normal bg-white rounded-full shadow-lg outline-none align-center focus:outline-none"
                    type="button"
                  >
                    <SiMercadopago className="m-auto" />
                  </button>
                </Link>
              </div> */}
            </div>
            <div className="w-full px-4 lg:w-7/12">
              <div className="flex flex-wrap mb-6 items-top">
                <div className="w-full mt-5 ml-auto lg:mt-0 lg:w-4/12">
                  <span className="block mb-2 text-sm font-semibold text-orange-600 uppercase lg:mb-4">
                    Links rápidos
                  </span>
                  <ul className="list-unstyled">
                    <li>
                      <Link
                        className="block pb-2 text-sm font-medium text-black transition-all duration-200 ease-in-out hover:text-orange-600"
                        href="/vehicles"
                      >
                        Vehículos disponibles
                      </Link>
                    </li>
                    <li>
                      <Link
                        className="block pb-2 text-sm font-medium text-black transition-all duration-200 ease-in-out hover:text-orange-600"
                        href="/cotizar"
                      >
                        Cotizá tu vehículo
                      </Link>
                    </li>
                  </ul>
                </div>
                {/* <div className="w-full px-4 mt-5 lg:mt-0 lg:w-4/12">
                  <span className="block mb-2 text-sm font-semibold uppercase lg:mb-4 text-blueGray-500">
                    horario de atención
                  </span>
                  <ul className="list-unstyled">
                    <li>
                      <span
                        className="block pb-2 text-sm font-medium text-blueGray-600 hover:text-blueGray-800"
                      >
                        Lun. a Vie. de 10 a 17hs
                      </span>
                    </li>
                    <li>
                      <span
                        className="block pb-2 text-sm font-medium text-blueGray-600 hover:text-blueGray-800"
                      >
                        Sábados de 10 a 13hs
                      </span>
                    </li>
                  </ul>
                </div> */}
                <div className="w-full mt-5 lg:mt-0 lg:w-4/12">
                  <span className="block mb-2 text-sm font-semibold text-orange-600 uppercase lg:mb-4">
                    contactanos
                  </span>
                  <ul className="list-unstyled">
                    <li>
                      <Link
                        target="_blank"
                        className="flex items-center gap-2 pb-2 text-sm font-medium text-black transition-all duration-200 ease-in-out hover:text-orange-600"
                        href="https://wa.me/5493424216075"
                      >
                        <FaWhatsapp size={18} />
                        +54 9 342 421-6075
                      </Link>
                    </li>
                    <li>
                      <Link
                        target="_blank"
                        className="flex items-center gap-2 pb-2 text-sm font-medium text-black transition-all duration-200 ease-in-out hover:text-orange-600"
                        href="https://www.instagram.com/telovendosantafe"
                      >
                        <GrInstagram size={18} />
                        telovendosantafe
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <hr className="my-6 border-blueGray-300" />
          <div className="flex flex-wrap items-center justify-center md:justify-between">
            <div className="w-full px-4 mx-auto text-center md:w-4/12">
              <div className="py-1 text-sm font-semibold text-blueGray-500">
                Copyright © <span id="get-current-year">2025 </span>
                <span className="text-blueGray-500 hover:text-gray-800">
                  Telovendo.{" "} Desarrollado por {"   "}
                  <a
                    href={"https://tosunian.dev"}
                    className="text-orange-600 transition-all duration-200 ease-in-out hover:text-orange-900"
                  >
                    tosunian.dev
                  </a>
                </span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
