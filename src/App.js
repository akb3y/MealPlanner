import React, { useState, useEffect } from "react";
import "../public/style.css";
import SideBar from "./components/SideBar";

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
  return <SideBar setPage={setPage} />;
};

export default App;
