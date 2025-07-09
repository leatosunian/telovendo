import React from "react";
import Image from "next/image";
import logo from "@/public/logomuestrablack.png";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";
import { SiMercadopago } from "react-icons/si";
import Link from "next/link";
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
                width={200}
                height={200}
                className="block md:hidden"
              />
              <Image
                src={logo}
                alt=""
                width={150}
                height={100}
                className="hidden md:block"
              />
              <h5 className="mt-3 mb-2 ml-2 font-semibold text-orange-400 text-md md:text-xl text-blueGray-600">
                TE LO VENDO | SERVICIO PERSONALIZADO
              </h5>
              <h5 className="mt-3 mb-2 ml-2 text-md md:text-base text-blueGray-600">
                +12 años de trayectoria en el mercado de vehículos
              </h5>
              <div className="mt-6 mb-6 lg:mb-0">
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
              </div>
            </div>
            <div className="w-full px-4 lg:w-7/12">
              <div className="flex flex-wrap mb-6 items-top">
                <div className="w-full px-4 mt-5 ml-auto lg:mt-0 lg:w-4/12">
                  <span className="block mb-2 text-sm font-semibold uppercase lg:mb-4 text-blueGray-500">
                    Links rápidos
                  </span>
                  <ul className="list-unstyled">
                    <li>
                      <Link
                        className="block pb-2 text-sm font-medium transition-all duration-200 ease-in-out text-blueGray-600 hover:text-red-600"
                        href="/vehicles"
                      >
                        Vehículos
                      </Link>
                    </li>
                    <li>
                      <Link
                        className="block pb-2 text-sm font-medium transition-all duration-200 ease-in-out text-blueGray-600 hover:text-red-600"
                        href="/aboutus"
                      >
                        Sobre nosotros
                      </Link>
                    </li>
                    <li>
                      <Link
                        className="block pb-2 text-sm font-medium transition-all duration-200 ease-in-out text-blueGray-600 hover:text-red-600"
                        href="/contactus"
                      >
                        Contacto
                      </Link>
                    </li>
                  </ul>
                </div>
                <div className="w-full px-4 mt-5 lg:mt-0 lg:w-4/12">
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
                </div>
                <div className="w-full px-4 mt-5 lg:mt-0 lg:w-4/12">
                  <span className="block mb-2 text-sm font-semibold uppercase lg:mb-4 text-blueGray-500">
                    contactanos
                  </span>
                  <ul className="list-unstyled">
                    <li>
                      <Link
                        target="_blank"
                        className="block pb-2 text-sm font-medium transition-all duration-200 ease-in-out text-blueGray-600 hover:text-red-600"
                        href="https://wa.me/5492235423025"
                      >
                        +54 9 223 542-2030
                      </Link>
                    </li>
                    <li>
                      <Link
                        target="_blank"
                        className="block pb-2 text-sm font-medium transition-all duration-200 ease-in-out text-blueGray-600 hover:text-red-600"
                        href="https://wa.me/5492235423025"
                      >
                        +54 9 223 442-5537
                      </Link>
                    </li>
                    <li>
                      <span
                        className="block pb-2 text-sm font-medium transition-all duration-200 ease-in-out text-blueGray-600 hover:text-red-600"
                      >
                        info@telovendo.com.ar
                      </span>
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
                  Te Lo Vendo by{" "}
                  <a
                    href={"https://www.creative-tim.com?ref=njs-profile"}
                    className="text-blueGray-500 hover:text-blueGray-800"
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
