import React from "react";

const Home = () => {
  return <div className=""></div>;
};

export default Home;

export const getServerSideProps = (ctx) => {
  if (ctx.res) {
    ctx.res.writeHead(301, { location: "/categories" });
    ctx.res.end();
  }
  return { props: {} };
};
