import { UserButton, useUser } from "@clerk/clerk-react";
import { api } from "~/utils/api";
import { useState } from "react";

const CreatePost = () => {
  const { user } = useUser();
  const [input, setInput] = useState("");

  const { mutate } = api.posts.create.useMutation({
    onSuccess: () => {
      setInput("");
    },
  });

  if (!user) return null;

  return (
    <div className="flex w-full gap-3 border shadow-inner">
      <UserButton appearance={{
        elements: {
          userButtonAvatarBox: {
            width: 56,
            height: 56
          }
        }
      }} />
      <input
        placeholder="Add to the chatter..."
        className="grow bg-transparent outline-none"
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            if (input !== "") {
              mutate({ content: input });
            }
          }
        }}
      />
      <button
        style={{
          backgroundColor: "black",
          color: "white",
          borderRadius: "4px",
          padding: "5px 10px",
        }}
        onClick={() => mutate({ content: input })}
      >
        Post
        
      </button>
    </div>
  );
};

export default CreatePost;
