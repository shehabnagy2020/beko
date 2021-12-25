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

const Products = () => {
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
    // setDataItems([]);
    try {
      if (values.length <= 0) {
        const res = await Axios({
          baseURL: API,
          url: "/api/product/getAll",
          method: "GET",
        });
        values = res.data.data;
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
    setSearchData("");
  };

  const handleDelete = async (id) => {
    handelLoader("delete", id);
    try {
      const res = await Axios({
        baseURL: API,
        url: "/api/product/delete",
        method: "DELETE",
        params: { id },
      });
      await getData(res.data.data);
    } catch (error) {
      alert("فشل حذف ");
    }
    handelLoader("delete", null);
  };

  const columns = [
    {
      name: "",
      selector: (row) => (
        <img src={`${API}/${row.image}`} className="w-16 py-3" />
      ),
    },
    { name: "الاسم", selector: (row) => row.name, sortable: true },
    { name: "السعر", selector: (row) => row.price, sortable: true },
    // {
    //   name: "نوع الفئة",
    //   selector: (row) => getTypeName(row.type),
    //   sortable: true,
    // },
    {
      name: "",
      selector: (row) => (
        <div className="gap-x-3 flex ">
          <Link href={`/products/edit/${row.id}`}>
            <a className="bg-primary hover:bg-secondary p-2 rounded-lg text-white">
              <span className="material-icons text-lg">edit</span>
            </a>
          </Link>
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
    <MainPageContainer className="" title="المنتجات" addLink={"/products/add"}>
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

export default Products;

export const getServerSideProps = (ctx) => {
  const { user } = NextCookies(ctx);
  if (!user && ctx.res) {
    ctx.res.writeHead(301, { location: "/login" });
    ctx.res.end();
  }
  return { props: {} };
};
