import React from "react";

const ButtonLoader = ({ loader, children, color }) => {
  return (
    <div className="flex justify-items-center items-center">
      {loader ? (
        <div
          className={`material-icons animate-spin rounded-lg text-${
            color ? color : "primary"
          } text-3xl`}
        >
          rotate_right
        </div>
      ) : (
        children
      )}
    </div>
  );
};

export default ButtonLoader;
