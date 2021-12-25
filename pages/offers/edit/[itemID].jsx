import React, { useEffect, useRef, useState } from "react";
import NextCookies from "next-cookies";
import MainPageContainer from "@/components/MainPageContainer";
import Paganition from "@/components/Paganition";
import OffersCard from "@/components/PagesCards/OffersCard";
import { SwitchTransition, CSSTransition } from "react-transition-group";
import { API, EMPTY_CATEGORIES } from "helper/CONST";
import Axios from "axios";
import { useRouter } from "next/router";

const EditOffers = () => {
  const [loader, setLoader] = useState({
    edit: false,
    delete: false,
    page: false,
  });
  const [activeItem, setActiveItem] = useState({ id: "" });
  const router = useRouter();
  const { itemID } = router.query;
  const handelLoader = (id, val) => {
    setLoader({ ...loader, [id]: val });
  };

  const getData = async () => {
    handelLoader("page", true);
    try {
      const res = await Axios({
        baseURL: API,
        url: "/api/offer/getAll",
        method: "GET",
      });
      let values = res.data.data;
      let [t] = values.filter((i) => i.type == itemID);
      if (t) setActiveItem({ ...t });

      handelLoader("page", false);
    } catch (error) {}
  };

  useEffect(() => {
    getData();
  }, [itemID]);

  const handleEdit = async (info) => {
    handelLoader("edit", true);
    try {
      const res = await Axios({
        baseURL: API,
        url: "/api/offer/edit",
        method: "POST",
        data: info,
      });
      await getData([...res.data.data]);
    } catch (error) {
      console.log(error.response);
      alert("فشل تعديل ");
    }
    handelLoader("edit", false);
  };
  return (
    <MainPageContainer className="" title="العروض" addLink={"/offers/add"}>
      {loader.page ? (
        <div className="flex justify-center items-center">
          <div className="material-icons text-6xl text-primary animate-spin">
            track_changes
          </div>
        </div>
      ) : (
        <SwitchTransition>
          <CSSTransition
            key={activeItem.id}
            classNames="fade"
            appear={true}
            timeout={300}
            unmountOnExit={true}
            exit={true}
          >
            <>
              <OffersCard
                item={activeItem}
                handleEdit={handleEdit}
                loader={loader}
              />
            </>
          </CSSTransition>
        </SwitchTransition>
      )}
    </MainPageContainer>
  );
};

export default EditOffers;

export const getServerSideProps = (ctx) => {
  const { user } = NextCookies(ctx);
  if (!user && ctx.res) {
    ctx.res.writeHead(301, { location: "/login" });
    ctx.res.end();
  }
  return { props: {} };
};
