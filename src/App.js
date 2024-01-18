import React, { useState } from "react";
import "../public/style.css";
import SideBar from "./components/SideBar";

const App = () => {
  const [page, setPage] = useState("Home");
  return <SideBar />;
};

export default App;
