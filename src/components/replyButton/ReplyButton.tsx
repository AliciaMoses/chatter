import React from "react";
import ReplyIcon from "./ReplyIcon";

type ReplyButtonProps = {
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

const ReplyButton: React.FC<ReplyButtonProps> = ({ onClick }) => {
  return (
    <button onClick={onClick}>
      <ReplyIcon />
    </button>
  );
};

export default ReplyButton;
