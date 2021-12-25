import React, { useContext, useEffect, useState } from "react";
import ImagePicker from "@/components/ImagePicker";
import FormInput from "@/components/FormInput";
import { API, CATEGORIES_TYPES, EMPTY_SUBCATEGORIES } from "helper/CONST";
import FormSelect2 from "../FormSelect2";
import MainCardBody from "./MainCardBody";
import isMissingSomething from "helper/isMissingSomething";
import HelperContext from "@/contexts/HelperContext";

const SubCategoriesCard = ({
  item,
  handleDelete,
  handleEdit,
  handleAdd,
  loader,
}) => {
  const [info, setInfo] = useState({ ...EMPTY_SUBCATEGORIES });
  const { categories } = useContext(HelperContext);
  useEffect(() => {
    if (item) setInfo({ ...item });
  }, []);
  const handleChange = (id, value) => {
    setInfo({ ...info, [id]: value });
  };
  const handleImageChange = (id, value, valueObj) => {
    setInfo({ ...info, [id]: value, [`${id}_obj`]: valueObj });
  };
  const onHandleEdit = handleEdit
    ? () => {
        const formdata = new FormData();
        console.log(info);
        formdata.append("name", info.name);
        formdata.append("parent_id", info.parent_id);
        formdata.append("type", info.type);
        if (info.image_obj) {
          formdata.append("image", info.image_obj);
        }
        if (info.id) {
          formdata.append("id", info.id);
        }
        if (!isMissingSomething(info)) handleEdit(formdata);
      }
    : null;
  const onHandleAdd = handleAdd
    ? () => {
        const formdata = new FormData();
        formdata.append("name", info.name);
        formdata.append("parent_id", info.parent_id);
        formdata.append("type", info.type);
        if (info.image_obj) {
          formdata.append("image", info.image_obj);
        }
        if (!isMissingSomething(info)) handleAdd(formdata);
      }
    : null;

  return (
    <MainCardBody
      handleAdd={onHandleAdd}
      handleEdit={onHandleEdit}
      handleDelete={handleDelete}
      item={item ? item : null}
      loader={loader}
    >
      {/* <div className="flex justify-between space-x-3 space-x-reverse items-center">
        <span className="capitalize text-xl text-accent truncate">
          {info["name"]}
        </span>
      </div> */}
      <div className="flex flex-col space-y-8">
        <ImagePicker
          className="flex justify-center mb-5"
          data={info["image"]}
          id={"image"}
          setData={(v, vObj) => handleImageChange("image", v, vObj)}
        />
        <FormInput
          required={true}
          id="name"
          name="الاسم"
          value={info["name"]}
          changeVlaue={(v) => handleChange("name", v)}
        />
        <FormSelect2
          name=" نوع الفئه الاساسية"
          selectable={categories.all}
          value={info["parent_id"]}
          changeVlaue={(v) => handleChange("parent_id", v)}
          valueAsId={true}
        />
        {/* <FormSelect2
          name="المجموعه المنتمي اليها"
          selectable={info["type"] ? categories[info.type] : categories.all}
          value={info["parent_id"]}
          changeVlaue={(v) => handleChange("parent_id", v)}
          valueAsId={true}
        /> */}
      </div>
    </MainCardBody>
  );
};

export default SubCategoriesCard;
