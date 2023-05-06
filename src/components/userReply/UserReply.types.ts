import { type RouterOutputs } from "~/utils/api";

export type IndividualPost = RouterOutputs["posts"]["getAll"][number];

export type UserReplyProps = IndividualPost & {
  onPostDeleted?: () => void;
  parentPostId: string;
  onRepliesUpdated: () => void;
};
