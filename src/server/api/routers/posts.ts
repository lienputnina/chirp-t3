import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const postsRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    // publicProcedure - a method to generate the function that the client calls
    // stuff returned will be available to all users
    return ctx.prisma.post.findMany();
  }),
});
