import { API } from "helper/CONST";
import React, { useState, useEffect } from "react";
import Axios from "axios";
import Cookies from "js-cookie";

// create new react context and export it
const HelperContext = React.createContext();
export default HelperContext;

export const HelperContextProvider = ({ children }) => {
  // create new states
  const [categories, setCategories] = useState({
    product: [],
    service: [],
    all: [],
  });
  const [mainLoader, setMainLoader] = useState(false);
  const [ordersItems, setOrdersItems] = useState([]);
  const [newOrdersIndi, setNewOrdersIndi] = useState(false);
  const [userInfo, setUserInfo] = useState({});

  const getCategories = async (values = []) => {
    try {
      values = await Axios({
        baseURL: API,
        url: "/api/categories/getAll",
        method: "GET",
        params: { nested: "1" },
      });
      console.log(values);
      let all = [],
        product = [],
        service = [],
        names = [],
        subs = [];
      let cat = values.data.data.map((c) => {
        if (c.type === "product" && c.parent_id) product.push(c);
        else if (c.type === "service" && c.parent_id) service.push(c);
        if (c.sub_categories?.length >= 1) subs.push(...c.sub_categories);
        all.push(c);
        names[c.id] = c.name;
      });
      setCategories({ all, product, service, subs, names });

      return { all, product, service, subs, names };
    } catch (error) {
      console.log(error);
    }
  };

  const getOrders = async () => {
    try {
      const res = await Axios({
        baseURL: API,
        url: "/api/orders/get",
        method: "GET",
      });
      let values = res.data.data;
      let newValues = [];
      let oldVals = localStorage.getItem("ordersIDs")
        ? JSON.parse(localStorage.getItem("ordersIDs"))
        : [];
      values.map((order) => {
        var hasNullableProducts = false;
        order.Order_Products.map((product) => {
          if (product.Product == null) hasNullableProducts = true;
        });
        if (hasNullableProducts == false && order.User != null) {
          if (!oldVals.includes(order.id)) {
            order.new = true;
            oldVals.push(order.id);
          }
          newValues.push(order);
        }
      });
      if (newValues[0].new) setNewOrdersIndi(true);
      setOrdersItems([...newValues]);
      localStorage.setItem("ordersIDs", JSON.stringify(oldVals));
    } catch (error) {}
  };

  const initailize = async () => {
    setMainLoader(true);
    try {
      await getCategories();
      await getOrders();
      setMainLoader(false);
    } catch (error) {
      console.log(error.response);
    }
  };
  useEffect(() => {
    if (userInfo.username) {
      initailize();
    } else {
      let user = Cookies.get("user");
      if (user) setUserInfo(JSON.parse(user));
    }
  }, [userInfo]);

  return (
    // return provider of the context with value object to be used wih all children components
    <HelperContext.Provider
      value={{
        categories,
        setCategories,
        getCategories,
        ordersItems,
        setOrdersItems,
        newOrdersIndi,
        setNewOrdersIndi,
        mainLoader,
        userInfo,
        setUserInfo,
      }}
    >
      {children}
    </HelperContext.Provider>
  );
};
