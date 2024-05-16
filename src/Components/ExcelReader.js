import React, { useState } from "react";
import { read, utils } from "xlsx";
import { getExtractedData, getExcelData } from "../reducers/counter";
import { useDispatch } from "react-redux";
import PieChart from "./PieChart";
import axios from "axios";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import IconButton from "@mui/material/IconButton";

function ExcelReader() {
  const [data, setData] = useState([]);
  const [uploadedFileName, setUploadedFileName] = useState(""); // State to store the uploaded file name
  const dispatch = useDispatch();

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    setUploadedFileName(file.name); // Set the uploaded file name

    const reader = new FileReader();

    reader.onload = (e) => {
      const data = e.target.result;

      // Use the XLSX library to read the file
      const workbook = read(data, { type: "array" });

      // Assuming the second sheet (index 1)
      const sheetName = workbook.SheetNames[1];
      const sheet = workbook.Sheets[sheetName];

      // Parse the sheet into an array of objects
      const parsedData = utils.sheet_to_json(sheet, { header: 1 });
      setData(parsedData);

      // Extract names and attendance and pass it to the callback function
      const extractedData = parsedData.slice(1).map((row) => ({
        name: row[4],
        present: row[40],
        absent: row[41],
      }));
      dispatch(getExtractedData(extractedData));
      dispatch(getExcelData(parsedData));

      handleUpload(file);
    };

    const handleUpload = (file) => {
      const formData = new FormData();
      formData.append("file", file);

      // Send the file to the server for storage
      axios.post("http://localhost:8080/api/upload", formData).then((response) => {
        console.log("File uploaded successfully");
      });
    };

    reader.readAsArrayBuffer(file);
  };

  return (
    <>
      <label
        htmlFor="file-input"
        style={{ position: "absolute", right: "17px", top: "-6px" }}
      >
        <input
          type="file"
          accept=".xls, .xlsx"
          onChange={handleFileUpload}
          id="file-input"
          style={{ display: "none" }}
        />
        <IconButton color="primary" component="span">
          <CloudUploadIcon />
        </IconButton>
        {uploadedFileName || "Upload Excel File"}
        {/* Display the file name or "Upload Excel File" */}
      </label>
      <PieChart />
    </>
  );
}

export default ExcelReader;
