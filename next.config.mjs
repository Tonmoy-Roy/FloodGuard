import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactCompiler: true,
  images: {
    domains: ["res.cloudinary.com"],
  },
  turbopack: {
    root: __dirname,
  },
};

export default nextConfig;
