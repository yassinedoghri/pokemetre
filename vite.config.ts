import { defineConfig } from "vitest/config";
import { enhancedImages } from "@sveltejs/enhanced-img";
import { sveltekit } from "@sveltejs/kit/vite";
import { viteStaticCopy } from "vite-plugin-static-copy";

export default defineConfig({
  plugins: [
    enhancedImages(),
    sveltekit(),
    viteStaticCopy({
      targets: [
        {
          src: "src/lib/sprites/sprites/pokemon/*.png",
          dest: "images/pokemons",
        },
        {
          src: "src/lib/cries/cries/pokemon/latest/*.ogg",
          dest: "audio/pokemons",
        },
      ],
    }),
  ],
  server: {
    watch: {
      ignored: ["**/pokeapi/**", "**/sprites/**", "**/cries/**"],
    },
    // https://github.com/vitejs/vite/issues/16522
    host: true,
  },

  test: {
    include: ["src/**/*.{test,spec}.{js,ts}"],
  },
});
