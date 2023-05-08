import React from "react";

const DownArrowIcon: React.FC = () => {
  return (
    <svg
      className="h-8 w-8 text-black"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      strokeWidth="2"
      stroke="currentColor"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {" "}
      <path stroke="none" d="M0 0h24v24H0z" />{" "}
      <line x1="12" y1="5" x2="12" y2="19" />{" "}
      <line x1="16" y1="15" x2="12" y2="19" />{" "}
      <line x1="8" y1="15" x2="12" y2="19" />
    </svg>
  );
};

export default DownArrowIcon;
