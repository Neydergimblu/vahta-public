import React, { useContext } from "react";
import style from "./UserInfo.module.css";
import { MobileMenuButton } from "../MobileMenuButton/MobileMenuButton";
import svgExit from './img/exit-outline-svgrepo-com.png'
import lodash from "lodash"


import { DashboardContext } from "../../context/dashboardContext";

export const UserInfo = ({ name, role, avatar }) => {
  const { currentUser, setcurrentUser, setAuth } = useContext(DashboardContext);

  const exitUser = () => {
    delete localStorage.USER_ID;
    setcurrentUser({})
    setAuth(false);
  }

  return (
    <div className={style.user}>
      <div className={style.info}>
        <p className={style.name}>
          {currentUser.surname && lodash.upperFirst(currentUser.surname) + " " + (currentUser.name && lodash.upperFirst(currentUser.name)) + " " + (currentUser.patronymic && lodash.upperFirst(currentUser.patronymic))}
        </p>
        <p className={style.position}>
          {lodash.upperFirst(currentUser.position)}
        </p>
      </div>
      <div className={style.avatar}>
        {avatar && <img src={avatar} alt={name && name}></img>}
        {!avatar && <div>{currentUser.name && currentUser.name[0].toUpperCase()}</div>}
      </div>
      <div className={style.settings} onClick={exitUser}>
        <img className={style.exit} src={svgExit} alt="" />
      </div>
      <MobileMenuButton />
    </div>
  );
};
