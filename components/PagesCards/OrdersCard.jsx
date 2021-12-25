import React, { useEffect, useState } from "react";
import ImagePicker from "@/components/ImagePicker";
import FormInput from "@/components/FormInput";
import { EMPTY_ORDER } from "helper/CONST";
import Moment from "moment";
import MainCardBody from "./MainCardBody";
import isMissingSomething from "helper/isMissingSomething";
import OrderModal from "../OrderModal";
import CustomLink from "../CustomLink";

const OrdersCard = ({ item, handleDelete, handleEdit, handleAdd, loader }) => {
  const [info, setInfo] = useState({ ...EMPTY_ORDER });
  const [orderModal, setOrderModal] = useState(false);

  const see_order = (id) => {
    let oldVals = localStorage.getItem("ordersIDs")
      ? JSON.parse(localStorage.getItem("ordersIDs"))
      : [];

    oldVals.push(id);
    localStorage.setItem("ordersIDs", JSON.stringify(oldVals));
  };

  useEffect(() => {
    if (item.id) {
      setInfo({ ...item });
      see_order(item.id);
    }
  }, []);

  const handleChange = (id, value) => {
    setInfo({ ...info, [id]: value });
  };

  const onHandleEdit = handleEdit
    ? () => {
        console.log(info);
        if (!isMissingSomething(info)) handleEdit(info);
      }
    : null;

  const onHandleAdd = handleAdd
    ? () => {
        const formdata = new FormData();
        formdata.append("name", info.name);
        formdata.append("price", info.price);
        formdata.append("sale_price", info.sale_price);
        formdata.append("description", info.description);
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
      setOrderModal={setOrderModal}
    >
      <div className="flex flex-col space-y-8">
        <div className="flex flex-col space-y-2 item-center justify-center text-center">
          <span className="text-lg md:text-xl font-bold">مرسل الطلب</span>
          {item.User && (
            <div>
              <h3>{`الرقم التعريفي: ${item.User.id}`}</h3>
              <h3>{`الاسم: ${item.User.full_name}`}</h3>

              <h3>
                العنوان:
                <a
                  target="_blank"
                  href={`https://www.google.com/maps/dir/?api=1&destination=${item.lat}, ${item.long}`}
                  className="text-blue-500"
                >
                  {" "}
                  {item.User.address}
                </a>
              </h3>
              <h3>{`المدينه: ${item.User.city}`}</h3>
              <h3>{`المنطقه: ${item.User.region}`}</h3>
              <h3>{`الايميل: ${item.User.email}`}</h3>
              <h3>{`رقم الهاتف: ${item.User.phone}`}</h3>
            </div>
          )}
        </div>
        <div className="flex justify-around">
          <div className="flex flex-col space-y-2 item-center justify-center text-center">
            <span className="text-lg md:text-xl font-bold">تاريخ الارسال</span>
            <span className="text-sm md:text-md font-normal">
              {Moment(item.created_at).format("yyyy/MM/DD")}
            </span>
          </div>
          <div className="flex flex-col space-y-2 item-center justify-center text-center">
            <span className="text-lg md:text-xl font-bold">المجموع الكلي</span>
            <span className="text-sm md:text-md font-normal">
              {item.total_price}
            </span>
          </div>
        </div>

        <FormInput
          required={true}
          name="الملاحظات"
          value={info["note"]}
          type="textarea"
          rows={3}
          changeVlaue={(v) => handleChange("note", v)}
        />
      </div>
      {orderModal && (
        <OrderModal
          info={info}
          setInfo={setInfo}
          item={item}
          setOrderModal={setOrderModal}
          onHandleEdit={onHandleEdit}
          loader={loader}
        />
      )}
    </MainCardBody>
  );
};

export default OrdersCard;
