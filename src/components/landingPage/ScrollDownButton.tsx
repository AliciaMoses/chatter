import React, { useCallback } from "react";

interface ScrollDownButtonProps {
  targetRef: React.RefObject<HTMLElement>;
  icon?: React.ReactNode;
  additionalClasses?: string;
}

const ScrollDownButton: React.FC<ScrollDownButtonProps> = ({
  targetRef,
  icon,
  additionalClasses = "",
}) => {
  const handleClick = useCallback(() => {
    if (targetRef.current) {
      targetRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [targetRef]);

  return (
    <button
      className={`rounded border-2  border-b-4 border-violet-800 px-4 py-2 font-bold text-violet-950 shadow-md shadow-violet-300 hover:animate-bounce hover:border-violet-800 hover:bg-violet-200 focus:outline-none focus:ring-4 focus:ring-violet-300 dark:bg-violet-100 dark:hover:bg-violet-200 dark:focus:ring-violet-800 ${additionalClasses}`}
      onClick={handleClick}
    >
      {icon}
    </button>
  );
};

export default ScrollDownButton;
