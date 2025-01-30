import React from "react";
import { motion } from "framer-motion";
import ExperienceCard from "./ExperienceCard";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Experience } from "../types";
import { useWindowSize } from "@uidotdev/usehooks";

type Props = {
  experiences: Experience[];
};

export default function WorkExperience({ experiences }: Props) {
  const dimensions = useWindowSize();

  const setExperienceCardWidth = (width: number) => {
    if (width < 640) return 95; // mobile
    if (width < 1024) return 85; // tablet
    return 75; // desktop
  };

  // Sort experiences by date (most recent first)
  const sortedExperiences = [...experiences].sort((a, b) => {
    const dateA = a.isCurrentlyWorkingHere
      ? new Date()
      : new Date(a.dateEnded || "");
    const dateB = b.isCurrentlyWorkingHere
      ? new Date()
      : new Date(b.dateEnded || "");
    return dateB.getTime() - dateA.getTime();
  });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
      className="flex relative flex-col text-center md:text-left px-2 pt-20 justify-evenly mx-auto items-center"
    >
      <h3 className="section-title">Experience</h3>

      <Carousel
        showArrows
        swipeScrollTolerance={20}
        autoFocus
        centerMode
        className="w-full max-w-7xl overflow-hidden"
        centerSlidePercentage={
          dimensions?.width
            ? setExperienceCardWidth(dimensions.width)
            : undefined
        }
        showStatus={false}
        showThumbs={false}
        showIndicators
        preventMovementUntilSwipeScrollTolerance
        selectedItem={0} // Start with most recent experience
      >
        {sortedExperiences.map((experience) => (
          <ExperienceCard key={experience._id} experience={experience} />
        ))}
      </Carousel>
    </motion.div>
  );
}
