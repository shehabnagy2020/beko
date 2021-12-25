import React, { useEffect, useRef, useState } from "react";
import NextCookies from "next-cookies";
import MainPageContainer from "@/components/MainPageContainer";
import { API, EMPTY_CATEGORIES } from "helper/CONST";
import EmptyCard from "@/components/EmptyCard";
import Axios from "axios";
import DataTable from "react-data-table-component";
import getTypeName from "helper/getTypeName";
import ButtonLoader from "@/components/ButtonLoader";
import Link from "next/link";

const Notifications = () => {
  const [dataItems, setDataItems] = useState([]);
  const [activeType, setActiveType] = useState("all");
  const [loader, setLoader] = useState({
    edit: false,
    delete: false,
    page: false,
  });
  const [originalData, setOriginalData] = useState([]);
  const [searchData, setSearchData] = useState("");
  const searchRef = useRef(null);
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchData) {
      let item = originalData.filter((i) =>
        i.name.toLowerCase().includes(searchData.toLowerCase())
      );
      setDataItems([...item]);
    } else {
      setDataItems([...originalData]);
      searchRef.current.focus();
    }
  };

  const handelLoader = (id, val) => {
    setLoader({ ...loader, [id]: val });
  };

  const getData = async (values = []) => {
    handelLoader("page", true);
    try {
      if (values.length <= 0) {
        const res = await Axios({
          baseURL: API,
          url: "/api/notifications/getAll",
          method: "GET",
        });
        values = res.data.data;
        console.log(values);
      }

      if (activeType === "all") {
        setOriginalData([...values]);
        setDataItems([...values]);
      } else {
        values = values.filter((i) => i.type === activeType);
        setOriginalData([...values]);
        setDataItems([...values]);
      }
      handelLoader("page", false);
    } catch (error) {}
  };

  useEffect(() => {
    getData();
  }, [activeType]);

  const handleChoose = (v) => {
    setActiveType(v);
  };

  const handleDelete = async (id) => {
    handelLoader("delete", id);
    try {
      const res = await Axios({
        baseURL: API,
        url: "/api/notifications/delete",
        method: "DELETE",
        params: { id },
      });
      await getData([...res.data.data]);
    } catch (error) {
      console.log(error.response);
      alert("فشل حذف ");
    }
    handelLoader("delete", null);
  };

  const columns = [
    { name: "العنوان", selector: (row) => row.title, sortable: true },
    { name: "رقم المنتج", selector: (row) => row.product_id, sortable: true },

    {
      name: "",
      selector: (row) => (
        <div className="gap-x-3 flex py-3">
          <ButtonLoader loader={loader.delete === row.id} color="red-500">
            <button
              className="bg-red-500 hover:bg-red-400 p-2 rounded-lg text-white"
              onClick={(_) => handleDelete(row.id)}
            >
              <span className="material-icons text-lg">delete</span>
            </button>
          </ButtonLoader>
        </div>
      ),
      sortable: true,
    },
  ];

  return (
    <MainPageContainer
      className=""
      title="الاشعارات"
      addLink={"/notifications/add"}
    >
      {loader.page ? (
        <div className="flex justify-center items-center">
          <div className="material-icons text-6xl text-primary animate-spin">
            track_changes
          </div>
        </div>
      ) : (
        <>
          <div className="w-full p-3 bg-white rounded-lg">
            {/* <select
              value={activeType}
              className="w-full"
              onChange={(e) => handleChoose(e.target.value)}
            >
              <option value="all">جميع الفئات</option>
              <option value="service">فئات الخدمات</option>
              <option value="product">تسوق اونلاين</option>
            </select> */}
            <form
              onSubmit={handleSearch}
              className="flex space-x-3 space-x-reverse py-3 justify-between"
            >
              <input
                value={searchData}
                type="search"
                ref={searchRef}
                onChange={(e) => setSearchData(e.target.value)}
                placeholder="بحث..."
                className="flex-grow"
              />
              <button className="material-icons" type="submit">
                search
              </button>
            </form>
          </div>
          {dataItems.length >= 1 ? (
            <div className="p-2 rounded-md bg-white">
              <DataTable
                columns={columns}
                data={dataItems}
                pagination
                paginationComponentOptions={{
                  rowsPerPageText: "النتائج في الصفحة",
                }}
              />
            </div>
          ) : (
            <EmptyCard />
          )}
        </>
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
