import React, { useState, useEffect } from "react";
import axios from "axios";
import { read, utils } from "xlsx";
import { getExtractedData, getExcelData } from "../reducers/counter";
import { useDispatch, useSelector } from "react-redux";

function DownloadFiles() {
  const [fileList, setFileList] = useState([]);
  const [selectedFileName, setSelectedFileName] = useState(""); // Add state to store the selected file name
  const [fileContent, setFileContent] = useState(null);
  const [data, setData] = useState([]);
  const dispatch = useDispatch();
  const chartData = useSelector((state) => state.excelData);

  useEffect(() => {
    // Fetch the list of files in the "uploads" folder
    axios.get("http://localhost:8080/api/list").then((response) => {
      setFileList(response.data);
    });
  }, []);

  const handleFileSelect = (fileName) => {
    if (!fileName) {
      return;
    }
    setSelectedFileName(fileName); // Set the selected file name
    // Fetch the file content
    axios
      .get(`http://localhost:8080/api/download/${fileName}`, {
        responseType: "blob",
      })
      .then((response) => {
        // Set the file content in the component's state
        setFileContent(response.data);
        // setDownloadFileName(fileName);

        const reader = new FileReader();
        reader.readAsArrayBuffer(response.data);

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
        };
      });
  };

  const handleFileDownload = () => {
    if (fileContent) {
      const url = window.URL.createObjectURL(new Blob([fileContent]));
      const a = document.createElement("a");
      a.href = url;
      a.download = selectedFileName; // Use the selected file name for download
      a.click();
    }
  };

  return (
    <div style={{ display: "flex", alignItems: "center", gap: "40px" }}>
      <ul style={{ marginLeft: "10px" }}>
        <li>
          <select
            value={selectedFileName}
            onChange={(e) => handleFileSelect(e.target.value)}
            style={{
              padding: "10px",
              fontSize: "16px",
              borderRadius: "5px",
              border: "1px solid #ccc",
              marginRight: "10px",
            }}
          >
            <option value="">Select a file</option>
            {fileList.map((fileName, index) => (
              <option key={index} value={fileName}>
                {fileName}
              </option>
            ))}
          </select>
          <button
            onClick={handleFileDownload}
            style={{
              padding: "10px",
              fontSize: "16px",
              backgroundColor: "#2980b9", // Button background color
              color: "#fff", // Button text color
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Download
          </button>
        </li>
      </ul>
      <h2>Attendance Report {chartData[2]} month</h2>
    </div>
  );
}

export default DownloadFiles;
