import { data } from "autoprefixer";
import React, { useEffect, useState } from "react";

const Paganition = ({ activeItem, setActiveItem, dataItems = [] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    setActiveItem({ ...dataItems[currentIndex] });
  }, [currentIndex]);
  useEffect(() => {
    setCurrentIndex(0);
  }, [dataItems]);
  const getNext = () => {
    if (currentIndex < dataItems.length - 1) {
      setCurrentIndex((p) => p + 1);
    }
  };
  const getPrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex((p) => p - 1);
    }
  };
  return (
    <div className="bg-white p-3 rounded-lg shadow-lg ">
      <div className="flex justify-between items-center">
        <button
          className={`material-icons p-2 rounded-full text-white ${
            currentIndex > 0 ? "bg-primary hover:bg-secondary" : "bg-gray-400"
          }`}
          onClick={getPrevious}
        >
          keyboard_arrow_right
        </button>
        <div className="flex space-x-2 space-x-reverse items-center text-accent capitalize text-md">
          <span>{currentIndex + 1}</span>
          <span>من</span>
          <span>{dataItems.length}</span>
        </div>
        <button
          className={`material-icons p-2 rounded-full text-white ${
            currentIndex < dataItems.length - 1
              ? "bg-primary hover:bg-secondary"
              : "bg-gray-400"
          }`}
          onClick={getNext}
        >
          keyboard_arrow_left
        </button>
      </div>
    </div>
  );
};

export default Paganition;
