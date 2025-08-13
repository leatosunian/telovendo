import React from "react";
import styles from "@/app/css-modules/home.slider.module.css";
import { motion } from "framer-motion";
import Link from "next/link";

const Slider = () => {
  return (
    <section className={styles.sectionCont}>
      {/* black overlay for background */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.43 }}
        transition={{ duration: 4, delay: 0, ease: "easeInOut" }}
        className="absolute left-0 z-10 w-full h-full bg-black"
      ></motion.div>
      {/* black overlay for background */}
      <div className="z-20 flex flex-col w-full gap-14 md:gap-12 sm:w-3/5 ">
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, delay: 1.2 }}
        >
          <h3
            className="text-5xl font-semibold sm:text-4xl xl:text-6xl"
            style={{ letterSpacing: ".5px" }}
          >
            Tu próximo auto, cada vez más cerca.
          </h3>
          {/* <h3
            className="text-5xl font-semibold sm:text-5xl 2xl:text-6xl"
            style={{ letterSpacing: ".5px" }}
          >
            Tu próximo auto lo tenemos nosotros
            Todo lo que necesitás para vender o comprar tu auto.
          </h3> */}
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, delay: 1.7 }}
        >
          {/* <p className="text-base md:text-base 2xl:text-lg">
            Conectamos personas con vehículos. Llegamos a quienes buscan lo que ofrecés y a quienes tienen lo que buscás.
          </p> */}
          <p className="text-base md:text-base 2xl:text-lg">
            Más que un servicio, somos tu acompañamiento en el proceso de compra o venta de tu vehículo. Escuchamos tu necesidad y buscamos el mejor contacto para vos.
          </p>
          <p className="mt-5 text-base font-medium md:text-base 2xl:text-lg">
            Pulsá el botón de abajo, hablá con nosotros y empezamos a ayudarte desde el primer minuto.
          </p>
        </motion.div>
        <Link href={'https://wa.me/5493424216075'} target="_blank" className="w-fit h-fit">
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 2.1 }}
          >
            <button style={{ backgroundColor: '#ea580c' }} className={styles.button}>Contactanos</button>
          </motion.div>
        </Link>
      </div>
    </section>
  );
};

export default Slider;
