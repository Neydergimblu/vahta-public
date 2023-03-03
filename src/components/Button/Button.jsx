import React from 'react';
import cx from 'classnames'
import style from './Button.module.css';

export const Button = ({
	name,
	view,
	type,
	disabled,
	event
}) => {
	const className = cx(
		style.all,
		view === 'add' && style.add,
		view === 'default' && style.default,
		view === 'cancel' && style.cancel,
	)


	return (
		<button className={className} type={type ? type : "button"} disabled={disabled}>
			{name ? name : 'Name'}
		</button>
	);
};