/// <reference types="vitest/config" />

import { vanillaExtractPlugin } from "@vanilla-extract/vite-plugin";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import zipPack from "vite-plugin-zip-pack";
import { name, version } from "./package.json";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vanillaExtractPlugin(),
    react(),
    zipPack({
      outFileName: `${name}_v${version}.zip`,
    }),
  ],
  test: {
    environment: "happy-dom",
    setupFiles: ["./vitest.setup.ts"],
  },
});
