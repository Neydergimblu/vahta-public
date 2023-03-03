import React, { useContext } from "react";
import style from "./MobileMenuButton.module.css";
import menuIcon from "./img/menu.svg";
import { DashboardContext } from '../../context/dashboardContext';


export const MobileMenuButton = () => {
  const {updateMobileDashboard} = useContext(DashboardContext);

  const clickToOpenMobileMenuButton = () => {
    updateMobileDashboard(true)
  }

  return (
    <button className={style.menu} onClick={clickToOpenMobileMenuButton}>
      <img src={menuIcon} alt="mobile menu icon" />
    </button>
  );
};
