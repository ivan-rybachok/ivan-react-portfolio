import { Skill } from "../types";
import { sanityClient } from "../sanity";

export const fetchSkills = async () => {
  const query = `*[_type == "skill"]`;
  const skills: Skill[] = await sanityClient.fetch(query);
  return skills;
};
