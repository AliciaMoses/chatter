import { createTRPCRouter } from "~/server/api/trpc";
import { postsRouter } from "~/server/api/routers/postsRouter";
import { profileRouter } from "./routers/profileRouter";
/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  posts: postsRouter,
  profiles: profileRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;
