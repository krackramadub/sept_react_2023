import React from "react";
import { Link } from "react-router-dom";

export const AdminPage = () => {
  return (
    <div>
      AdminPage
      <div>
        <Link to={"/"} state={{ customLabel: "1234" }}>
          Home page
        </Link>
      </div>
    </div>
  );
};
