import React, { useEffect, useState } from "react";
import ImagePicker from "@/components/ImagePicker";
import FormInput from "@/components/FormInput";
import Card from "@/components/Card";
import { EMPTY_CATEGORIES } from "helper/CONST";
import FormSelect2 from "../FormSelect2";
import ButtonLoader from "../ButtonLoader";

const MainCardBody = ({
  handleDelete,
  handleEdit,
  handleAdd,
  loader,
  children,
  item,
  setOrderModal,
}) => {
  return (
    <Card className="space-y-5">
      <div className="">{children}</div>
      <div className="flex justify-center space-x-3 space-x-reverse items-center ">
        {handleEdit && (
          <ButtonLoader loader={loader.edit}>
            <button
              className="py-2 px-4 rounded-lg text-white bg-primary hover:bg-secondary flex space-x-1 space-x-reverse items-center"
              onClick={handleEdit}
            >
              <span className="material-icons text-lg">save</span>
              <span className="">تعديل</span>
            </button>
          </ButtonLoader>
        )}
        {setOrderModal && (
          <ButtonLoader>
            <button
              className="py-2 px-4 rounded-lg text-white bg-blue-500 hover:bg-blue-400 flex space-x-1 space-x-reverse items-center"
              onClick={(_) => setOrderModal(true)}
            >
              <span className="material-icons text-lg">info</span>
              <span className="">رؤية المنتجات</span>
            </button>
          </ButtonLoader>
        )}
        {handleDelete && (
          <ButtonLoader loader={loader.delete}>
            <button
              className="py-2 px-4 rounded-lg text-white bg-red-500 hover:bg-red-400 flex space-x-1 space-x-reverse items-center"
              onClick={(_) => handleDelete(item.id)}
            >
              <span className="material-icons text-lg">delete</span>
              <span className="">حذف</span>
            </button>
          </ButtonLoader>
        )}
        {handleAdd && (
          <ButtonLoader loader={loader.add}>
            <button
              className="py-2 px-4 rounded-lg text-white bg-green-500 hover:bg-green-400 flex space-x-1 space-x-reverse items-center"
              onClick={handleAdd}
            >
              <span className="material-icons text-lg">add</span>
              <span className="">اضافه</span>
            </button>
          </ButtonLoader>
        )}
      </div>
    </Card>
  );
};

export default MainCardBody;
