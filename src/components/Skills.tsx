import React, { useState } from "react";
import { motion } from "framer-motion";
import Skill from "./Skill";
import { Skill as SkillType } from "../types";

type Props = {
  skills: SkillType[];
};

export default function Skills({ skills }: Props) {
  const [selectedSkill, setSelectedSkill] = useState("");

  const sortSkills = (skill1: SkillType, skill2: SkillType) => {
    if (skill1.progress < skill2.progress) return 1;
    if (skill1.progress > skill2.progress) return -1;
    return 0;
  };

  return (
    <div className="flex relative flex-col text-center md:text-left max-w-[2000px] xl:px-10 h-screen py-10 space-y-6 justify-start lg:justify-evenly mx-auto items-center">
      <h3 className="section-title">Skills</h3>

      <div className="grid grid-cols-3 mt-14 md:grid-cols-4 lg:grid-cols-5 gap-x-6 gap-y-4 lg:gap-x-10 lg:gap-y-8">
        {skills
          ?.sort(sortSkills)
          .map((skill, i) => (
            <Skill
              key={skill._id}
              skill={skill}
              setSelectedSkill={setSelectedSkill}
              directionTop={i % 2 === 0}
            />
          ))}
      </div>

      <motion.div
        key={selectedSkill}
        initial={{ x: 30, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="h-5 flex flex-col gap-3 text-center"
      >
        {selectedSkill && (
          <p className="text-3xl italic text-gray-800/90 dark:text-gray-300 font-bold">
            {selectedSkill}
          </p>
        )}
      </motion.div>
    </div>
  );
}
