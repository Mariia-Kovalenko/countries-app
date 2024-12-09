import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header.tsx";

const Layout = () => {
  return (
    <>
      <Header />
      <main className="mt-[80px]">
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
