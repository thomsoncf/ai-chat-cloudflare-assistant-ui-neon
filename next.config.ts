import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
};


// added by create cloudflare to enable calling `getCloudflareContext()` in `next dev`
import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";
initOpenNextCloudflareForDev();

export default nextConfig;