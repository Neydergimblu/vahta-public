import React from 'react';
import { Link } from "react-router-dom";
import style from './Page404.module.css';

export const Page404 = () => {


	return (
		<div className={style.container}>
			<h1>Упс! Такая страница отсутствует...</h1>
			<Link to={"/"}>На главную</Link>
		</div>
	);
};