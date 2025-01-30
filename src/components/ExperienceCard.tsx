import React from "react";
import { motion } from "framer-motion";
import { Experience } from "../types";
import { urlFor } from "../sanity";

type Props = {
  experience: Experience;
};

export default function ExperienceCard({ experience }: Props) {
  const getReadableDate = (date: Date | string) => {
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "July",
      "Aug",
      "Sept",
      "Oct",
      "Nov",
      "Dec",
    ];
    const d = typeof date === "string" ? new Date(date) : date;
    const month = d.getMonth();
    const year = d.getFullYear();
    return `${months[month]}. ${year}`;
  };

  return (
    <article className="px-4 shadow-2xl flex h-[80%] mx-4 md:mx-10 flex-col dark:text-gray-100 rounded-lg py-6 items-start space-y-4 dark:bg-[#404040] max-w-6xl bg-gray-50 overflow-y-auto mt-10">
      <div className="flex flex-col lg:flex-row gap-3 lg:gap-6 w-full">
        <motion.img
          initial={{
            y: -100,
            opacity: 0,
          }}
          transition={{ duration: 1.2 }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{ once: true }}
          className="exp-company rounded-full w-16 h-16 md:w-32 md:h-32 object-cover mx-auto lg:mx-1 lg:text-left"
          src={urlFor(experience?.companyImage).url()}
          alt={experience?.company}
        />

        <div className="flex flex-col items-start space-y-3">
          <h4 className="text-lg lg:text-3xl font-normal">
            {experience?.jobTitle}
          </h4>
          <p className="font-bold text-md lg:text-lg my-2">
            {experience?.company}
          </p>
          <p className="text-sm lg:text-lg dark:text-gray-400 text-gray-700">
            {experience?.dateStarted &&
              getReadableDate(new Date(experience.dateStarted))}
            {" - "}
            {experience?.isCurrentlyWorkingHere
              ? "Present"
              : experience?.dateEnded &&
                getReadableDate(new Date(experience.dateEnded))}
          </p>
        </div>
      </div>

      <ul className="list-disc pl-4 px-3 exp-list text-xs md:text-base space-y-2 ml-5 h-56 md:h-60 overflow-y-auto scrollbar-thumb-rounded-md text-justify pr-5 scrollbar-thin scrollbar-track-black scrollbar-thumb-[#F7AB0A]/80">
        {experience?.points
          ?.filter((point) => point.trim())
          .map((point, index) => (
            <li key={index} className="flex items-start space-x-2 text-left">
              <span className="flex-1">• {point}</span>
            </li>
          ))}
      </ul>
    </article>
  );
}
