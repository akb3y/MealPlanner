import React, { useState, useEffect } from "react";
import "../public/style.css";
import SideBar from "./components/SideBar";
import Recipes from "./components/Recipes";

const App = () => {
  const [page, setPage] = useState("Home");
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3100/getAll");
        const result = await response.json();

        // Update the state with the fetched data
        setData(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    // Call the fetchData function
    fetchData();
  }, []);
  return (
    <div className="app">
      <div className="sidebar">
        <SideBar setPage={setPage} />
      </div>
      <div className="main">
        <Recipes data={data} />
      </div>
    </div>
  );
};

export default App;
