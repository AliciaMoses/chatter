import { useUser } from "@clerk/clerk-react";

interface CreatePostProps {
  useUserHook: typeof useUser;
}

const CreatePost: React.FC<CreatePostProps> = ({ useUserHook }) => {
  const { user } = useUserHook();
  if (!user) return null;

  return (
    <div>
      <img src={user.profileImageUrl} alt="user profile image" />
    </div>
  );
};

export default CreatePost;