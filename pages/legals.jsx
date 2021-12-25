import React, { useEffect, useState } from "react";
import NextCookies from "next-cookies";
import MainPageContainer from "@/components/MainPageContainer";
import FormInput from "@/components/FormInput";
import Card from "@/components/Card";
import ButtonLoader from "@/components/ButtonLoader";
import Axios from "axios";
import { API } from "helper/CONST";

const PrivacyPolicy = () => {
  const [info, setInfo] = useState({
    privacy: "",
    about_us: "",
    terms: "",
  });

  const [loader, setLoader] = useState({
    edit: false,
    page: false,
  });
  const handelLoader = (id, val) => {
    setLoader({ ...loader, [id]: val });
  };
  const handelChange = (id, val) => {
    setInfo({ ...info, [id]: val });
  };
  const getData = async () => {
    handelLoader("page", true);
    try {
      const res1 = await Axios({
        baseURL: API,
        url: "/api/legals/about_us",
        method: "GET",
      });
      const res2 = await Axios({
        baseURL: API,
        url: "/api/legals/privacy",
        method: "GET",
      });
      const res3 = await Axios({
        baseURL: API,
        url: "/api/legals/terms",
        method: "GET",
      });
      setInfo({
        about_us: res1.data.data,
        privacy: res2.data.data,
        terms: res3.data.data,
      });
      handelLoader("page", false);
    } catch (error) {
      console.log(error);
      alert("فشل");
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const handleEdit = async () => {
    handelLoader("edit", true);
    try {
      const res = await Axios({
        baseURL: API,
        url: "/api/legals/update",
        method: "POST",
        data: { ...info },
      });
    } catch (error) {
      console.log(error.response);
      alert("فشل التعديل");
    }
    handelLoader("edit", false);
  };
  return (
    <MainPageContainer className="" title="البيانات القانونيه">
      {loader.page ? (
        <div className="flex justify-center items-center mt-20">
          <div className="material-icons text-6xl text-primary animate-spin">
            track_changes
          </div>
        </div>
      ) : (
        <Card className="my-20 space-y-5">
          <div className="flex flex-col space-y-8">
            <FormInput
              required={true}
              name="معلومات عنا"
              type="textarea"
              value={info.about_us}
              changeVlaue={(v) => handelChange("about_us", v)}
              rows={10}
            />
            <FormInput
              required={true}
              name="الخصوصيه والسياسه"
              type="textarea"
              value={info.privacy}
              changeVlaue={(v) => handelChange("privacy", v)}
              rows={10}
            />
            <FormInput
              required={true}
              name="سياسة الاستخدام"
              type="textarea"
              value={info.terms}
              changeVlaue={(v) => handelChange("terms", v)}
              rows={10}
            />
          </div>
          <div className="flex justify-center space-x-3 space-x-reverse items-center ">
            <ButtonLoader loader={loader.edit}>
              <button
                className="py-2 px-4 rounded-lg text-white bg-primary hover:bg-secondary flex space-x-1 space-x-reverse items-center"
                onClick={handleEdit}
              >
                <span className="material-icons text-base">save</span>
                <span className="">تعديل</span>
              </button>
            </ButtonLoader>
          </div>
        </Card>
      )}
    </MainPageContainer>
  );
};

export default PrivacyPolicy;

export const getServerSideProps = (ctx) => {
  const { user } = NextCookies(ctx);
  if (!user && ctx.res) {
    ctx.res.writeHead(301, { location: "/login" });
    ctx.res.end();
  }
  return { props: {} };
};
