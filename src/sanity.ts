import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

declare module "@sanity/client" {
  interface SanityClient {
    fetch<T = any>(query: string): Promise<T>;
  }
}

const config = {
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "zg3d572u",
  apiVersion: "2024-01-30",
  useCdn: process.env.NODE_ENV === "production",
};

export const sanityClient = createClient(config);

const builder = imageUrlBuilder(sanityClient);
export const urlFor = (source: any) => builder.image(source);
