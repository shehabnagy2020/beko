import React, { useContext, useEffect, useState } from "react";
import NextCookies from "next-cookies";
import MainPageContainer from "@/components/MainPageContainer";
import DataTable from "react-data-table-component";
import Link from "next/link";
import Moment from "moment";
import HelperContext from "@/contexts/HelperContext";

import { API, EMPTY_CATEGORIES } from "helper/CONST";
import EmptyCard from "@/components/EmptyCard";
import Axios from "axios";
import ButtonLoader from "@/components/ButtonLoader";

const Orders = () => {
  const [dataItems, setDataItems] = useState([]);
  const { ordersItems } = useContext(HelperContext);
  const [loader, setLoader] = useState({
    edit: false,
    delete: false,
    page: false,
  });

  const handelLoader = (id, val) => {
    setLoader({ ...loader, [id]: val });
  };

  const getData = async () => {
    handelLoader("page", true);
    setDataItems([...ordersItems]);

    handelLoader("page", false);
  };
  useEffect(() => {
    getData();
  }, [ordersItems]);

  const handleDelete = async (id) => {
    handelLoader("page", true);
    try {
      const res = await Axios({
        baseURL: API,
        url: `/api/order?id=${id}`,
        method: "DELETE",
      });
      getData();
    } catch (error) {
      alert("فشل حذف ");
    }
    handelLoader("page", false);
  };

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

  const columns = [
    {
      name: "الاسم",
      selector: (row) => (
        <div className="gap-x-3 flex items-center">
          {row.new && (
            <div className="animate-pulse w-2 h-2 bg-green-400 rounded-full"></div>
          )}
          <span>{row.User.full_name}</span>
        </div>
      ),
      sortable: true,
    },
    {
      name: "المجموع الكلي",
      selector: (row) => row.total_price,
      sortable: true,
    },
    {
      name: "العنوان",
      selector: (row) => row.User.address,
      sortable: true,
    },
    {
      name: "تاريخ الارسال",
      selector: (row) => Moment(row.created_at).format("yyyy/MM/DD"),
      sortable: true,
    },
    // {
    //   name: "",
    //   selector: (row) => (
    //     <div className="gap-x-3 flex py-3">
    //       <Link href={`/orders/edit/${row.id}`}>
    //         <a className="bg-primary hover:bg-secondary p-2 rounded-lg text-white">
    //           <span className="material-icons text-lg">edit</span>
    //         </a>
    //       </Link>
    //     </div>
    //   ),
    //   sortable: true,
    // },
    {
      name: "",
      selector: (row) => (
        <div className="gap-x-3 flex ">
          <Link href={`/orders/edit/${row.id}`}>
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
    <MainPageContainer className="" title="الطلبات">
      {loader.page ? (
        <div className="flex justify-center items-center">
          <div className="material-icons text-6xl text-primary animate-spin">
            track_changes
          </div>
        </div>
      ) : (
        <>
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

export default Orders;

export const getServerSideProps = (ctx) => {
  const { user } = NextCookies(ctx);
  if (!user && ctx.res) {
    ctx.res.writeHead(301, { location: "/login" });
    ctx.res.end();
  }
  return { props: {} };
};
