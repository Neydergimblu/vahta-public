import React, { useEffect, useContext, useState } from "react";
import style from "./AddUserPage.module.css";
import cx from 'classnames'

import { UserForm } from "../../components/UserForm/UserForm";
import { Title } from "../../components/Title/Title";



export const AddUserPage = () => {
	return (
		<>
			<div className={style.userChangePage}>
				<Title titleText='Добавить пользователя' backButton='true'/>
				<UserForm
					options={[
						{ value: "admin", label: "Администратор" },
						{ value: "approving", label: "Ответственный за безопасность" }
					]}
				/>
			</div>
		</>
	)
}