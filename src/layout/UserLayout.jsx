import React from "react";
import Header from "../components/Header/header";

const UserLayout = ({ children }) => {
  return (
    <div className="wrapper bg-faded-dark">
      <Header />
      {children}
    </div>
  );
};

export default UserLayout;
