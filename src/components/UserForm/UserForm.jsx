import React, { useState, useEffect } from "react";
import style from "./UserForm.module.css";
// import cx from 'classnames'
import { Button } from "../../components/Button/Button";
import { useForm, Controller } from "react-hook-form";
import { ThemeProvider, createTheme } from '@mui/material/styles'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import FormHelperText from '@mui/material/FormHelperText';
import { useNavigate } from 'react-router-dom';
import lodash from "lodash";
import api from "../../utils/Api";


export const UserForm = ({ options, userData }) => {
	// console.log(userData);
	const [roles, setroles] = useState([]);

	const { register, formState: { errors }, handleSubmit, control, reset } = useForm({
		mode: "onChange"
	});

	const navigate = useNavigate();

	const theme = createTheme({
		palette: {
			primary: {
				main: '#8ac926',
			},
			text: {
				primary: '#8ac926'
			},
			label: {
				main: '#8ac926'
			},
			error: {
				main: '#ff595e'
			}
		}
	});

	useEffect(() => {
		api.getRoles()
			.then((roles) => {
				setroles(roles);
			})
	}, []);

	const addUserQuery = (data) => {
		api.addUser(data)
			.then((result) => {
				if (typeof result !== 'undefined') {
					navigate(-1)
				} else {
					console.log(result.message);
				}
			});
	}

	const updateUserQuery = (data) => {
		api.updateUser(userData.id, data)
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
					typeof userData === 'object' &&
						!Array.isArray(userData) &&
						userData !== null ? handleSubmit(updateUserQuery) : handleSubmit(addUserQuery)
				}
			>

				<ThemeProvider theme={theme}>
					<FormControl margin="none" fullWidth>
						<Controller
							name="surname"
							defaultValue={userData?.surname ? lodash.upperFirst(userData.surname) : ''}
							control={control}
							rules={{ required: 'Введите фамилию пользователя' }}
							render={({ field: { onChange, value } }) => (
								<FormControl margin="normal" fullWidth>
									<TextField
										onChange={onChange}
										value={value}
										fullWidth
										id="surname"
										label="Фамилия"
										error={errors.surname ? true : false}
										helperText={errors?.surname?.message}
									/>
								</FormControl>
							)}
						/>
						<div className={style.formGrid}>
							<Controller
								name="name"
								defaultValue={userData?.name ? lodash.upperFirst(userData.name) : ''}
								control={control}
								rules={{ required: 'Введите имя' }}
								render={({ field: { onChange, value } }) => (
									<FormControl margin="normal">
										<TextField
											error={errors.name ? true : false}
											id="name"
											label="Имя"
											value={value}
											onChange={onChange}
											helperText={errors?.name?.message}
										/>
									</FormControl>
								)}
							/>

							<Controller
								name="patronymic"
								defaultValue={userData?.patronymic ? lodash.upperFirst(userData.patronymic) : ''}
								control={control}
								rules={{ required: 'Введите отчество' }}
								render={({ field: { onChange, value } }) => (
									<FormControl margin="normal">
										<TextField
											error={errors.patronymic ? true : false}
											fullWidth
											id="patronymic"
											label="Отчество"
											value={value}
											onChange={onChange}
											helperText={errors?.patronymic?.message}
										/>
									</FormControl>
								)}
							/>
						</div>

						<Controller
							name="position"
							defaultValue={userData?.position ? lodash.upperFirst(userData.position) : ''}
							control={control}
							rules={{ required: 'Введите должность пользователя' }}
							render={({ field: { onChange, value } }) => (
								<FormControl margin="normal" fullWidth>
									<TextField
										error={errors.position ? true : false}
										fullWidth
										id="position"
										label="Должность"
										value={value}

										onChange={onChange}
										helperText={errors?.position?.message}
									/>
								</FormControl>
							)}
						/>

						<Controller
							name="role"
							defaultValue={userData?.role.id ? userData.role.id : ''}
							control={control}
							rules={{ required: 'Выберите роль пользователя' }}
							render={({ field: { onChange, value } }) => (
								<FormControl margin="normal">
									<InputLabel id="role-label">Роль</InputLabel>
									<Select
										labelId="role-label"
										id="role"
										label="Роль"
										value={value}
										error={errors.role ? true : false}
										onChange={onChange}>
										{roles?.map((role) => (
											<MenuItem key={role.id} value={role.id}>
												{role.roleName}
											</MenuItem>
										))}
									</Select>
									<FormHelperText>{errors?.role?.message}</FormHelperText>
								</FormControl>
							)}
						/>

						<div className={style.formGrid}>
							<Controller
								name="username"
								defaultValue={userData?.username ? userData.username : ''}
								control={control}
								rules={{ required: 'Введите логин' }}
								render={({ field: { onChange, value } }) => (
									<FormControl margin="normal" fullWidth>
										<TextField
											error={errors.username ? true : false}
											fullWidth
											id="username"
											label="Логин"
											value={value}
											onChange={onChange}
											helperText={errors?.username?.message}
										/>
									</FormControl>
								)}
							/>

							<Controller
								name="password"
								defaultValue={userData?.password ? userData.password : ""}
								control={control}
								rules={{ required: 'Введите пароль' }}
								render={({ field: { onChange, value } }) => (
									<FormControl margin="normal" fullWidth>
										<TextField
											error={errors.password ? true : false}
											id="password"
											label="Пароль"
											value={value}
											onChange={onChange}
											helperText={errors?.password?.message}
											type="password"
										/>
									</FormControl>
								)}
							/>
						</div>
					</FormControl>
				</ThemeProvider>

				<div className={style.button}>
					<Button name="Сохранить" type="submit" view="add" />
				</div>

			</form>
		</>
	)
}