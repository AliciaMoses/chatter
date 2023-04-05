
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const postsController = {

  getAll: async () => {
    return await prisma.posts.findMany();
  },
};
