import React, { useContext, useEffect, useState } from "react";
import ImagePicker2 from "@/components/ImagePicker2";
import FormInput from "@/components/FormInput";
import { API, CATEGORIES_TYPES, EMPTY_PRODUCT } from "helper/CONST";
import FormSelect2 from "../FormSelect2";
import MainCardBody from "./MainCardBody";
import isMissingSomething from "helper/isMissingSomething";
import HelperContext from "@/contexts/HelperContext";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation } from "swiper";
import ImagePicker from "../ImagePicker";
import Axios from "axios";

const ProductsCard = ({
  item,
  handleDelete,
  handleEdit,
  handleAdd,
  loader,
}) => {
  SwiperCore.use([Navigation]);

  const [info, setInfo] = useState({ ...EMPTY_PRODUCT });

  const { categories } = useContext(HelperContext);

  const [imageLoader, setImageLoader] = useState(false);

  useEffect(() => {
    if (item) setInfo({ ...item });
  }, []);

  const handleChange = (id, value) => {
    setInfo({ ...info, [id]: value });
  };

  const handleImageChange = (id, value, valueObj) => {
    setInfo({ ...info, [id]: value, [`${id}_obj`]: valueObj });
  };

  const handleAddImage = async (image, imageObj) => {
    if (imageObj) {
      setImageLoader(true);
      const formData = new FormData();
      formData.append("image", imageObj);
      formData.append("product_id", item.id);
      try {
        const res = await Axios({
          baseURL: API,
          url: "/api/product/images",
          method: "POST",
          data: formData,
        });
        setInfo({
          ...info,
          Product_Images: [...res.data.data],
        });
      } catch (error) {
        console.log(error.response);
        alert("فشل الاضافه");
      }
      setImageLoader(false);
    }
  };
  const handleRemoveImage = async (image) => {
    setImageLoader(true);
    try {
      const res = await Axios({
        baseURL: API,
        url: "/api/product/images",
        method: "DELETE",
        params: { id: image.id },
      });

      setInfo({
        ...info,
        Product_Images: [...res.data.data],
      });
    } catch (error) {
      console.log(error.response);
      alert("فشل المسح");
    }
    setImageLoader(false);
  };

  const onHandleEdit = handleEdit
    ? () => {
        const formdata = new FormData();
        if (info.id) {
          formdata.append("id", info.id);
        }
        formdata.append("name", info.name);
        formdata.append("price", info.price);
        formdata.append("category_id", info.category_id);
        formdata.append("description", info.description);
        formdata.append("type", info.type);
        if (info.image_obj) {
          formdata.append("image", info.image_obj);
        }
        if (!isMissingSomething(info, ["parent_id"])) handleEdit(formdata);
      }
    : null;

  const onHandleAdd = handleAdd
    ? () => {
        const formdata = new FormData();
        formdata.append("name", info.name);
        formdata.append("price", info.price);
        formdata.append("description", info.description);
        formdata.append("type", info.type);
        formdata.append("category_id", info.category_id);
        if (info.image_obj) {
          formdata.append("image", info.image_obj);
        }
        if (!isMissingSomething(info, ["parent_id"])) handleAdd(formdata);
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
        <ImagePicker
          className="flex justify-center mb-5"
          data={info["image"]}
          id={"image"}
          setData={(v, vObj) => handleImageChange("image", v, vObj)}
        />
        {item?.id && (
          <div className="w-full">
            <Swiper navigation slidesPerView={1}>
              <SwiperSlide>
                <ImagePicker2
                  className="flex justify-center mb-5"
                  data={""}
                  handleAddImage={handleAddImage}
                  imageLoader={imageLoader}
                />
              </SwiperSlide>
              {info?.Product_Images?.map((image, index) => (
                <SwiperSlide key={index}>
                  <ImagePicker2
                    className="flex justify-center mb-5"
                    data={image}
                    handleRemoveImage={handleRemoveImage}
                    imageLoader={imageLoader}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        )}
        <FormInput
          required={true}
          name="الاسم"
          value={info["name"]}
          changeVlaue={(v) => handleChange("name", v)}
        />
        <FormInput
          required={true}
          type="number"
          name="السعر"
          value={info["price"]}
          changeVlaue={(v) => handleChange("price", v)}
        />
        <FormInput
          required={true}
          name="الوصف"
          value={info["description"]}
          changeVlaue={(v) => handleChange("description", v)}
          type="textarea"
          rows={3}
        />
        {/* <FormSelect2
          name="نوع الفئه"
          selectable={CATEGORIES_TYPES}
          value={info["type"]}
          changeVlaue={(v) => handleChooseCategory("type", v)}
        /> */}
        <FormSelect2
          name="نوع الفئة الفرعية"
          selectable={categories.subs}
          value={info["category_id"]}
          changeVlaue={(v) => handleChange("category_id", v)}
          valueAsId={true}
        />
      </div>
    </MainCardBody>
  );
};

export default ProductsCard;
