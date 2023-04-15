import {
  createTRPCRouter,
  publicProcedure,
  privateProcedure,
} from "~/server/api/trpc";
import postsController from "~/server/api/controllers/postsController";
import { z } from "zod";

export const postsRouter = createTRPCRouter({
  getById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input }) => {
      return await postsController.getById(input.id);
    }),

  getAll: publicProcedure.query(async () => {
    return await postsController.getAll();
  }),

  getPostsByUserId: publicProcedure
    .input(z.object({ userId: z.string() }))
    .query(async ({ input }) => {
      return await postsController.getPostsByUserId(input.userId);
    }),

  create: privateProcedure
    .input(
      z.object({
        content: z.string().min(1).max(280),
      })
    )
    .mutation(async ({ ctx, input }) => {
      return await postsController.create({
        userId: ctx.userId,
        content: input.content,
      });
    }),

  delete: privateProcedure
    .input(z.object({ postId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return await postsController.delete({
        postId: input.postId,
        userId: ctx.userId,
      });
    }),

  getPostLikes: publicProcedure
    .input(z.object({ postId: z.string() }))
    .query(async ({ input }) => {
      return await postsController.getPostLikes(input.postId);
    }),

  toggleLike: privateProcedure
    .input(z.object({ postId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return await postsController.toggleLike({
        userId: ctx.userId,
        postId: input.postId,
      });
    }),

  getUserLike: publicProcedure
    .input(z.object({ postId: z.string(), userId: z.string().optional() }))
    .query(async ({ input }) => {
      return await postsController.getUserLike(input.postId, input.userId);
    }),
});
