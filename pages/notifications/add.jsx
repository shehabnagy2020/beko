import React, { useEffect, useState } from "react";
import NextCookies from "next-cookies";
import MainPageContainer from "@/components/MainPageContainer";
import { API } from "helper/CONST";
import Axios from "axios";
import NotificationCard from "@/components/PagesCards/NotificationCard";
import { useRouter } from "next/router";

const Notifications = () => {
  const [loader, setLoader] = useState({
    add: false,
    delete: false,
    page: false,
  });
  const router = useRouter();

  const handelLoader = (id, val) => {
    setLoader({ ...loader, [id]: val });
  };

  const handleAdd = async (info) => {
    handelLoader("add", true);
    try {
      const res = await Axios({
        baseURL: API,
        url: "/api/notifications/sendToAll",
        method: "POST",
        data: info,
      });
      alert("تم ارسال الاشعار");
      router.push("/notifications");
    } catch (error) {
      alert("فشل الاضافه");
    }
    handelLoader("add", false);
  };
  console.log(loader);
  return (
    <MainPageContainer className="" title="الاشعارات">
      {loader.page ? (
        <div className="flex justify-center items-center">
          <div className="material-icons text-6xl text-primary animate-spin">
            track_changes
          </div>
        </div>
      ) : (
        <NotificationCard handleAdd={handleAdd} loader={loader} />
      )}
    </MainPageContainer>
  );
};

export default Notifications;

export const getServerSideProps = (ctx) => {
  const { user } = NextCookies(ctx);
  if (!user && ctx.res) {
    ctx.res.writeHead(301, { location: "/login" });
    ctx.res.end();
  }
  return { props: {} };
};
