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
        animate={{ opacity: 0.5 }}
        transition={{ duration: 3, delay: 0, ease: "easeInOut" }}
        className="absolute left-0 z-10 w-full h-full bg-black"
      ></motion.div>
      {/* black overlay for background */}
      <div className="z-20 flex flex-col w-full gap-16 sm:w-3/5 ">
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.9 }}
        >
          {/* <h3
            className="text-4xl font-semibold sm:text-5xl xl:text-7xl"
            style={{ letterSpacing: ".5px" }}
          >
            Tu próximo auto, cada vez más cerca
          </h3> */}
          <h3
            className="text-5xl font-semibold sm:text-5xl 2xl:text-6xl"
            style={{ letterSpacing: ".5px" }}
          >
            Tu próximo auto lo tenemos nosotros
          </h3>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 1.3 }}
        >
          {/* <p className="text-sm md:text-base lg:text-lg">
            Unimos 6 marcas líderes del mercado en un mismo lugar. Además,
            tenemos más de 700 usados seleccionados para vos.
          </p> */}
          <p className="text-base md:text-base 2xl:text-lg">
            Conectamos personas con vehículos. Encontramos la unidad ideal para vos y te acompañamos en cada paso hasta tenerlo en tu garage.
          </p>
        </motion.div>
        <Link href={'/vehicles'} className="w-fit h-fit">
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.6 }}
          >
            <button style={{ backgroundColor: '#ea580c' }} className={styles.button}>Ver vehículos</button>
          </motion.div>
        </Link>
      </div>
    </section>
  );
};

export default Slider;
