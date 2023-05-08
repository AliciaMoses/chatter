import React from "react";

const PrintIcon: React.FC = () => {
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
      <path d="M18.9 7a8 8 0 0 1 1.1 5v1a6 6 0 0 0 .8 3" />{" "}
      <path d="M8 11a4 4 0 0 1 8 0v1a10 10 0 0 0 2 6" />{" "}
      <path d="M12 11v2a14 14 0 0 0 2.5 8" />{" "}
      <path d="M8 15a18 18 0 0 0 1.8 6" />{" "}
      <path d="M4.9 19a22 22 0 0 1 -.9 -7v-1a8 8 0 0 1 12 -6.95" />
    </svg>
  );
};

export default PrintIcon;