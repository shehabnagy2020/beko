import React, { useEffect, useState } from "react";
import NextCookies from "next-cookies";
import MainPageContainer from "@/components/MainPageContainer";
import Paganition from "@/components/Paganition";
import GalleryCard from "@/components/PagesCards/GalleryCard";
import { SwitchTransition, CSSTransition } from "react-transition-group";
import { API, EMPTY_CATEGORIES } from "helper/CONST";
import EmptyCard from "@/components/EmptyCard";
import Axios from "axios";
import convertToFormdata from "helper/convertToFormdata";

const Gallery = () => {
  const [dataItems, setDataItems] = useState([]);
  const [loader, setLoader] = useState({
    edit: false,
    delete: false,
    page: false,
  });
  const [activeItem, setActiveItem] = useState({ id: "" });

  const handelLoader = (id, val) => {
    setLoader({ ...loader, [id]: val });
  };

  const getData = async (values = []) => {
    handelLoader("page", true);
    setDataItems([]);
    try {
      if (values.length <= 0) {
        const res = await Axios({
          baseURL: API,
          url: "/api/swiper/getAll",
          method: "GET",
        });
        values = res.data.data;
      }
      setDataItems([...values]);
      handelLoader("page", false);
    } catch (error) {}
  };

  useEffect(() => {
    getData();
  }, []);

  const handleDelete = async (id) => {
    handelLoader("delete", true);
    try {
      const res = await Axios({
        baseURL: API,
        url: "/api/swiper/delete",
        method: "DELETE",
        params: { id },
      });
      getData(res.data.data);
    } catch (error) {
      alert("فشل حذف ");
    }
    handelLoader("delete", false);
  };
  const handleEdit = async (info) => {
    handelLoader("edit", true);
    try {
      const res = await Axios({
        baseURL: API,
        url: "/api/swiper/edit",
        method: "POST",
        data: info,
      });
      getData(res.data.data);
    } catch (error) {
      alert("فشل تعديل ");
    }
    handelLoader("edit", false);
  };
  return (
    <MainPageContainer className="" title="المعرض" addLink={"/gallery/add"}>
      {loader.page ? (
        <div className="flex justify-center items-center">
          <div className="material-icons text-6xl text-primary animate-spin">
            track_changes
          </div>
        </div>
      ) : (
        <>
          {dataItems.length >= 1 ? (
            <>
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
                    <GalleryCard
                      item={activeItem}
                      handleDelete={handleDelete}
                      handleEdit={handleEdit}
                      loader={loader}
                    />
                  </>
                </CSSTransition>
              </SwitchTransition>
              <Paganition
                activeItem={activeItem}
                setActiveItem={setActiveItem}
                dataItems={dataItems}
              />
            </>
          ) : (
            <EmptyCard />
          )}
        </>
      )}
    </MainPageContainer>
  );
};

export default Gallery;

export const getServerSideProps = (ctx) => {
  const { user } = NextCookies(ctx);
  if (!user && ctx.res) {
    ctx.res.writeHead(301, { location: "/login" });
    ctx.res.end();
  }
  return { props: {} };
};
