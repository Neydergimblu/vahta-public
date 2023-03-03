import React from 'react';
import { useForm } from 'react-hook-form';
import style from './SearchForm.module.css';
import { Input } from "../Input/Input";
import searchIcon from "./img/search-svgrepo-com.svg"

export const SearchForm = ({
	setSearchRequest
}) => {
	const { register, handleSubmit } = useForm();

	const onChange = (data) => {
		setSearchRequest(data.search);
	}

	return (
		<form className={style.form} onChange={handleSubmit(onChange)}>
			<div className={style.searchInput}>
				<div className={style.inputGroup}>
					<img className={style.imgSearch} src={searchIcon} alt="поиск" />
					<Input register={register('search')} execution='search'/>
				</div>
			</div>
			{/* <div className={style.searchButton}>
				<Button type="submit" name="Поиск" view="add" />
			</div> */}
		</form>
	);
};