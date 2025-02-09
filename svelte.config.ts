import adapter from "@sveltejs/adapter-node";
import { Config } from "@sveltejs/kit";
import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";

const config = {
  preprocess: vitePreprocess(),

  kit: {
    adapter: adapter(),
    env: {
      dir: ".env.dev",
    },
  },
} satisfies Config;

export default config;
