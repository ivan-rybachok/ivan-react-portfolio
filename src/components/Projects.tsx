import React from "react";
import { motion } from "framer-motion";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Project } from "../types";
import { urlFor } from "../sanity";
import { useWindowSize } from "@uidotdev/usehooks";

type Props = {
  projects: Project[];
};

export default function Projects({ projects }: Props) {
  const dimensions = useWindowSize();

  const setExperienceCardWidth = (width: number) => {
    if (width < 640) return 95; // mobile
    if (width < 1024) return 85; // tablet
    return 75; // desktop
  };

  const dateSortProjects = (project1: Project, project2: Project) => {
    const d1 = new Date(project1._createdAt);
    const d2 = new Date(project2._createdAt);
    if (d1 > d2) return 1;
    if (d1 < d2) return -1;
    return 0;
  };

  return (
    <div className="md:h-screen w-full relative overflow-hidden text-left flex flex-col justify-center mx-auto items-center z-20">
      <h3 className="section-title">Projects</h3>

      <Carousel
        showStatus={false}
        showIndicators
        autoFocus
        centerMode
        showArrows
        showThumbs={false}
        centerSlidePercentage={
          dimensions?.width
            ? setExperienceCardWidth(dimensions.width)
            : undefined
        }
        className="mt-20 z-10 w-full max-w-7xl overflow-hidden"
        preventMovementUntilSwipeScrollTolerance
      >
        {projects?.sort(dateSortProjects).map((project, i) => (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1.2 }}
            viewport={{ once: true }}
            key={project._id}
            className="shadow-2xl mx-3 my-2 rounded-lg px-2 py-10 h-[90%]"
          >
            <a
              href={project.linkToBuild}
              target="_blank"
              rel="noopener noreferrer"
              className="max-w-xs relative flex mx-auto hover:scale-105 transition"
            >
              <img
                src={urlFor(project.image).url()}
                alt={project.title}
                className="rounded-md"
              />
            </a>

            <div className="flex items-center space-x-2 justify-center p-5">
              {project?.technologies.map((technology) => (
                <div
                  className="cursor-pointer rounded-2xl shadow-gray-900 hover:scale-105 transition-all hover:bg-gray-700/20 shadow-sm hover:shadow-md"
                  key={technology._id}
                >
                  <img
                    src={urlFor(technology.image).url()}
                    alt={technology.title}
                    className="h-8 rounded-2xl w-8 lg:w-14 lg:h-14 p-px lg:p-1"
                  />
                </div>
              ))}
            </div>

            <div className="space-y-4 mt-4 mx-auto px-4">
              <h4 className="flex justify-center items-center gap-4">
                <a
                  href={project.linkToBuild}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-2xl md:text-3xl underline flex justify-center items-center decoration-[#F7AB0A]/50 underline-offset-8 text-gray-800 dark:text-gray-200 font-semibold text-center hover:text-[#F7AB0A] transition-colors"
                >
                  <span className="-mt-2">{project.title}</span>
                </a>
              </h4>
              <p className="text-gray-600 dark:text-gray-300 text-sm md:text-base leading-relaxed tracking-wide max-w-3xl mx-auto">
                {project.summary}
              </p>
            </div>
          </motion.div>
        ))}
      </Carousel>

      <div className="w-full absolute top-[50%] -translate-y-1/2 left-0 bg-[#F7AB0A]/10 h-[250px] lg:h-[500px] -skew-y-12" />
    </div>
  );
}
