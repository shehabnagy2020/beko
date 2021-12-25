import React, { useContext, useEffect, useRef, useState } from "react";
import NextCookies from "next-cookies";
import MainPageContainer from "@/components/MainPageContainer";
import CategoriesCard from "@/components/PagesCards/CategoriesCard";
import { SwitchTransition, CSSTransition } from "react-transition-group";
import { API, EMPTY_CATEGORIES } from "helper/CONST";
import Axios from "axios";
import HelperContext from "@/contexts/HelperContext";
import { useRouter } from "next/router";

const EditCategories = () => {
  const { categories, setCategories, getCategories } =
    useContext(HelperContext);
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
    let cats = await getCategories();
    let [item] = cats.all.filter((i) => i.id == itemID);
    console.log(itemID);
    if (item) setActiveItem({ ...item });
    handelLoader("page", false);
  };

  useEffect(() => {
    getData();
  }, [itemID]);

  const handleEdit = async (info) => {
    handelLoader("edit", true);
    try {
      const res = await Axios({
        baseURL: API,
        url: "/api/categories/edit",
        method: "POST",
        data: info,
      });
      await getCategories();
    } catch (error) {
      console.log(error.response ?? error);
      alert("فشل تعديل الفئه");
    }
    handelLoader("edit", false);
  };

  return (
    <MainPageContainer
      className=""
      title="الفئات الاساسية"
      addLink={"/categories/add"}
    >
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
              <CategoriesCard
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

export default EditCategories;

export const getServerSideProps = (ctx) => {
  const { user } = NextCookies(ctx);
  if (!user && ctx.res) {
    ctx.res.writeHead(301, { location: "/login" });
    ctx.res.end();
  }
  return { props: {} };
};
