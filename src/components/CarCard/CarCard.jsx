import React, { useContext } from 'react';
import style from "./CarCard.module.css";
import Button from '@mui/material/Button';
import lodash from "lodash"
import { format } from 'date-fns';
import { DashboardContext } from "../../context/dashboardContext";
import requestApi from "../../utils/RequestApi";


const CarCard = ({ car, setUpdateRequestsInCard }) => {
	const { currentUser } = useContext(DashboardContext);

	const theCarLeftTheArea = (id) => {
		console.log(id)
		requestApi.theCarLeftTheArea(id)
			.then(() => {
				setUpdateRequestsInCard(prev => prev + 1);
			})
	}

	return (
		<div className={style.card}>
			<div className={style.time}>Заехал {format(Date.parse(car.entry), 'dd.MM.yyyy')} в {format(Date.parse(car.entry), 'HH:mm:ss')}</div>

			<div className={style.nameAndButton}>
				<div className={style.model}>{lodash.upperFirst(car.model)}</div>
				<div className={style.gosNumber}>{car.gosNumber}</div>
			</div>

			{(car.reqID === 'disabled') && <div className={style.reason}>Посадка / высадка инвалида</div>}
			{(car.reqID === 'special-service') && <div className={style.reason}>Спецслужба</div>}
			{(car.reqID === 'special-pass') && <div className={style.reason}>Спецпропуск</div>}

			{currentUser.role.id === 1007 &&
				<div className={style.btn}><Button variant="outlined" size="small" color='secondary' onClick={() => theCarLeftTheArea(car.areaPositionID)}>Выезд</Button></div>}

		</div>
	);
}

export default CarCard;

