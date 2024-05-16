import React from "react";
import { Chart } from "react-google-charts";

export function BarChart({ detailData }) {
  const data = [
    ["Attendence", "attendence per month"],
    ["Present", +detailData[40]],
    ["Absent", +detailData[41]],
  ];

  const options = {
    title: detailData[4],
    is3D: true,
    colors: ["lightgreen", "#ff6666"], // Set the colors here
  };

  return (
    <Chart
      chartType="PieChart"
      data={data}
      options={options}
      height={"350px"}
      style={{boxShadow: '5px 5px 10px rgba(0, 0, 0, 0.2)'}}
    />
  );
}
