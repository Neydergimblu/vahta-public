import React, { useState, useEffect } from "react";
import style from "./VisitorsArr.module.css";
import { Controller, useFieldArray } from "react-hook-form";
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import lodash from "lodash";

export const VisitorsArr = ({ control, register, getValues, setValue, errors }) => {

	

	const { fields, append, remove, prepend } = useFieldArray({
		control,
		name: "visitors"
	});
	


	return (
		<>
			{fields.map((item, index) => (
				<div key={item.id} className={style.formGridHorizontal}>
					<Controller
						name={`visitors.${index}.surname`}
						// defaultValue={data?.surname ? lodash.upperFirst(data.surname) : ''}
						control={control}
						rules={{ required: 'Введите фамилию пользователя' }}
						render={({ field: { onChange, value } }) => (
							<FormControl margin="normal" fullWidth>
								<TextField
									key={item.id}
									onChange={onChange}
									value={value}
									fullWidth
									id="surname"
									label="Фамилия"
									error={errors.surname ? true : false}
									helperText={errors?.surname?.message}
									required
								/>
							</FormControl>
						)}
					/>

					<Controller
						name={`visitors.${index}.name`}
						// defaultValue={data?.name ? lodash.upperFirst(data.name) : ''}
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
									required
								/>
							</FormControl>
						)}
					/>

					<Controller
						name={`visitors.${index}.patronymic`}
						// defaultValue={data?.patronymic ? lodash.upperFirst(data.patronymic) : ''}
						control={control}
						// rules={{ required: 'Введите отчество' }}
						render={({ field: { onChange, value } }) => (
							<FormControl margin="normal">
								<TextField
									// error={errors?.patronymic ? true : false}
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

					<IconButton aria-label="delete" disableRipple color="primary" onClick={() => { remove(index) }}>
						<DeleteIcon />
					</IconButton>
				</div>
			))}

			<button
				type="button"
				className={style.addVisitor}
				onClick={() => append({})}>+ Добавить поситителя</button>
		</>
	)
}