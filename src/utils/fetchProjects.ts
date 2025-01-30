import { Project } from "../types";
import { sanityClient } from "../sanity";

export const fetchProjects = async () => {
  const query = `*[_type == "project"] {
    ...,
    technologies[]->
  }`;
  const projects: Project[] = await sanityClient.fetch(query);
  return projects;
};
