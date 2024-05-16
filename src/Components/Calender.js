import React, { useState } from "react";
import "./Calender.css";
import { useSelector,useDispatch } from "react-redux";
import { getDaysInMonthData } from "../reducers/counter";
import { useParams } from "react-router-dom";
import { BarChart } from "./BarChart";
function Calender() {
   const { name } = useParams();
   const dispatch=useDispatch();
   const parseExcelData = useSelector((state) => state.extractedData);
   const chartData = useSelector((state) => state.excelData);
   const filteredChartData = parseExcelData.filter(
     (item) =>
       item.name !== undefined &&
       item.present !== undefined &&
       !(item.name === "Name" && item.present === "P")
   );
 
 
   const filteredData = chartData.filter((row) => row.length === 47);
 
   if (!filteredData || filteredData.length === 0) {
     return <div>No data available</div>;
   }

   const detailData = filteredData.find((row) => row[4] === name);
     if (!detailData) {
       return <div>No details found for {filteredChartData.name}</div>;
     }
   
     // Assuming detailData is an array with 31 items for each day of the month
     // Modify the data structure according to your needs
     const daysInMonth = detailData.slice(5, 40);
     dispatch(getDaysInMonthData(daysInMonth));



  const stringData = String(chartData[2]);
  const splitDate = stringData.split("To");
  const stringdate = splitDate[0].replace(",", "");
  const  sDate=new Date(stringdate);

  const findMonthDays = (y, m) => {
    return new Date(y, m + 1, 0).getDate();
  };

  const findFirstDay = (y, m) => {
    return new Date(y, m, 1).getDay();
  };





  const showCalendar = () => {
  const currDate = new Date();
  const y = sDate.getFullYear();
  const m = sDate.getMonth();
  const mDays = findMonthDays(y, m);
  const fDay = findFirstDay(y, m);

  const allDays = [];

  // For empty cells
  for (let p = 0; p < fDay; p++) {
    allDays.push(<div key={`em-${p}`} className="box empty"></div>);
  }

  const filteredData = daysInMonth.filter((item) => item !== "empty");

  // Show actual days
  for (let d = 1; d <= mDays; d++) {
    const date = new Date(y, m, d);
    const isSelected = sDate && date.toDateString() === sDate.toDateString();
    const dayOfWeek = date.getDay(); // Get the day of the week (0 = Sunday, 1 = Monday, ...)
    const dataIndex = d - 1; // Index for filteredData
    const cellValue = filteredData[dataIndex];
    const backgroundColor =
      cellValue === 'P' ? 'lightgreen' :
      cellValue === 'A' ? '#ff6666' :
      cellValue === 'WO' ? '#ba98eb' : '';

    // Add additional condition to check if it's Sunday (0) or Saturday (6)
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
    
    const classNames = `box ${isSelected ? "selected" : ""} ${
      isWeekend ? "weekend" : ""
    } ${cellValue === '½P' && 'A' ? "halfP" : ""}`;

    allDays.push(
      <div
        key={`d-${d}`}
        className={classNames}
        // onClick={() => handleDateClick(date)}
        style={{ backgroundColor }}
      >
        {d}
        {cellValue}
      </div>
    );
  }

  return allDays;
};

  return (
    <div>
          <h2 style={{ textAlign: "center",marginBottom:"32px"}}>Details of {name}</h2>
          <div style={{display:"flex",justifyContent:'space-between',gap:'120px'}}>
      <div className="main">
        <div className="header">
          <h2>{chartData[2]}</h2>
        </div>
        <div className="body">
          <div className="box">su</div>
          <div className="box">Mo</div>
          <div className="box">Tu</div>
          <div className="box">We</div>
          <div className="box">Th</div>
          <div className="box">Fr</div>
          <div className="box">sa</div>
          {showCalendar()}
        </div>
        {sDate && (
          <div className="selected-date">
            <h3>Persent: {detailData[40]}</h3>
            <h3>Absent: {detailData[41]}</h3>
          </div>
        )}
      </div>

      <BarChart  detailData={detailData}/>
      </div>
    </div>
  );
}

export default Calender;
