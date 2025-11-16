// @ts-check
import { defineConfig } from "astro/config"
import tailwindcss from "@tailwindcss/vite"

process.env.ASTRO_TELEMETRY_DISABLED = "1"

export default defineConfig({
  // base: "/~self/zensur/",
  server: {
    host: true
  },
  build: {
    assets: "assets"
  },
  integrations: [],
  vite: {
    plugins: [tailwindcss()],
    build: {
      rollupOptions: {
        output: {
          entryFileNames: "[name].js",
          chunkFileNames: "[name].js",
          assetFileNames: "[name].[ext]"
        }
      },
      assetsInlineLimit: 100000
    }
  }
})
