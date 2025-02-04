import React from "react";
import { motion } from "framer-motion";
import { PageInfo } from "../types";
import { urlFor } from "../sanity";

type Props = {
  pageInfo: PageInfo;
};

export default function About({ pageInfo }: Props) {
  return (
    <div className="lg:h-screen h-fit flex relative flex-col text-center md:text-left max-w-7xl lg:pt-20 lg:justify-evenly justify-start gap-10 space-y-5 mx-auto items-center pb-10">
      <h3 className="section-title">About</h3>

      <div className="space-y-4 md:space-y-6 px-4 md:px-10 flex flex-col md:flex-row items-center gap-10">
        <motion.img
          initial={{
            x: -200,
            opacity: 0,
          }}
          whileInView={{
            x: 0,
            opacity: 1,
          }}
          transition={{
            duration: 1.2,
          }}
          viewport={{ once: true }}
          src={urlFor(pageInfo?.profilePic).url()}
          className="w-48 h-48 -mb-30 md:mb-0 mt-4 flex-shrink-0 rounded-full md:rounded-lg md:w-64 md:h-80 object-cover"
        />

        <div className="flex flex-col gap-4">
          <motion.h4
            initial={{ y: 200, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="text-2xl lg:text-3xl font-semibold text-gray-800 dark:text-gray-200"
          >
            A{" "}
            <span className="underline underline-offset-[6px] decoration-[#F7AB0A]">
              little
            </span>{" "}
            about me
          </motion.h4>

          <motion.p
            initial={{ y: 200, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 1.5 }}
            viewport={{ once: true }}
            className="text-sm md:text-base text-gray-600 dark:text-gray-300 leading-relaxed tracking-wide"
          >
            {pageInfo?.backgroundInformation}
          </motion.p>
        </div>
      </div>
    </div>
  );
}
