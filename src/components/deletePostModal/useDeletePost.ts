
import { api } from "~/utils/api";
import { useUser } from "@clerk/clerk-react";

export const useDeletePost = (onPostDeleted?: () => void) => {
  const { user } = useUser();

  const deletePostMutation = api.posts.delete.useMutation({
    onSuccess: () => {
      console.log("post deleted");
      if (onPostDeleted) {
        onPostDeleted();
      }
    },
  });

  const deletePost = async (postId: string, authorId: string): Promise<void> => {
    try {
      if (!user || user.id !== authorId) {
        return;
      }
      return await deletePostMutation.mutateAsync({ postId });
    } catch (error) {
      throw error;
    }
  };

  return { deletePost };
};
