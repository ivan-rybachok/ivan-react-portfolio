import { Social } from "../types";
import { sanityClient } from "../sanity";

export const fetchSocials = async () => {
  const query = `*[_type == "social"]`;
  const socials: Social[] = await sanityClient.fetch(query);
  return socials;
};
