import React, { useContext } from "react";
import { Link } from "react-router-dom";
import style from "./DashboardItem.module.css";

import { DashboardContext } from '../../context/dashboardContext';

export const DashboardItem = ({ data }) => {
  const { updateMobileDashboard } = useContext(DashboardContext);

  const clickToCloseMobileMenuButton = () => {
    updateMobileDashboard(false)
  }

  return (
    <Link className={style.link} to={data.link} key={data.id} onClick={clickToCloseMobileMenuButton}>
      <div className={style.item}>
        {/* <div className={style.icon} dangerouslySetInnerHTML={{ __html: data.image }}>
        </div> */}
        <div className={style.title}>
          {data.name}
        </div>
      </div>
    </Link>
  );
};
