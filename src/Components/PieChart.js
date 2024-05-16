import React from "react";
import {
  Chart as ChartJs,
  BarElement,
  CategoryScale,
  Tooltip,
  Legend,
  LinearScale,
  Filler,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import Displayname from "./Displayname";
import styles from "./PieChart.module.css";
import { useSelector } from "react-redux";
ChartJs.register(
  BarElement,
  CategoryScale,
  Tooltip,
  Legend,
  LinearScale,
  Filler
);

const options = {
  maintainAspectRatio: false,
  aspectRatio: 1,
};

const PieChart = () => {
  const chartData = useSelector((state) => state.excelData);
  const parseExcelData = useSelector((state) => state.extractedData);
  const filteredChartData = parseExcelData.filter(
    (item) =>
      item.name !== undefined &&
      item.present !== undefined &&
      !(item.name === "Name" && item.present === "P")
  );

  console.log(chartData);
  console.log(parseExcelData);
  console.log(filteredChartData);
  const data = {
    labels: filteredChartData.map((item) => item.name),
    datasets: [
      {
        label: "Present",
        data: filteredChartData.map((item) => item.present),
        backgroundColor: ["green"],
        barPercentage: 2.9,
        borderWidth: 1,
        barThickness: 26,
      },
      {
        label: "Absent",
        data: filteredChartData.map((item) => item.absent),
        backgroundColor: "rgba(255, 0, 0, 0.5)", // Red color with 50% transparency
        barPercentage: 0.9,
        borderWidth: 1,
        barThickness: 26,
      },
    ],
  };

  return (
    <>
        <div className={styles.bardesign}>
          <Bar data={data} height="400px" options={options} />
        </div>
    </>
  );
};

export default PieChart;
