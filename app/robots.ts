import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/dashboard/", "/messages/", "/profile/"],
    },
    sitemap: "https://nearby.market/sitemap.xml",
  };
}