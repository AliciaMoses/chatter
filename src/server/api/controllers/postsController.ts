import { TRPCError } from "@trpc/server";
import { clerkClient } from "../../clerkClientWrapper";
import { PrismaClient } from "@prisma/client";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { filterUserForClient } from "../../helpers/filterUserForClient";
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
 

toggleLike: async ({ userId, postId }: { userId: string; postId: string }) => {
 
  const existingLike = await prisma.likes.findUnique({
    where: {
      authorId_postId: {
        authorId: userId,
        postId: postId,
      },
    },
  });

  if (existingLike) {
    
    await prisma.likes.delete({
      where: {
        id: existingLike.id,
      },
    });
  } else {
   
    await prisma.likes.create({
      data: {
        authorId: userId,
        postId: postId,
      },
    });
  }
},

getUserLike: async (postId: string, userId?: string) => {
  const likes = await prisma.likes.findMany({
    where: {
      postId,
      ...(userId && { authorId: userId }),
    },
  });
  return { isLiked: likes.length > 0, count: likes.length };
},

getLikedPostsByUserId: async (userId: string) => {
  const likedPosts = await prisma.likes.findMany({
    where: {
      authorId: userId,
    },
    include: {
      post: true,
    },
  });

  const postsWithUserData = await addUserDataToPosts(
    likedPosts.map((like) => like.post)
  );

  return postsWithUserData;
},

delete: async ({ postId, userId }: { postId: string; userId: string }) => {
 
  const post = await prisma.posts.findUnique({
    where: { id: postId },
  });
  
  if (!post) {
    throw new TRPCError({ code: "NOT_FOUND" });
  }

  if (post.authorId !== userId) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }

  await prisma.posts.delete({
    where: { id: postId },
  });
},
createReply: async ({ userId, content, parentPostId }: { userId: string; content: string; parentPostId: string }) => {
  const { success } = await ratelimit.limit(userId);
  if (!success) throw new TRPCError({ code: "TOO_MANY_REQUESTS" });

  const reply = await prisma.posts.create({
    data: {
      authorId: userId,
      content,
      parentPostId,
    },
  });
  return reply;
},
getReplies: async (parentPostId: string) => {
  const replies = await prisma.posts.findMany({
    where: {
      parentPostId: parentPostId,
    },
    orderBy: [{ createdAt: "desc" }],
  });

  return addUserDataToPosts(replies);
},

getAllWithReplies: async () => {
  const posts = await prisma.posts.findMany({
    where: {
      parentPostId: null,
    },
    orderBy: [{ createdAt: "desc" }],
  });

  const postsWithReplies = await Promise.all(
    posts.map(async (post) => {
      const replies = await postsController.getReplies(post.id);
      return { ...post, replies };
    })
  );

  return addUserDataToPosts(postsWithReplies);
},



};

export default postsController;