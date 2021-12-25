import React, { useContext, useEffect, useState } from "react";
import NextCookies from "next-cookies";
import MainPageContainer from "@/components/MainPageContainer";
import SubCategoriesCard from "@/components/PagesCards/SubCategoriesCard";
import { API, EMPTY_CATEGORIES } from "helper/CONST";
import Axios from "axios";
import convertToFormdata from "helper/convertToFormdata";
import { useRouter } from "next/router";
import HelperContext from "@/contexts/HelperContext";

const ShopOnline = () => {
  const router = useRouter();
  const [loader, setLoader] = useState({
    add: false,
    delete: false,
    page: false,
  });

  const handelLoader = (id, val) => {
    setLoader({ ...loader, [id]: val });
  };

  const { getCategories } = useContext(HelperContext);

  const handleAdd = async (info) => {
    handelLoader("add", true);
    try {
      const res = await Axios({
        baseURL: API,
        url: "/api/categories/add",
        method: "POST",
        data: info,
      });
      await getCategories(res.data.data);
      router.push("/sub-categories");
    } catch (error) {
      console.log(error.response ?? error);
      alert("فشل الاضافه");
    }
    handelLoader("add", false);
  };

  return (
    <MainPageContainer className="" title="اضافة فئه فرعية">
      <SubCategoriesCard loader={loader} handleAdd={handleAdd} />
    </MainPageContainer>
  );
};

export default ShopOnline;

export const getServerSideProps = (ctx) => {
  const { user } = NextCookies(ctx);
  if (!user && ctx.res) {
    ctx.res.writeHead(301, { location: "/login" });
    ctx.res.end();
  }
  return { props: {} };
};
