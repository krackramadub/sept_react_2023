import React from "react";
import { Outlet } from "react-router-dom";

export const Layout = () => {
  return (
    <>
      <div>header</div>
      {/* Outlet - выводит все дочерние элементы роутингов */}
      <div>
        <Outlet />
      </div>
      <div>footer</div>
    </>
  );
};
