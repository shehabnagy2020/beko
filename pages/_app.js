import Head from "next/head";
import { useContext, useEffect } from "react";
import NextCookies from "next-cookies";
import MainContext from "@/contexts/Index";
import NewOrdersModal from "@/components/Modals/NewOrdersModal";

function MyApp({ Component, pageProps, props }) {
  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1"
        />
        <title>Sovio Dashboard</title>
      </Head>
      <MainContext>
        <Component {...pageProps} />
        <NewOrdersModal />
      </MainContext>
    </>
  );
}

export default MyApp;

MyApp.getInitialProps = async (ctx) => {
  const { user } = NextCookies(ctx);
  let props = {};

  if (!user && ctx.res) {
    ctx.res.writeHead(301, { location: "/login" });
    ctx.res.end();
  }
  return { props };
};
