import { useUser } from "@clerk/clerk-react";
import { api } from "~/utils/api";
import { useState } from "react";

const CreatePost = () => {
  const { user } = useUser();
  const [input, setInput] = useState("");
  const charLimit = 255;

  const { mutate } = api.posts.create.useMutation({
    onSuccess: () => {
      setInput("");
    },
  });

  if (!user) return null;

  const isInputValid = input.length > 0 && input.length <= charLimit;

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isInputValid) {
      mutate({ content: input });
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label className="sr-only">Your message</label>
        <div className="flex items-center rounded-lg border border-solid border-slate-200 bg-slate-100 p-4 pt-8 pb-8 px-3 py-2 shadow-md">
        <button
          type="button"
          className="hover:bg-gray-1000 cursor-pointer rounded-lg p-2 text-slate-400 hover:text-gray-900"
        >
        <svg
            aria-hidden="true"
            className="h-6 w-6"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 100-2 1 1 0 000 2zm7-1a1 1 0 11-2 0 1 1 0 012 0zm-.464 5.535a1 1 0 10-1.415-1.414 3 3 0 01-4.242 0 1 1 0 00-1.415 1.414 5 5 0 007.072 0z"
              clipRule="evenodd"
            ></path>
          </svg>
          <span className="sr-only">Add emoji</span>
          </button>
          <textarea
            className={`mx-4 block w-full rounded-lg bg-slate-100 p-2.5  text-sm text-gray-900 font-mono shadow-inner focus:border-${
              input.length > charLimit ? "red-500" : "slate-300"
            } focus:ring-${input.length > charLimit ? "red-500" : "slate-300"}`}
            placeholder="Share your thoughts..."
            value={input}
            onChange={(event) => setInput(event.target.value)}
          ></textarea>
          <button
            type="submit"
            className={`inline-flex cursor-pointer justify-center rounded-full p-2 ${
              isInputValid
                ? "text-slate-400 hover:text-slate-600"
                : "text-slate-200 cursor-not-allowed"
            }`}
            disabled={!isInputValid}
          >
            <svg
            aria-hidden="true"
            className="h-6 w-6 rotate-90"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path>
          </svg>
          <span className="sr-only">Send message</span>
          </button>
        </div>
        {input.length > charLimit && (
          <div className="mt-2 font-mono text-pink-700 text-sm">
            Your message is too long. Please shorten it.
          </div>
        )}
      </form>
    </>
  );
};

export default CreatePost;
