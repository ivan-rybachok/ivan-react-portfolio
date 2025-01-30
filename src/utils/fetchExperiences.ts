import { Experience } from "../types";
import { sanityClient } from "../sanity";

export const fetchExperiences = async () => {
  const query = `*[_type == "experience"] {
    ...,
    technologies[]->
  }`;
  const experiences: Experience[] = await sanityClient.fetch(query);
  return experiences;
};
