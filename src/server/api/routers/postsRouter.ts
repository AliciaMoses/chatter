import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { postsController } from "~/server/api/controllers/postsController";

export const postsRouter = createTRPCRouter({
  getAll: publicProcedure.query(() => {
    return postsController.getAll();
  }),
});