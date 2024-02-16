import React from "react";

const Pill = ({ image, text, handleClick }) => {
  return (
    <span className="user-pill" onClick={handleClick}>
      <img src={image} alt={text} />
      <span>{text}</span>
      <h3>&times;</h3>
    </span>
  );
};

export default Pill;
