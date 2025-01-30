import { PageInfo } from "../types";
import { sanityClient } from "../sanity";

export const fetchPageInfo = async () => {
  const query = `*[_type == "pageInfo"][0]`;
  const pageInfo: PageInfo = await sanityClient.fetch(query);
  return pageInfo;
};
