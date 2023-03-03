import React from "react";
import style from "./Header.module.css";
import { Logo } from "../Logo/Logo";
import { UserInfo } from "../UserInfo/UserInfo";


export const Header = () => {
  return (
    <header className={style.header}>
      <Logo />
      <UserInfo />
    </header>
  );
};
