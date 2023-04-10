import { clerkClient } from "@clerk/nextjs/server";
import { TRPCError } from "@trpc/server";

import { filterUserForClient } from "~/server/helpers/filterUserForClient";

export const getUserByUsername = async (input: { username: string }) => {
  const [user] = await clerkClient.users.getUserList({
    username: [input.username],
  });

  if (!user) {
    const users = (
      await clerkClient.users.getUserList({
        limit: 200,
      })
    );
    const user = users.find((user) =>
      user.externalAccounts.find((account) => account.username === input.username)
    );
    if (!user) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "User not found",
      });
    }
    return filterUserForClient(user);
  }

  return filterUserForClient(user);
};
