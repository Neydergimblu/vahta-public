import React, { useState, useContext, useEffect } from "react";
import style from "./RequestForm.module.css";

import { Button } from "../Button/Button";
import { useForm, Controller } from "react-hook-form";
import { ThemeProvider, createTheme } from '@mui/material/styles'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import FormHelperText from '@mui/material/FormHelperText';
import { useNavigate } from 'react-router-dom';
import requestApi from "../../utils/RequestApi";
import intervalList from "../../mock/interval.json"
import { format } from 'date-fns';
import { VisitorsArr } from '../VisitorsArr/VisitorsArr';
import { CarsArr } from '../CarsArr/CarsArr';
import img from '../../mock/user.json'

import { DashboardContext } from "../../context/dashboardContext";


export const RequestForm = ({ request }) => {

	const [interval, setInterval] = useState(intervalList)
	const [DefaultVisitorsArr, setDefaultVisitorsArr] = useState(
		request?.visitors && (
			request?.visitors.map((item) => {
				const fioArr = item.fio.split(' ')
				return { surname: fioArr[0].toLowerCase(), name: fioArr[1].toLowerCase(), patronymic: fioArr[2].toLowerCase() }
			}))
	)

	const [DefaultCarsArr, setDefaultCarsArr] = useState(
		request?.cars && (
			request?.cars.map((item) => {
				return { model: item.model.toLowerCase(), gosNumber: item.gosNumber.toLowerCase() }
			}))
	)

	const { currentUser } = useContext(DashboardContext);

	const baseDate = format(new Date(), 'yyyy-MM-dd');

	// console.log(request)
	const { control,
		register,
		handleSubmit,
		getValues,
		formState: { errors },
		reset,
		setValue } = useForm({
			mode: "onChange",
			defaultValues: {
				visitors: DefaultVisitorsArr,
				cars: DefaultCarsArr
			}
		});



	const navigate = useNavigate();

	

	const addRequest = (data) => {
		// console.log(data)
		data.userID = currentUser.userID
		requestApi.addRequest(data)
			.then((result) => {
				if (typeof result !== 'undefined') {
					navigate(-1)
				} else {
					console.log(result.message);
				}
			});
	}

	const updateRequest = (data) => {
		console.log(data)
		requestApi.updateRequest(request.reqID, data)
			.then((result) => {
				if (typeof result !== 'undefined') {
					navigate(-1)
				} else {
					console.log(result.message);
				}
			});
	}

	return (
		<>
			<form
				className={style.form}
				onSubmit={
					typeof request === 'object' &&
						!Array.isArray(request) &&
						request !== null ? handleSubmit(updateRequest) : handleSubmit(addRequest)
				}
			>

				
					<FormControl margin="none" fullWidth>
						<p className={style.formSubTitle}>Посетители</p>

						<VisitorsArr {...{ control, register, getValues, setValue, errors }} />

						<p className={style.formSubTitle}>Автомобили</p>

						<CarsArr {...{ control, register, getValues, setValue, errors }} />

						<div className={style.formGridHorizontal}>
							<div className={style.formSector}>
								<p className={style.formSubTitle}>Откуда</p>
								<Controller
									name="org"
									defaultValue={request?.organization ? request.organization : ''}
									control={control}
									// rules={{ required: 'Введите название организации' }}
									render={({ field: { onChange, value } }) => (
										<FormControl margin="normal" fullWidth>
											<TextField
												error={errors.org ? true : false}
												fullWidth
												id="org"
												label="Организация"
												value={value}
												onChange={onChange}
												helperText={errors?.org?.message}
											/>
										</FormControl>
									)}
								/>

								<Controller
									name="commentary"
									defaultValue={request?.commentary ? request.commentary : ''}
									control={control}
									// rules={{ required: 'Добавьте комментарий' }}
									render={({ field: { onChange, value } }) => (
										<FormControl margin="normal" fullWidth>
											
											<TextField
												error={errors.commentary ? true : false}
												id="commentary"
												label="Комментарий"
												multiline
												maxRows={4}
												value={value}
												onChange={onChange}
												helperText={errors?.commentary?.message}
											/>
										</FormControl>
									)}
								/>

								<Controller
									name="contract"
									defaultValue={request?.contract ? request.contract : ''}
									control={control}
									// rules={{ required: 'Введите номер договора' }}
									render={({ field: { onChange, value } }) => (
										<FormControl margin="normal" fullWidth>
											<TextField
												error={errors.contract ? true : false}
												id="contract"
												label="Договор"
												value={value}
												onChange={onChange}
												helperText={errors?.contract?.message}
											/>
										</FormControl>
									)}
								/>
							</div>
							<div className={style.formSector}>
								<p className={style.formSubTitle}>Продолжительность</p>
								<div className={style.formGridHorizontal}>
									<Controller
										name="start"
										defaultValue={request?.reqStart ? format(new Date(request?.reqStart), 'yyyy-MM-dd') : baseDate}
										control={control}
										// rules={{ required: 'Введите пароль' }}
										render={({ field: { onChange, value } }) => (
											<FormControl margin="normal" fullWidth>
												<TextField
													error={errors.start ? true : false}
													id="start"
													label="C"
													value={value}
													onChange={onChange}
													helperText={errors?.start?.message}
													type="date"
												/>
											</FormControl>
										)}
									/>
									<Controller
										name="end"
										defaultValue={request?.reqEnd ? format(new Date(request?.reqEnd), 'yyyy-MM-dd') : baseDate}
										control={control}
										// rules={{ required: 'Введите окончание действия заявки' }}
										render={({ field: { onChange, value } }) => (
											<FormControl margin="normal" fullWidth>
												<TextField
													error={errors.end ? true : false}
													id="end"
													label="По"
													value={value}
													onChange={onChange}
													helperText={errors?.end?.message}
													type="date"
												/>
											</FormControl>
										)}
									/>
								</div>

								<Controller
									name="interval"
									defaultValue={request?.reqID ? format(new Date(request.reqStart), 'HH:mm:SS') + ", " + format(new Date(request.reqEnd), 'HH:mm:SS') : '08:30:00, 17:15:00'}
									control={control}
									// rules={{ required: 'Выберите временной интервал' }}
									render={({ field: { onChange, value } }) => (
										<FormControl margin="normal" fullWidth>
											<InputLabel id="role-label">Временной интервал</InputLabel>
											<Select
												labelId="role-label"
												id="interval"
												label="Временной интервал"
												value={value}
												fullWidth
												error={errors.interval ? true : false}
												onChange={onChange}>
												{interval?.map((int) => (
													<MenuItem key={int.id} value={int.value}>
														{int.title}
													</MenuItem>
												))}
											</Select>
											<FormHelperText>{errors?.interval?.message}</FormHelperText>
										</FormControl>
									)}
								/>
							</div>
						</div>

						<div className={style.formGridHorizontal}>
							{/* <div className={style.formSector}>
								<p className={style.formSubTitle}>Сопроводительное письмо</p>
								<Controller
									name="coveringLetter"
									defaultValue={''}
									control={control}
									// rules={{ required: 'Добавьте сопроводительное письмо' }}
									render={({ field: { onChange, value } }) => (
										<FormControl margin="normal" fullWidth>
											<TextField
												error={errors.coveringLetter ? true : false}
												fullWidth
												id="coveringLetter"
												// label="Организация"
												value={value}
												onChange={onChange}
												helperText={errors?.coveringLetter?.message}
												type="file"
											/>
										</FormControl>
									)}
								/>
							</div> */}
							<div className={style.formSector}>
								<p className={style.formSubTitle}>История</p>

							</div>
						</div>

					</FormControl>
				

				<div className={style.button}>
					<Button name="Сохранить" type="submit" view="add" />
				</div>

			</form>
		</>
	)
}