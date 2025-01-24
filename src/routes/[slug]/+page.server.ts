import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ params }) => {
  console.log(params.slug);
  return {
    slug: /\d+/.test(params.slug) ? params.slug : "404",
  };
};
