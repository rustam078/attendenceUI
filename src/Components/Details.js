import React from "react";
import { Outlet ,useLocation} from "react-router-dom";
import { useSelector } from "react-redux";
import './details.css';

import Displayname from "./Displayname";
import styles from "./PieChart.module.css";

const Details = () => {
   const location = useLocation();

   const currentURL = location.pathname;
  const data = useSelector((state) => state.excelData);
  const parseExcelData = useSelector((state) => state.extractedData);
  const filteredChartData = parseExcelData.filter(
    (item) =>
      item.name !== undefined &&
      item.present !== undefined &&
      !(item.name === "Name" && item.present === "P")
  );


  const filteredData = data.filter((row) => row.length === 47);

  if (!filteredData || filteredData.length === 0) {
    return <div>No data available</div>;
  }


  
  return (
    <div className={styles.container}>
       <Displayname data={filteredChartData}  parseExcelData={parseExcelData}/>
     {currentURL === '/details' ? (
        <h2 style={{margin:'auto'}}>Search Details of Each User</h2>
      ) : (
        <Outlet />
      )}
    </div>
  );
};

export default Details;
