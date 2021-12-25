import React, { useEffect, useRef, useState } from "react";
import NextCookies from "next-cookies";
import MainPageContainer from "@/components/MainPageContainer";
import { API, EMPTY_CATEGORIES } from "helper/CONST";
import EmptyCard from "@/components/EmptyCard";
import Axios from "axios";
import DataTable from "react-data-table-component";
import ButtonLoader from "@/components/ButtonLoader";
import Link from "next/link";

const ShopOnline = () => {
  const [dataItems, setDataItems] = useState([]);
  const [loader, setLoader] = useState({
    edit: false,
    delete: false,
    page: false,
  });
  const [activeItem, setActiveItem] = useState({ id: "" });
  const [originalData, setOriginalData] = useState([]);
  const [searchData, setSearchData] = useState("");
  const searchRef = useRef(null);
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchData) {
      let item = originalData.filter((i) =>
        i.full_name.toLowerCase().includes(searchData.toLowerCase())
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
    setDataItems([]);
    try {
      if (values.length <= 0) {
        const res = await Axios({
          baseURL: API,
          url: "/api/users",
          method: "GET",
        });
        values = res.data.data;
      }
      setOriginalData([...values]);
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
        url: "/api/user/delete",
        method: "DELETE",
        params: { id },
      });
      getData();
    } catch (error) {
      alert("فشل حذف الفئه");
    }
    handelLoader("delete", false);
  };

  const handleEdit = async (info) => {
    handelLoader("edit", true);
    try {
      const res = await Axios({
        baseURL: API,
        url: "/api/user/edit",
        method: "POST",
        data: info,
      });

      getData(res.data.data);
    } catch (error) {
      alert("فشل التعديل");
    }
    handelLoader("edit", false);
  };
  console.log(dataItems);
  const columns = [
    { name: "الاسم", selector: (row) => row.full_name, sortable: true },
    { name: "رقم الهاتف", selector: (row) => row.phone, sortable: true },
    { name: "العنوان", selector: (row) => row.address, sortable: true },

    {
      name: "",
      selector: (row) => (
        <div className="gap-x-3 flex py-3">
          <Link href={`/users/edit/${row.id}`}>
            <a className="bg-primary hover:bg-secondary p-2 rounded-lg text-white">
              <span className="material-icons text-lg">edit</span>
            </a>
          </Link>
        </div>
      ),
      sortable: true,
    },
  ];

  return (
    <MainPageContainer className="" title="المستخدمين">
      {loader.page ? (
        <div className="flex justify-center items-center">
          <div className="material-icons text-6xl text-primary animate-spin">
            track_changes
          </div>
        </div>
      ) : (
        <>
          <div className="w-full p-3 bg-white rounded-lg">
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

export default ShopOnline;

export const getServerSideProps = (ctx) => {
  const { user } = NextCookies(ctx);
  if (!user && ctx.res) {
    ctx.res.writeHead(301, { location: "/login" });
    ctx.res.end();
  }
  return { props: {} };
};
