import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Slice & Spice",
    short_name: "SliceSpice",
    start_url: "/",
    display: "standalone",
    background_color: "#1e1e1e",
    theme_color: "#d4af37",

    icons: [
      {
        src: "/icons/icon-192.png",
        sizes: "192x192",
        type: "image/png"
      },
      {
        src: "/icons/icon-512.png",
        sizes: "512x512",
        type: "image/png"
      }
    ]
  };
}