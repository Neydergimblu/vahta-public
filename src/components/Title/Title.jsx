import React from 'react';
import cx from 'classnames'
import style from './Title.module.css';
import { useNavigate } from 'react-router-dom';

export const Title = ({
	titleText,
	backButton
}) => {
	const navigate = useNavigate();


	return (
		<>
			<div className={style.title}>
				{backButton === 'true' ? 
				(
				<div className={style.backButton} onClick={() => navigate(-1)}>
					<div className={style.arrow}></div>
				</div>
				) : false }

				<h1 className={style.titleText}>{titleText && titleText}</h1>
			</div>
		</>
	);
};