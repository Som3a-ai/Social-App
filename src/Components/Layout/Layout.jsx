import React from "react";

import { Outlet } from "react-router-dom";
import MyNavbar from "./../Navbar/Navbar";

export default function Layout() {
  return (
    <>
      <MyNavbar />

      <div className="min-h-screen  bg-[#f0f2f5]">
        <div className="mx-auto max-w-7xl px-3 py-3.5">
          <Outlet />
        </div>
      </div>


    </>
  );
}
