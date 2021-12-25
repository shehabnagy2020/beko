import React from "react";
import ButtonLoader from "../ButtonLoader";
import FormInput from "../FormInput";
import ImagePicker from "../ImagePicker";

const OrderModal = ({
  setOrderModal,
  item,
  onHandleEdit,
  loader,
  info,
  setInfo,
}) => {
  const handleChange = (index, id, value) => {
    let oldInfo = { ...info };
    oldInfo.Order_Products[index][id] = value;
    setInfo({ ...oldInfo });
  };
  console.log(item);
  return (
    <div
      className="fixed top-0 left-0 w-screen h-screen z-10 overflow-hidden"
      onClick={(_) => setOrderModal(false)}
    >
      <div className="relative w-full h-full">
        <div className="absolute top-0 left-0 h-full w-full bg-black bg-opacity-90" />
        <div
          onClick={(e) => e.stopPropagation()}
          className="bg-white rounded-lg abs-center absolute w-11/12 lg:w-7/12 overflow-hidden flex flex-col space-y-5 py-5"
          style={{ maxHeight: "80%" }}
        >
          <div className="flex justify-between items-center px-5">
            <h3 className="font-bold">طلب {item.User.full_name}</h3>
            <button
              className="material-icons p-1 rounded-lg bg-red-500 text-white"
              onClick={(_) => setOrderModal(false)}
            >
              close
            </button>
          </div>
          <div className="overflow-auto flex-grow">
            <div className="mt-7 flex flex-col space-y-8">
              {item.Order_Products.map((p, i) => (
                <>
                  <div className="flex flex-col space-y-4" key={i}>
                    <div className="flex flex-col justify-center items-center text-center">
                      <ImagePicker
                        className="flex justify-center mb-1"
                        data={p.Product["image"]}
                        editable={false}
                        imageDi="w-40 h-40"
                      />
                      <span className="font-semibold">{p.Product["name"]}</span>
                    </div>
                    <div className="w-full flex flex-col md:flex-row space-y-4 md:space-y-0 md:justify-around md:items-center">
                      <FormInput
                        required={true}
                        name="الكميه"
                        value={p.quantity}
                        changeVlaue={(v) => handleChange(i, "quantity", v)}
                        type="number"
                      />
                      <FormInput
                        required={true}
                        name="السعر"
                        value={p.product_price}
                        changeVlaue={(v) => handleChange(i, "product_price", v)}
                        type="number"
                      />
                    </div>
                  </div>
                  {i < item.Order_Products.length - 1 && (
                    <div className="h-1 bg-gray-500 w-6/12 rounded-lg mx-auto"></div>
                  )}
                </>
              ))}
            </div>
          </div>
          <div className="flex justify-center px-5">
            <ButtonLoader loader={loader.edit}>
              <button
                onClick={onHandleEdit}
                className="py-2 px-4 rounded-lg text-white bg-primary hover:bg-secondary flex space-x-1 space-x-reverse items-center"
              >
                <span className="material-icons text-lg">save</span>
                <span className="">تعديل</span>
              </button>
            </ButtonLoader>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderModal;
