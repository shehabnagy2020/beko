import React, { useState } from "react";
import CustomLink from "@/components/CustomLink";

const DropdownItem = ({ title, link, items }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="w-full text-white">
      <div className="flex justify-between items-center">
        <CustomLink
          href={link}
          className="capitalize text-xl font-semibold"
          activeClassName="text-primary"
        >
          {title}
        </CustomLink>
        {items && items.length >= 1 && (
          <button
            className="material-icons px-2 bg-primary rounded-md"
            onClick={(_) => setIsOpen((p) => !p)}
          >
            keyboard_arrow_down
          </button>
        )}
      </div>
      {items && items.length >= 1 && (
        <div
          className={`w-full text-white pl-3 space-y-3 overflow-hidden ${
            isOpen ? "h-auto my-3" : "h-0"
          }`}
        >
          {items.map((item, i) => (
            <div className="flex justify-between items-center" key={i}>
              <CustomLink
                href={item.link}
                className="capitalize text-xl font-semibold"
                activeClassName="text-primary"
              >
                {item.title}
              </CustomLink>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DropdownItem;
