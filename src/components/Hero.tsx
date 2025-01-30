import React from "react";
import { Cursor, useTypewriter } from "react-simple-typewriter";
import BackgroundCircles from "./BackgroundCircles";
import { motion } from "framer-motion";
import { PageInfo } from "../types";
import { urlFor } from "../sanity";

type Props = {
  pageInfo: PageInfo;
};

export default function Hero({ pageInfo }: Props) {
  const [text] = useTypewriter({
    words: [
      `Hi, My name is ${pageInfo?.name}`,
      "Guy-who-loves-Coffee.tsx",
      "<ButLovesToCodeMore />",
    ],
    loop: true,
    delaySpeed: 2000,
  });

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center space-y-8 justify-center text-center overflow-hidden">
      <BackgroundCircles />
      <motion.img
        initial={{
          opacity: 0,
          scale: 2,
        }}
        animate={{
          opacity: 1,
          scale: 1,
        }}
        transition={{
          duration: 2,
        }}
        src={urlFor(pageInfo?.heroImage).url()}
        alt={pageInfo?.name}
        className="h-32 w-32 rounded-full relative mx-auto object-cover"
      />
      <div className="z-20">
        <h2 className="text-xs font-bold md:text-md uppercase text-gray-500 dark:text-gray-500 pb-2 tracking-[10px] md:tracking-[15px]">
          {pageInfo?.role}
        </h2>
        <h1 className="text-2xl lg:text-4xl font-semibold px-10">
          <span className="italic dark:text-white">{text}</span>
          <Cursor cursorColor="#F7AB0A" />
        </h1>
        <div className="flex flex-wrap justify-center items-center gap-2 md:gap-3 mt-3">
          <button
            className="heroButton"
            onClick={() => scrollToSection("about")}
          >
            About
          </button>
          <button
            className="heroButton"
            onClick={() => scrollToSection("experience")}
          >
            Experience
          </button>
          <button
            className="heroButton"
            onClick={() => scrollToSection("skills")}
          >
            Skills
          </button>
          <button
            className="heroButton"
            onClick={() => scrollToSection("projects")}
          >
            Projects
          </button>
        </div>
      </div>
    </div>
  );
}
