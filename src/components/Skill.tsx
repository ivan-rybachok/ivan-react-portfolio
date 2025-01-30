import React from "react";
import { motion } from "framer-motion";
import { Skill as SkillType } from "../types";
import { urlFor } from "../sanity";

type Props = {
  directionTop?: boolean;
  skill: SkillType;
  setSelectedSkill: React.Dispatch<React.SetStateAction<string>>;
};

export default function Skill({
  directionTop,
  skill,
  setSelectedSkill,
}: Props) {
  return (
    <motion.div
      whileTap={{
        [directionTop ? "rotateY" : "rotateX"]: directionTop ? 1000 : -1000,
        scale: 1.5,
      }}
      transition={{ duration: 0.6 }}
      onClick={() => setSelectedSkill(skill.title)}
      className="p-1 dark:hover:bg-gray-800/30 shadow-md hover:bg-gray-200 bg-white/70 dark:bg-transparent shadow-gray-800/80 rounded-2xl transition-colors duration-300 relative flex cursor-pointer"
    >
      <motion.img
        initial={{
          y: directionTop ? -100 : 100,
          opacity: 0,
        }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="h-16 w-16 lg:h-20 lg:w-20 rounded-2xl p-1 z-50 border-gray-500 object-fill filter group-hover:grayscale transition duration-300 ease-in-out"
        src={urlFor(skill.image).url()}
        alt={skill.title}
      />
    </motion.div>
  );
}
