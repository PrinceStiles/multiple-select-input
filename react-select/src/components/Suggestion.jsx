import React from "react";

const Suggestion = ({ image, text, handleClick }) => {
  return (
    <span className="user-suggestion" onClick={handleClick}>
      <img src={image} alt={text} />
      <span>{text}</span>
    </span>
  );
};

export default Suggestion;
