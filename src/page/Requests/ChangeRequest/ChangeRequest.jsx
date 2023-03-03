import React, { useEffect, useContext, useState } from "react";
import style from "./ChangeRequest.module.css";
import cx from 'classnames'
import { useParams } from "react-router-dom";
import requestApi from "../../../utils/RequestApi";

import { Title } from "../../../components/Title/Title";
import { RequestForm } from "../../../components/RequestForm/RequestForm";


export const ChangeRequest = () => {
	const params = useParams();
	const [request, setRequest] = useState({});
	const [loading, setloading] = useState(false);

	const loadRequestInformation = (id) => {
		if (loading === false) {
			requestApi.getRequestById(id)
				.then((result) => {
					setRequest(result[0]);
					setloading(true);
				})
		}
	}

	loadRequestInformation(params.id);

	return (
		<>
			{loading === true &&
				<div className={style.userChangePage}>
					<Title titleText={`Заявка № ${request.reqID}`} backButton='true' />
					<RequestForm request={request} />
				</div>
			}
		</>

	)
}