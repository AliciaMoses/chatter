import { differenceInDays, formatDistanceToNow } from "date-fns";

export const calculateRelativeTime = (postDate: Date) => {
  const daysDifference = differenceInDays(new Date(), postDate);
  return daysDifference < 2
    ? formatDistanceToNow(postDate, {
        addSuffix: true,
      })
    : postDate.toLocaleDateString();
};