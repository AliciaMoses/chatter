import { TRPCError } from "@trpc/server";
import { clerkClient } from "~/server/clerkClientWrapper";
import { PrismaClient } from "@prisma/client";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { filterUserForClient } from "~/server/helpers/filterUserForClient";
import type { Posts } from "@prisma/client";

const prisma = new PrismaClient();

const addUserDataToPosts = async (posts: Posts[]) => {
  const userId = posts.map((post) => post.authorId);
  const users = (
    await clerkClient.users.getUserList({
      userId: userId,
      limit: 110,
    })
  ).map(filterUserForClient);

  return posts.map((post) => {
    const author = users.find((user) => user.id === post.authorId);

    if (!author) {
      console.error("AUTHOR NOT FOUND", post);
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: `Author for post not found. POST ID: ${post.id}, USER ID: ${post.authorId}`,
      });
    }
    if (!author.username) {
      
      if (!author.externalUsername) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: `Author has no GitHub Account: ${author.id}`,
        });
      }
      author.username = author.externalUsername;
    }
    return {
      post,
      author: {
        ...author,
        username: author.username ?? "(username not found)",
      },
    };
  });
};

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(3, "1 m"),
  analytics: true,
});

const postsController = {
  create: async ({ userId, content }: { userId: string; content: string }) => {
    const { success } = await ratelimit.limit(userId);
    if (!success) throw new TRPCError({ code: "TOO_MANY_REQUESTS" });

    const post = await prisma.posts.create({
      data: {
        authorId: userId,
        content,
      },
    });
    return post;
  },
  getById: async (id: string) => {
    const post = await prisma.posts.findUnique({
      where: { id },
    });

    if (!post) throw new TRPCError({ code: "NOT_FOUND" });

    return (await addUserDataToPosts([post]))[0];
  },

  getAll: async () => {
    const posts = await prisma.posts.findMany({
      take: 100,
      orderBy: [{ createdAt: "desc" }],
    });

    return addUserDataToPosts(posts);
  },

  getPostsByUserId: async (userId: string) => {
    const posts = await prisma.posts.findMany({
      where: {
        authorId: userId,
      },
      take: 100,
      orderBy: [{ createdAt: "desc" }],
    });

    return addUserDataToPosts(posts);
  },
 

  getPostLikes: async (postId: string) => {
    const likes = await prisma.likes.count({
      where: {
        postId,
      },
    });
    return likes;
  },
  
};

export default postsController;