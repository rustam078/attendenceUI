import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import styles from "./Header.module.css";
import DownloadFiles from "./DownloadFiles";

const Header = () => {
  return (
    <>
    <div>
    <header className={styles.header}>
        <nav className={styles.navbar}>
          <div>
            <span className={styles.logoo}>Attendence</span> Portal
          </div>
          <ul className={styles['nav-links']}>
            <li>
              <NavLink to="/dashboard"
                 style={({ isActive }) => ({
                  color: isActive ? 'cyan' : '',
                  fontWeight: isActive ? 'bold' : '',
                })}
              >
              Dashboard
              </NavLink>
            </li>
            <li>
            <NavLink to="/details"
               style={({ isActive }) => ({
                color: isActive ? 'cyan' : '',
                fontWeight: isActive ? 'bold' : '',
              })}
            >
              Details
              </NavLink>
            </li>
          </ul>
        </nav>
      </header>
    </div>
    <div style={{paddingTop:'85px'}}>
      <DownloadFiles/>
    </div>
      <div style={{paddingTop:'35px',position: "relative"}}>
      <Outlet />
      </div>
    </>
  );
};

export default Header;
