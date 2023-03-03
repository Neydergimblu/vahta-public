import React, { useEffect, useContext, useState } from "react";
import style from "./ChangeUserPage.module.css";
import { UserForm } from "../../components/UserForm/UserForm";
import { Title } from "../../components/Title/Title";
import { useParams } from "react-router-dom";
import api from "../../utils/Api";
import lodash from "lodash"



export const ChangeUserPage = () => {
	const [user, setuser] = useState({});
	const [loading, setloading] = useState(false);
	const params = useParams();

	const loadUserInformation = (id) => {
		if (loading === false) {
			api.getUser(id)
				.then((result) => {
					setuser(result[0]);
					setloading(true);
				})
		}
	}

	loadUserInformation(params.id);

	return (
		<>
			{loading === true ? (
				<div className={style.userChangePage}>
					<Title titleText={lodash.upperFirst(user.surname) + " " + lodash.upperFirst(user.name) + " " + lodash.upperFirst(user.patronymic)} backButton='true' />
					<UserForm
						userData={user}
					/>
				</div>
			) : false}
		</>
	)
}