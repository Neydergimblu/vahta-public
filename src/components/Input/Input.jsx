import React from 'react';
import cx from 'classnames'
import style from './Input.module.css';

export const Input = ({ label, anatation, register, typeInput, execution, fail }) => {

	const cssLabel = cx(
		style.label,
		(anatation !== undefined || fail === true) && style.changeColorLabel
	)

	const cssInput = cx(
		style.input,
		execution === "search" && style.inputSearch,
		(anatation !== undefined || fail === true) && style.viewValidation
	)

	const cssAnatation = cx(
		style.anatation,
		anatation !== undefined && style.viewAnatation
	)



	return (
		<div className={style.inputGroup}>
			<label className={cssLabel}>{label && label}</label>
			<input
				{...register}
				className={cssInput} type={typeInput}></input>
			<p
				className={cssAnatation}>
				{anatation && anatation}
			</p>
		</div>
	);
};