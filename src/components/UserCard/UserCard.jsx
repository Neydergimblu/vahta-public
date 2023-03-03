import React, { useState } from "react";
import { Link } from "react-router-dom";
import style from "./UserCard.module.css";
import edit from "./img/edit.svg"
import trash from "./img/trash.svg"
import lodash from "lodash"
import api from "../../utils/Api";

export const UserCard = ({user, deleteUserCard, deleteUserStatus}) => {

  // if (typeof user !== 'undefined') {
  //   console.log(user)
  // }

  const deleteUser = (id) => {
    api.deleteUser(id)
      .then((deleteID) => {
        // console.log(deleteID);
        deleteUserCard(!deleteUserStatus);
      })
  }

  return (
    <div className={style.card}>
      <h4 className={style.title}>{lodash.upperFirst(user.surname) + ' ' + lodash.upperFirst(user.name) + ' ' + lodash.upperFirst(user.patronymic)}</h4>
      <div className={style.subTitle}>{lodash.upperFirst(user.position)}</div>
      <div className={style.endLine}>
        <div className={style.endLineContent}>
          <div className={style.endLineItem}>
            <div>Роль</div>
            <div className={style.roleName}>{lodash.upperFirst(user.role.roleName)}</div>
          </div>
          <div className={style.endLineItem}>
            <Link className={style.link} to={"/users/" + user.userID}>
              <div className={style.squareButton}>
                <img src={edit} alt="Изменить" />
              </div>
            </Link>
            <div className={style.squareButton} onClick={() => deleteUser(user.id)}>
              <img src={trash} alt="Удалить" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
