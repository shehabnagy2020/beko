import React, { useEffect, useState } from "react";
import NextCookies from "next-cookies";
import MainPageContainer from "@/components/MainPageContainer";
import Paganition from "@/components/Paganition";
import OffersCard from "@/components/PagesCards/OffersCard";
import { SwitchTransition, CSSTransition } from "react-transition-group";
import { API, EMPTY_CATEGORIES } from "helper/CONST";
import EmptyCard from "@/components/EmptyCard";
import Axios from "axios";
import convertToFormdata from "helper/convertToFormdata";
import { useRouter } from "next/router";

const OfferAdd = () => {
  const router = useRouter();
  const [loader, setLoader] = useState({
    add: false,
    delete: false,
    page: false,
  });

  const handelLoader = (id, val) => {
    setLoader({ ...loader, [id]: val });
  };

  const handleAdd = async (info) => {
    handelLoader("add", true);
    try {
      const res = await Axios({
        baseURL: API,
        url: "/api/offer/add",
        method: "POST",
        data: info,
      });
      router.push("/offers");
    } catch (error) {
      alert("فشل الاضافه");
    }
    handelLoader("add", false);
  };

  return (
    <MainPageContainer className="" title="اضافة عرض">
      <OffersCard loader={loader} handleAdd={handleAdd} />
    </MainPageContainer>
  );
};

export default OfferAdd;

export const getServerSideProps = (ctx) => {
  const { user } = NextCookies(ctx);
  if (!user && ctx.res) {
    ctx.res.writeHead(301, { location: "/login" });
    ctx.res.end();
  }
  return { props: {} };
};
