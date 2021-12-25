import React, { useEffect, useState } from "react";
import ImagePicker from "@/components/ImagePicker";
import FormInput from "@/components/FormInput";
import Card from "@/components/Card";
import { EMPTY_USER } from "helper/CONST";
import FormSelect2 from "../FormSelect2";
import ButtonLoader from "../ButtonLoader";
import MainCardBody from "./MainCardBody";
import isMissingSomething from "helper/isMissingSomething";

const UserCard = ({ item, handleDelete, handleEdit, handleAdd, loader }) => {
  const [info, setInfo] = useState({ ...EMPTY_USER });
  useEffect(() => {
    if (item) setInfo({ ...item });
  }, []);
  const handleChange = (id, value) => {
    setInfo({ ...info, [id]: value });
  };

  const onHandleEdit = handleEdit
    ? () => {
        if (
          !isMissingSomething(info, [
            "facebook_token",
            "google_token",
            "notification_token",
          ])
        )
          handleEdit(info);
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
  console.log(info);
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
          required={true}
          name="الاسم"
          value={info["full_name"]}
          changeVlaue={(v) => handleChange("full_name", v)}
        />
        <FormInput
          required={true}
          name="المدينه"
          value={info["city"]}
          changeVlaue={(v) => handleChange("city", v)}
        />
        <FormInput
          required={true}
          name="العنوان"
          value={info["address"]}
          changeVlaue={(v) => handleChange("address", v)}
        />
        <FormInput
          required={true}
          id="full_name"
          name="المنطقه"
          value={info["region"]}
          changeVlaue={(v) => handleChange("region", v)}
        />
        <FormInput
          required={true}
          type="tel"
          name="رقم الهاتف"
          value={info["phone"]}
          changeVlaue={(v) => handleChange("phone", v)}
        />
        {/* <select
          value={info["type"]}
          onChange={(e) => handleChange("type", e.target.value)}
          className="w-full border rounded-lg p-3"
        >
          <option value="product">تسوق اونلاين</option>
          <option value="service">فئة الخدمات</option>
        </select> */}
      </div>
    </MainCardBody>
  );
};

export default UserCard;
