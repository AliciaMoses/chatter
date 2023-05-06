import React from "react";

const RocketIcon: React.FC = () => {
  return (
    <svg
      className="h-5 w-5 text-violet-950"
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
      <path d="M4 13a8 8 0 0 1 7 7a6 6 0 0 0 3 -5a9 9 0 0 0 6 -8a3 3 0 0 0 -3 -3a9 9 0 0 0 -8 6a6 6 0 0 0 -5 3" />{" "}
      <path d="M7 14a6 6 0 0 0 -3 6a6 6 0 0 0 6 -3" />{" "}
      <circle cx="15" cy="9" r="1" />
    </svg>
  );
};

export default RocketIcon;
