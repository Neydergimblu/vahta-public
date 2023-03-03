import React, { useContext } from "react";
import style from "./CloseMobileMenuButton.module.css";
import menuIcon from "./img/cross.svg";
import { DashboardContext } from '../../context/dashboardContext';


export const CloseMobileMenuButton = () => {
  const {updateMobileDashboard} = useContext(DashboardContext);

  const clickToCloseMobileMenuButton = () => {
    updateMobileDashboard(false)
  }

  return (
    <div className={style.wrapper}>
      <button className={style.close} onClick={clickToCloseMobileMenuButton}>
      <img src={menuIcon} alt="mobile menu icon" />
    </button>
    </div>
  );
};
