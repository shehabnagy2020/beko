import React, { useEffect, useState } from "react";
import ImagePicker from "@/components/ImagePicker";
import FormInput from "@/components/FormInput";
import Card from "@/components/Card";
import { EMPTY_NOTIFICATION } from "helper/CONST";
import FormSelect2 from "../FormSelect2";
import ButtonLoader from "../ButtonLoader";
import MainCardBody from "./MainCardBody";
import isMissingSomething from "helper/isMissingSomething";

const NotificationCard = ({
  item,
  handleDelete,
  handleEdit,
  handleAdd,
  loader,
}) => {
  const [info, setInfo] = useState({ ...EMPTY_NOTIFICATION });
  useEffect(() => {
    if (item) setInfo({ ...item });
  }, []);
  const handleChange = (id, value) => {
    setInfo({ ...info, [id]: value });
  };
  console.log(info);
  const onHandleEdit = handleEdit
    ? () => {
        if (!isMissingSomething(info)) handleEdit(info);
      }
    : null;
  const onHandleAdd = handleAdd
    ? () => {
        // const formdata = new FormData();
        // formdata.append("full_name", info.full_name);
        // formdata.append("address", info.address);
        // formdata.append("city", info.city);
        // formdata.append("phone", info.phone);
        // formdata.append("region", info.region);
        if (!isMissingSomething(info)) handleAdd(info);
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
        <FormInput
          required={false}
          name="رقم المنتج"
          value={info["product_id"]}
          changeVlaue={(v) => handleChange("product_id", v)}
        />
        <FormInput
          required={true}
          name="الاسم"
          value={info["title"]}
          changeVlaue={(v) => handleChange("title", v)}
        />
        <FormInput
          required={true}
          name="المحتوي"
          value={info["body"]}
          changeVlaue={(v) => handleChange("body", v)}
          type="textarea"
          rows={10}
        />
      </div>
    </MainCardBody>
  );
};

export default NotificationCard;
