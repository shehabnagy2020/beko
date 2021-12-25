import React from "react";
import DropdownItem from "@/components/DropdownItem";

const SideMenu = ({ className, isSidemenuOpen, setIsSidemenuOpen }) => {
  return (
    <div
      className={`h-full bg-accent py-6 space-y-10 overflow-x-hidden ${className}`}
    >
      {isSidemenuOpen && (
        <>
          <button
            className="material-icons text-white bg-primary p-2 rounded-lg flex md:hidden"
            onClick={(_) => setIsSidemenuOpen(false)}
          >
            table_rows
          </button>

          <div className="flex flex-col justify-center items-center">
            <div className="material-icons text-white text-8xl">
              account_circle
            </div>
            <span className="capitalize text-white font-semibold text-2xl">
              Beko
            </span>
          </div>
          <div className="flex flex-col w-full space-y-3">
            <DropdownItem title="الفئات الاساسية" link="/categories" />
            <DropdownItem title="الفئات الفرعية" link="/sub-categories" />
            <DropdownItem title="المنتجات" link="/products" />
            <DropdownItem title="المستخدمين" link="/users" />
            <DropdownItem title="المعرض" link="/gallery" />
            <DropdownItem title="الاشعارات" link="/notifications" />
            <DropdownItem title="العروض" link="/offers" />
            <DropdownItem title="التصميم" link="/design" />
            <DropdownItem title="الطلبات" link="/orders" />
            <DropdownItem title="البيانات القانونيه" link="/legals" />
            <DropdownItem title="المحادثات" link="/chat" />
          </div>
        </>
      )}
    </div>
  );
};

export default SideMenu;
