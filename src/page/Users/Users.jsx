import React, { useState, useEffect } from "react";
import style from "./Users.module.css";
import { Link } from "react-router-dom";
import { Button } from "../../components/Button/Button";
import { SearchForm } from "../../components/SearchForm/SearchForm";
import { UserCard } from "../../components/UserCard/UserCard";
import api from "../../utils/Api"


export const Users = () => {
  const [users, setUsers] = useState([]);
  const [searchUser, setSearchUser] = useState('');
  const [userEmpty, setuserEmpty] = useState(true);
  const [deleteUser, setdeleteUser] = useState(false);

  useEffect(() => {
    document.title = "Пользватели системы";
  }, [])

  useEffect(() => {
    api.getAllUser()
      .then((users) => {
        if (typeof users !== 'undefined' && users.length > 0) {
          setuserEmpty(false)
          setUsers(users);
        } else {
          setuserEmpty(true)
          console.log(users.errorMessage)
        }
      })
  }, [deleteUser]);

  const notice = (message) => {
    return <div className={style.notice}>{message}</div>
  }

  const userSearch = users.filter(user => {
    return (user.name.toLowerCase().includes(searchUser.toLowerCase()) || user.username.toLowerCase().includes(searchUser.toLowerCase()) || user.role.roleName.toLowerCase().includes(searchUser.toLowerCase()) || user.surname.toLowerCase().includes(searchUser.toLowerCase()) || user.patronymic.toLowerCase().includes(searchUser.toLowerCase())|| user.position.toLowerCase().includes(searchUser.toLowerCase()))
  })

  return (
    <div className={style.user}>
      <h1 className={style.title}>Пользователи системы</h1>
      <div className={style.function}>
        <Link className={style.link} to={"/users/add"}>
          <Button view="add" name="Создать" />
        </Link>
      </div>
      <SearchForm setSearchRequest={setSearchUser} />
      {userEmpty === true && notice('Пользователи не найдены')}
      <div className={style.usersCard}>
        {
          userSearch.map((user) => {
            return (
              <UserCard
                key={user.id}
                user={user}
                deleteUserCard={setdeleteUser}
                deleteUserStatus={deleteUser} />
            )
          })
        }
      </div>

    </div>
  );
};
