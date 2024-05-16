import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import styles from "./Displayname.module.css";

const Displayname = ({ data }) => {
  const [searchQuery, setSearchQuery] = useState("");
  
  // Filter the data based on the search query
  const filteredData = data.filter((row) => row.name.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <div className={styles.container}>
      <div className={styles.searchContainer}>
        <input  className={styles.search}
          type="text"
          placeholder="Search by name"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <ul className={styles.row}>
        {filteredData.map((row, index) => (
          <li key={index}>
            <NavLink
              to={`/details/${row.name}`}
              style={({ isActive }) => ({
                color: isActive ? '#fff' : '#545e6f',
                background: isActive ? '#7600dc' : '#f0f0f0',
              })}
            >
              {row.name}
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Displayname;
