import { Outlet } from "react-router-dom";
import React from "react";
import { NavBar } from "../NavBar";
import Footer from "../Footer";

function LandingLayout() {
  return (
    <>
      <NavBar />
      <Outlet />
      <Footer />
    </>
  );
}

export default LandingLayout;
