"use client";
import React from "react";
import styles from "@/app/css-modules/home.section2.module.css";
import { SiCashapp } from "react-icons/si";
import { FaCar } from "react-icons/fa";
import { CgArrowsExchangeAltV } from "react-icons/cg";
import { motion, useViewportScroll, useTransform } from "framer-motion";
import Reveal from "./Reveal";
import { IoShieldCheckmarkSharp } from "react-icons/io5";
const Section2 = () => {
  const { scrollYProgress } = useViewportScroll();
  const scale = useTransform(scrollYProgress, [0, 1], [0.2, 2]);

  return (
    <>
      <section className="relative">
        <div className="relative flex items-center content-center justify-center pt-20 pb-36 md:pt-36 md:pb-44 2xl:pt-38 2xl:pb-52 min-h-screen-100 ">
          <div className={`absolute top-0 w-full h-full ${styles.bgSection}`}>
            <span
              id="blackOverlay"
              className="absolute w-full h-full bg-black opacity-20"
            ></span>
          </div>
          <div className="container relative mx-auto">
            <div className="flex flex-wrap items-center">
              <div className="w-full px-4 ml-auto mr-auto text-center lg:w-10/12">
                <div className="flex flex-col gap-7">
                  <motion.div
                    initial={{ opacity: 0, y: -50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ amount: "some", once: true }}
                    transition={{
                      duration: 0.7,
                      ease: "circInOut",
                      delay: 0.2,
                    }}
                  >
                    <h1 className="text-3xl font-semibold text-left text-white 2xl:text-5xl md:text-center sm:text-4xl">
                      ¿Por qué vender tu auto con nosotros?
                    </h1>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, x: -100 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ amount: "some", once: true }}
                    transition={{
                      duration: 0.7,
                      ease: "circInOut",
                      delay: 0.5,
                    }}
                  >
                    <p className="mt-8 text-base font-normal text-left text-white md:text-center sm:text-lg">
                      Dejá la venta de tu auto en nuestras manos: te brindamos una experiencia completa, con cotización al mejor precio del mercado, asesoramiento profesional y gestión segura de principio a fin. Trabajamos para que consigas el mejor valor y lo entregues transferido.
                    </p>

                    {/* <p className="mt-4 text-base font-normal text-left text-white md:text-center sm:text-lg">
                      5 años de experiencia en el mercado respaldan nuestra confianza.
                    </p> */}
                    <p style={{ borderBottom: '1px solid #ea580c' }} className="mx-0 mt-10 text-xl font-semibold text-left text-white md:mx-auto w-fit md:text-center sm:text-2xl">
                      Tu próximo auto está acá.
                    </p>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <section className="pb-0 -mt-24 bg-blueGray-200">
          <div className="container px-4 mx-auto">
            <div className="flex flex-wrap">
              <motion.div
                initial={{ opacity: 0, y: 100 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ amount: "some", once: true }}
                transition={{ duration: 0.7, ease: "circInOut", delay: 0.4 }}
                className="w-full px-4 pt-6 text-center lg:pt-12 md:w-4/12"
              >
                <div className="relative flex flex-col w-full min-w-0 mb-8 break-words bg-white rounded-lg shadow-lg">
                  <div className="flex-auto px-4 py-5">
                    <div
                      className="inline-flex items-center justify-center w-12 h-12 p-3 mb-5 text-center text-white bg-orange-600 rounded-full shadow-lg"
                    >
                      <SiCashapp />
                    </div>
                    <h6 className="text-xl font-semibold">Seguridad y confianza</h6>
                    <p className="mt-2 mb-4 text-base text-black md:text-sm 2xl:text-base">
                      Más de 2 años en el mercado haciendo operaciones seguras y clientes felices.
                    </p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 100 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ amount: "some", once: true }}
                transition={{ duration: 0.7, ease: "circInOut", delay: 0.8 }}
                className="w-full px-4 text-center md:w-4/12"
              >
                <div className="relative flex flex-col w-full min-w-0 mb-8 break-words bg-white rounded-lg shadow-lg">
                  <div className="flex-auto px-4 py-5">
                    <div
                      className="inline-flex items-center justify-center w-12 h-12 mb-5 text-center text-white bg-orange-600 rounded-full shadow-lg"
                    >
                      <CgArrowsExchangeAltV size={30} />
                    </div>
                    <h6 className="text-xl font-semibold">
                      Transferimos tu unidad
                    </h6>
                    <p className="mt-2 mb-4 text-base text-black md:text-sm 2xl:text-base">
                      Nos encargamos de tener lo antes posible tu vehículo listo para transitar.
                    </p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 100 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ amount: "some", once: true }}
                transition={{ duration: 0.7, ease: "circInOut", delay: 1 }}
                className="w-full px-4 pt-6 text-center md:w-4/12"
              >
                <div className="relative flex flex-col w-full min-w-0 mb-8 break-words bg-white rounded-lg shadow-lg">
                  <div className="flex-auto px-4 py-5">
                    <div
                      className="inline-flex items-center justify-center w-12 h-12 mb-5 text-center text-white bg-orange-600 rounded-full shadow-lg "

                    >
                      <IoShieldCheckmarkSharp size={21} className="m-auto" />
                    </div>
                    <h6 className="text-xl font-semibold">
                      Aseguramos tu vehículo
                    </h6>
                    {/* <p className="mt-2 mb-4 text-black">
                      Todas las coberturas al mejor precio para que puedas conducir tu nueva unidad
                    </p> */}
                    <p className="mt-2 mb-4 text-base text-black md:text-sm 2xl:text-base">
                      Trabajamos con los mejores brokers de seguros. Todas las
                      coberturas al mejor precio.
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </section>
    </>
  );
};

export default Section2;
