import React, { useEffect, useState } from "react";
import NextCookies from "next-cookies";
import MainPageContainer from "@/components/MainPageContainer";
import OrdersCard from "@/components/PagesCards/OrdersCard";
import { SwitchTransition, CSSTransition } from "react-transition-group";
import { API, EMPTY_CATEGORIES } from "helper/CONST";
import Axios from "axios";
import { useRouter } from "next/router";

const EditOrders = () => {
  const [loader, setLoader] = useState({
    edit: false,
    delete: false,
    page: false,
  });
  const router = useRouter();
  const { itemID } = router.query;
  const [activeItem, setActiveItem] = useState({ id: "" });

  const handelLoader = (id, val) => {
    setLoader({ ...loader, [id]: val });
  };

  const getData = async () => {
    handelLoader("page", true);
    try {
      const res = await Axios({
        baseURL: API,
        url: "/api/orders/get",
        method: "GET",
      });
      let values = res.data.data;

      let [t] = values.filter((i) => i.id == itemID);
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
        url: "/api/orders/edit",
        method: "POST",
        data: info,
      });
      getData();
    } catch (error) {
      console.log(error.response);
      alert("فشل تعديل ");
    }
    handelLoader("edit", false);
  };

  return (
    <MainPageContainer className="" title="الطلبات">
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
              <OrdersCard
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

export default EditOrders;

export const getServerSideProps = (ctx) => {
  const { user } = NextCookies(ctx);
  if (!user && ctx.res) {
    ctx.res.writeHead(301, { location: "/login" });
    ctx.res.end();
  }
  return { props: {} };
};
