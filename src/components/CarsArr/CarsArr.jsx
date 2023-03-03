import React from "react";
import style from "./CarsArr.module.css";
import { Controller, useFieldArray } from "react-hook-form";
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import lodash from "lodash";

export const CarsArr = ({ control, register, errors }, data) => {

	

	const { fields, append, remove } = useFieldArray({
		control,
		name: "cars",
	});


	// console.log(fields)


	return (
		<>
			{fields.map((item, index) => (
				<div key={item.id} className={style.formGridHorizontal}>
					<Controller
						name={`cars.${index}.model`}
						// defaultValue={data?.surname ? lodash.upperFirst(data.surname) : ''}
						control={control}
						rules={{ required: 'Введите фамилию пользователя' }}
						render={({ field: { onChange, value, } }) => (
							<FormControl margin="normal" fullWidth>
								<TextField
									onChange={onChange}
									value={value}
									fullWidth
									label="Марка/модель"
									required
								/>
							</FormControl>
						)}
					/>

					<Controller
						name={`cars.${index}.gosNumber`}
						defaultValue={data?.name ? lodash.upperFirst(data.name) : ''}
						control={control}
						rules={{ required: 'Введите имя' }}
						render={({ field: { onChange, value } }) => (
							<FormControl margin="normal">
								<TextField
									error={errors.name ? true : false}
									id="gosNumber"
									label="Гос. номер"
									value={value}
									onChange={onChange}
									helperText={errors?.name?.message}
									required

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
				onClick={() => append({})}>+ Добавить автомобиль</button>
		</>
	)
}