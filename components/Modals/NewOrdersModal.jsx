import React, { useContext } from "react";
import Link from "next/link";
import HelperContext from "@/contexts/HelperContext";

const NewOrdersModal = () => {
  const { newOrdersIndi, setNewOrdersIndi } = useContext(HelperContext);
  const handleClick = (e) => {
    e.stopPropagation();
    setNewOrdersIndi(false);
  };
  return (
    <div
      className={`w-screen h-screen bg-black top-0 bg-opacity-50 left-0 z-10 ${
        newOrdersIndi ? "fixed" : "hidden"
      }`}
      onClick={handleClick}
    >
      <div className="relative w-full h-full flex items-center justify-center">
        <div className="bg-white rounded-lg py-5 px-3 w-5/6 md:w-3/6 2xl:w-2/6">
          <div className="flex justify-between items-center mb-5">
            <h1 className="text-2xl">الطلبات</h1>
            <button className="" onClick={(_) => setNewOrdersIndi(false)}>
              <i className="material-icons">close</i>
            </button>
          </div>
          <div className="text-center">
            <p className="">
              يوجد طلبات جديدة متوفرة{" "}
              <Link href="/orders">
                <a className="text-blue-500 font-bold">الذهاب إلي الطلبات</a>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewOrdersModal;
