import React, { useEffect, useContext, useState } from "react";
import style from "./Auth.module.css";
import cx from 'classnames'
import { Input } from "../../components/Input/Input";
import Button from '@mui/material/Button';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useForm } from "react-hook-form";
import api from "../../utils/Api";
import logo from "./img/logo.svg"
import { useNavigate } from 'react-router-dom';


import { DashboardContext } from "../../context/dashboardContext";

export const Auth = () => {
  const [failAuth, setfailAuth] = useState(false);
  const [fetchFail, setfetchFail] = useState(false);
  const { setAuth } = useContext(DashboardContext);
  const { register, formState: { errors }, handleSubmit, reset } = useForm({
    mode: "onChange"
  });

  const navigate = useNavigate();

  const cssWarning = cx(
    style.warning,
    fetchFail === true && style.viewWarning
  )

  const noDatabaseConnectionNotification = cx(
    style.warning,
    failAuth === true && style.viewWarning
  )

  useEffect(() => {
    document.title = "Авторизация";
  }, [])

  const authQuery = (data) => {
    //проверяем данные формы



    api.authorization(data)
      .then((result) => {
        if (typeof result !== 'undefined' && result.length > 0) {
          localStorage.USER_ID = result[0].userID
          setfetchFail(false);
          setfailAuth(false);
          setAuth(true);
          reset();

        } else {
          // console.log(result.message);
          setfailAuth(true);
        }
      })
      .catch(() => {
        setfetchFail(true);
      });


  }

  const theme = createTheme({
    palette: {
      primary: {
        main: '#8ac926',
      },
    },
  });

  return (
    <div className={style.formWrapper}>
      <div className={style.logo}>
        <img className={style.logoImage} src={logo} alt="Логотипчик" />
      </div>
      <h2 className={style.serviceNameTitle}>Авторизация</h2>
      <form className={style.form} onSubmit={handleSubmit(authQuery)}>
        <Input
          label="Логин"
          typeInput="text"
          fail={failAuth}
          anatation={errors?.username?.message}
          register={register('username', {
            required: "Введите логин"
          })} />
        <Input
          label="Пароль"
          fail={failAuth}
          typeInput="password"
          anatation={errors?.password?.message}
          register={register('password', {
            required: "Введите пароль"
          })} />
        <div className={cssWarning}>Логин или пароль были введены неправильно. Если вы забыли ваши данные для входа обратитесь к администратору системы для восстановления</div>
        <div className={noDatabaseConnectionNotification}>Ошибка подключения к базе данных. Обратитесь к системному администратору.</div>
        <div className={style.button}>

          <ThemeProvider theme={theme}>
            <Button
              cx={{
                color: 'coral'
              }}
              type="submit"
              variant="outlined"
              size="large"
              onClick={() => navigate('/')}
            >Вход</Button>
          </ThemeProvider>

        </div>
      </form>
    </div>
  );
};
