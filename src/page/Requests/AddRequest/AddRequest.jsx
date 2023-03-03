import React, { useEffect, useContext, useState } from "react";
import style from "./AddRequest.module.css";
import cx from 'classnames'

import { Title } from "../../../components/Title/Title";
import { RequestForm } from "../../../components/RequestForm/RequestForm";



export const AddRequest = () => {
	return (
		<>
			<div className={style.userChangePage}>
				<Title titleText='Добавить новую заявку' backButton='true' />
				<RequestForm />
			</div>
		</>
	)
}