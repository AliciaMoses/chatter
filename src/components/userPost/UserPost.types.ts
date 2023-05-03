import { type RouterOutputs } from "~/utils/api";


export type IndividualPost = RouterOutputs["posts"]["getAllWithReplies"][number];

export type UserPostProps = IndividualPost & {
  onPostDeleted?: () => void;
  parentPostId?: string;
};

export type UserPostWithData = {
  post: IndividualPost;
  author: {
    username: string;
    id: string;
    profileImageUrl: string;
    externalUsername: string | null;
  };
  onPostDeleted?: () => void;
};
