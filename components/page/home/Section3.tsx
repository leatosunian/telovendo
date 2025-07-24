import React from "react";
import styles from "@/app/css-modules/home.section3.module.css";
import { motion } from "framer-motion";
import Link from "next/link";
const Section3 = () => {
  return (
    <>
      <div className={`${styles.parallaxCont}`}>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.5 }}
          viewport={{ amount: "some", once: true }}
          transition={{ duration: 0.9, ease: "easeInOut", delay: 0.5 }}
          className="absolute w-full h-full bg-black "
        ></motion.div>
        <div className={`${styles.content}`}>
          <div className="flex flex-col w-full gap-16 md:gap-9 2xl:gap-16 sm:w-4/5 ">
            <motion.div
              initial={{ opacity: 0, x: -70 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ amount: "some", once: true }}
              transition={{ duration: 0.7, ease: "easeInOut", delay: 0.5 }}
            >
              <h3
                className="text-5xl font-semibold sm:text-5xl 2xl:text-6xl "
                style={{ letterSpacing: ".5px" }}
              >
                Vendé tu unidad al mejor precio
              </h3>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 70 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ amount: "some", once: true }}
              className="mt-0"
              transition={{ duration: 0.7, ease: "easeInOut", delay: 0.5 }}
            >
              <p className="text-base md:text-sm 2xl:text-lg">
                Solicitanos una cotización gratuita de tu vehículo. Lo cotizamos
                al instante y al mejor precio del mercado, pagamos por tu usado
                lo que realmente vale.
              </p>
              <p className="mt-3 text-base md:text-sm 2xl:text-lg">
                Luego de reunirnos para hacer las fotos oficiales del auto, nos ocuparemos de encontrarle un comprador cuánto antes.
              </p>
              <p className="mt-3 text-base md:text-sm 2xl:text-lg">
                Una vez señado el vehículo, nos ocuparemos de que se transfiera en tiempo y forma, y que lo entregues una vez que la transferencia ya esté ingresada.
              </p>
              <p
                style={{ borderBottom: "1px solid #ea580c" }}
                className="block text-base font-semibold sm:hidden w-fit mt-11 md:text-lg lg:text-2xl"
              >
                ¡La forma más fácil de vender tu auto!
              </p>
              <p
                style={{ borderBottom: "1px solid #ea580c" }}
                className="hidden text-base font-semibold w-fit sm:block mt-11 md:text-xl 2xl:text-2xl"
              >
                ¡La forma más fácil y segura de vender tu auto!
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 70 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="mt-4"
              viewport={{ amount: "some", once: true }}
              transition={{ duration: 0.7, ease: "easeInOut", delay: 0.5 }}
            >
              <Link href={"/cotizar"}>
                <button style={{ backgroundColor: '#ea580c' }} className={styles.button}>Cotizar mi usado</button>
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Section3;
