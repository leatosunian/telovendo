import Header from "@/components/page/Header";
import ContactForm from "@/components/page/home/contactus/ContactForm";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Contactanos | Aspen Automotores",
  description:
    "Aspen Automotores, concesionaria de vehículos ubicada en Córdoba",
};

const ContactUs = () => {
  return (
    <>
      <Header />
      <section
        className="flex flex-col items-start justify-start w-full my-auto h-fit "
        style={{ transform: "translateY(90px)" }}
      >
        <ContactForm />
      </section>
      {/* <div className="w-full mt-0 h-fit">
        <Footer />
      </div> */}
    </>
  );
};

export default ContactUs;
