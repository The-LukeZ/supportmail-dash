import { getGuildRoles, setGuildRoles } from "$lib/cache/guilds";
import { discordREST } from "$lib/discord/utils";
import { apiRoleToBasic } from "$lib/utils/formatting";
import type { RequestHandler } from "@sveltejs/kit";

export const GET: RequestHandler = async ({ params }) => {
  const guildId = params.slug;

  if (guildId) {
    const cachedRoles = getGuildRoles(guildId);
    if (cachedRoles) return Response.json(cachedRoles, { status: 200, statusText: "OK" });

    try {
      const roles = await discordREST.getGuildRoles(guildId);
      setGuildRoles(
        guildId,
        roles.map((r) => apiRoleToBasic(r)),
      );
      return Response.json(roles.reverse(), { status: 200, statusText: "OK" });
    } catch (err: any) {
      return Response.json(
        {
          message: err.message || "Internal Server Error",
          details: err,
        },
        { status: err.status || 500, statusText: err.statusText || "Internal Server Error" },
      );
    }
  }

  return Response.json("Bad Request", { status: 400, statusText: "Bad Request" });
};
