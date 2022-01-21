import React, { useContext, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import FormInput from "@/components/FormInput";
import JsCookies from "js-cookie";
import NextCookies from "next-cookies";
import HelperContext from "@/contexts/HelperContext";

const login = () => {
  const [info, setInfo] = useState({
    username: "",
    password: "",
  });

  const router = useRouter();
  const { setUserInfo } = useContext(HelperContext);

  const handleChange = (id, value) => {
    setInfo({ ...info, [id]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (info.username === "SOVIO.NET" && info.password === "FADY.jan1988") {
      JsCookies.set("user", { ...info, isLogged: true });
      setUserInfo({ ...info });
      router.push("/categories");
    } else {
      alert("اسم المستخدم او كلمة المرور خطأ");
    }
  };

  return (
    <div className="w-screen h-screen flex justify-center items-center bg-accent">
      <form
        className="flex flex-col space-y-5 shadow-lg rounded-lg p-8 w-11/12 md:w-9/12 lg:w-8/12 xl:w-5/12 bg-white"
        onSubmit={handleSubmit}
      >
        <div className="flex items-center justify-center space-x-3 py-5">
          <Image src={"/images/logo-mini.png"} width={250} height={70} />
        </div>
        <div className="flex flex-col space-y-2 w-full">
          <FormInput
            required={true}
            id="username"
            name="اسم المستخدم"
            value={info["username"]}
            changeVlaue={(v) => handleChange("username", v)}
          />
        </div>
        <div className="flex flex-col space-y-2  w-full">
          <FormInput
            required={true}
            id="password"
            name="كلمة المرور"
            value={info["password"]}
            changeVlaue={(v) => handleChange("password", v)}
            type="password"
            eyeIcon={true}
          />
        </div>
        <button
          type="submit"
          className="bg-primary hover:bg-secondary p-3 rounded-lg text-white capitalize font-bold text-lg"
        >
          دخول
        </button>
      </form>
    </div>
  );
};

export default login;

export const getServerSideProps = (ctx) => {
  const { user } = NextCookies(ctx);
  if (user && ctx.res) {
    console.log(user);
    ctx.res.writeHead(301, { location: "/" });
    ctx.res.end();
  }
  return { props: {} };
};
