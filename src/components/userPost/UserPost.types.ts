import { type RouterOutputs } from "~/utils/api";

export type IndividualPost = RouterOutputs["posts"]["getAll"][number];

export type UserPostProps = IndividualPost & {
  onPostDeleted?: () => void;
};
