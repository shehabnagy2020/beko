import React, { useState, useContext } from "react";
import SideMenu from "@/components/SideMenu";
import Link from "next/link";
import HelperContext from "@/contexts/HelperContext";

const MainPageContainer = ({ className, children, addLink, title, chat }) => {
  const [isSidemenuOpen, setIsSidemenuOpen] = useState(false);
  const { mainLoader } = useContext(HelperContext);

  return (
    <div className="w-screen h-screen flex overflow-hidden">
      <SideMenu
        setIsSidemenuOpen={setIsSidemenuOpen}
        isSidemenuOpen={isSidemenuOpen}
        className={`${
          isSidemenuOpen
            ? "w-full flex-shrink-0 md:w-3/6 lg:w-2/5 xl:w-1/5 px-5"
            : "w-0"
        }`}
      />
      <div
        className={`h-full ${
          isSidemenuOpen ? "w-0 md:w-full" : "w-full"
        } ${className}`}
      >
        <div
          className="w-full bg-accent flex justify-between items-center py-6 px-5 lg:px-10"
          style={{ height: "8%" }}
        >
          <div className="flex items-center space-x-3 space-x-reverse">
            <button
              className="material-icons text-white"
              onClick={(_) => setIsSidemenuOpen((p) => !p)}
            >
              table_rows
            </button>
            <span className="capitalize text-white">{title}</span>
          </div>
          <div className="flex items-center space-x-3 space-x-reverse">
            {addLink && (
              <Link href={addLink}>
                <a className="bg-primary hover:bg-secondary py-1 px-2 rounded-lg text-white flex space-x-1 space-x-reverse items-center">
                  اضافه
                </a>
              </Link>
            )}
          </div>
        </div>
        <div
          className="bg-gray-300 w-full p-5 overflow-y-auto"
          style={{ height: "92%" }}
        >
          {chat ? (
            children
          ) : (
            <div
              className={`mx-auto flex flex-col space-y-5 my-20 ${
                isSidemenuOpen
                  ? "lg:w-9/12 xl:w-7/12"
                  : "md:w-9/12 lg:w-8/12 xl:w-7/12"
              }`}
            >
              {mainLoader ? (
                <div className="flex justify-center items-center">
                  <div className="material-icons text-6xl text-primary animate-spin">
                    track_changes
                  </div>
                </div>
              ) : (
                children
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MainPageContainer;
