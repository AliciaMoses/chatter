import { useUser } from "@clerk/clerk-react";
import { api } from "~/utils/api";
import { useState, useRef, useEffect } from "react";
import type { FC } from "react";
import Picker from "emoji-picker-react";

export type CreateReplyProps = {
    onNewPostCreated: (isCreated: boolean) => void;
    parentPostId: string;
  };
  
interface EmojiData {
  emoji: string;
}

const CreateReply: FC<CreateReplyProps> = ({ onNewPostCreated, parentPostId }) => {
  const { user } = useUser();
  const [input, setInput] = useState("");
  const [emojiPickerVisible, setEmojiPickerVisible] = useState(false);
  const charLimit = 255;
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const emojiPickerRef = useRef<HTMLDivElement>(null);
  const emojiButtonRef = useRef<HTMLButtonElement>(null);

  const { mutate } = api.posts.createReply.useMutation({
    onSuccess: () => {
      setInput("");
      onNewPostCreated(true);
    },
  });

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        emojiPickerRef.current &&
        emojiButtonRef.current &&
        !emojiPickerRef.current.contains(event.target as Node) &&
        !emojiButtonRef.current.contains(event.target as Node)
      ) {
        setEmojiPickerVisible(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  if (!user) return null;

  const isInputValid =
    input.length > 0 && input.length <= charLimit && !/^\s*$/.test(input);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isInputValid) {
      mutate({
          content: input,
          parentPostId
      });
    }
  };

  const onKeyPress = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    console.log(isInputValid);

    if (event.key === "Enter" && !event.shiftKey && isInputValid) {
      event.preventDefault();

      mutate({
          content: input,
          parentPostId
      });
    }
  };

  const onEmojiSelect = (emojiData: EmojiData, event: MouseEvent) => {
    event.stopPropagation();
    const emoji = emojiData.emoji;

    if (textareaRef.current) {
      const start = textareaRef.current.selectionStart || 0;
      const end = textareaRef.current.selectionEnd || 0;
      const newValue = input.substring(0, start) + emoji + input.substring(end);

      setInput(newValue);
      textareaRef.current.focus();
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label className="sr-only">Your message</label>
        <div className="flex items-center rounded-lg  border-2 border-solid border-violet-800 p-4 px-3 py-2 pb-8 pt-8 shadow-lg shadow-violet-100">
          <button
            ref={emojiButtonRef}
            type="button"
            onClick={() => setEmojiPickerVisible(!emojiPickerVisible)}
            className="hover:bg-gray-1000 cursor-pointer rounded-lg p-2 text-violet-400 hover:text-violet-900"
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
          <div className="relative" ref={emojiPickerRef}>
            {emojiPickerVisible && (
              <div className="absolute z-10">
                <Picker onEmojiClick={onEmojiSelect} />
              </div>
            )}
            {emojiPickerVisible && (
              <div
                className="absolute left-0 top-0 flex h-full w-full items-center justify-center bg-black bg-opacity-50"
                onClick={() => setEmojiPickerVisible(false)}
              ></div>
            )}
          </div>
          <textarea
            ref={textareaRef}
            className={`mx-4 block w-full rounded-lg border-2 bg-violet-100 p-2.5  font-mono text-sm text-gray-900 shadow-inner shadow-violet-400 focus:border-${
              input.length > charLimit ? "red-500" : "slate-300"
            } focus:ring-${input.length > charLimit ? "red-500" : "slate-300"}`}
            placeholder="Share your thoughts..."
            value={input}
            onChange={(event) => setInput(event.target.value)}
            onKeyPress={onKeyPress}
          ></textarea>
          <button
            type="submit"
            className={`inline-flex cursor-pointer justify-center rounded-full p-2 ${
              isInputValid
                ? "text-slate-400 hover:text-slate-600"
                : "cursor-not-allowed text-slate-200"
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
          <div className="mt-2 font-mono text-sm text-pink-700">
            Your message is too long. Please shorten it.
          </div>
        )}
      </form>
    </>
  );
};

export default CreateReply;