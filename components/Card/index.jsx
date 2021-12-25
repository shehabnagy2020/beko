import React from "react";

const Card = ({ className, children }) => {
  return (
    <div
      className={`bg-white p-5 rounded-lg shadow-lg flex flex-col ${className}`}
    >
      {children}
    </div>
  );
};

export default Card;
