import React, { useCallback } from "react";

interface ScrollToTargetLinkProps {
  targetRef: React.RefObject<HTMLElement>;
  text?: string;
  additionalClasses?: string;
}

const ScrollToTargetLink: React.FC<ScrollToTargetLinkProps> = ({
  targetRef,
  text,
  additionalClasses = "",
}) => {
  const handleClick = useCallback(
    (event: { preventDefault: () => void; }) => {
      event.preventDefault();
      if (targetRef.current) {
        targetRef.current.scrollIntoView({ behavior: "smooth" });
      }
    },
    [targetRef]
  );

  return (
    <a
      href="#"
      className={`text-violet-950 hover:text-violet-800 focus:outline-none focus:ring-4 focus:ring-violet-300 dark:focus:ring-violet-800 ${additionalClasses}`}
      onClick={handleClick}
    >
      {text}
    </a>
  );
};

export default ScrollToTargetLink;
