import React, { useEffect, useState } from "react";
import ImagePicker from "@/components/ImagePicker";
import FormInput from "@/components/FormInput";
import { API, EMPTY_GALLERY } from "helper/CONST";
import FormSelect2 from "../FormSelect2";
import MainCardBody from "./MainCardBody";
import isMissingSomething from "helper/isMissingSomething";

const GalleryCard = ({ item, handleDelete, handleEdit, handleAdd, loader }) => {
  const [info, setInfo] = useState({ ...EMPTY_GALLERY });
  useEffect(() => {
    if (item) setInfo({ ...item });
  }, []);
  const handleImageChange = (id, value, valueObj) => {
    setInfo({ ...info, [id]: value, [`${id}_obj`]: valueObj });
  };
  const onHandleEdit = handleEdit
    ? () => {
        const formdata = new FormData();
        if (info.id) {
          formdata.append("id", info.id);
        }
        if (info.image_obj) {
          formdata.append("image", info.image_obj);
        }
        if (!isMissingSomething(info)) handleEdit(formdata);
      }
    : null;
  const onHandleAdd = handleAdd
    ? () => {
        const formdata = new FormData();
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
      <div className="flex flex-col space-y-8">
        <ImagePicker
          className="flex justify-center mb-5"
          data={info["image"]}
          id={"image"}
          setData={(v, vObj) => handleImageChange("image", v, vObj)}
        />
      </div>
    </MainCardBody>
  );
};

export default GalleryCard;
