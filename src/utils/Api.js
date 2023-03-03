const onResponce = (res) => {
	return res.json()
}

class Api {
	constructor() {
		this._baseUrl = 'http://192.168.0.45:5000/api';
	}
	//Авторизация пользователя
	authorization(data) {
		return fetch(`${this._baseUrl}/users/auth`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json; charset=utf-8',
				'Accept': 'application/json'
			},
			body: JSON.stringify(data)
		}).then(onResponce)
		.catch(
			err => console.log(err)
			
		)
	}

	//Получить пользователя по id
	getUser(id) {
		return fetch(`${this._baseUrl}/users/${id}`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json; charset=utf-8',
				'Accept': 'application/json'
			}
		}).then(onResponce)
		.catch(
			err => console.log(err)
		)
	}

	//Получить справочник ролей
	getRoles() {
		return fetch(`${this._baseUrl}/roles/`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json; charset=utf-8',
				'Accept': 'application/json'
			}
		}).then(onResponce)
		.catch(
			err => console.log(err)
		)
	}

	//Получить всех пользователей
	getAllUser() {
		return fetch(`${this._baseUrl}/users/`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json; charset=utf-8',
				'Accept': 'application/json'
			}
		}).then(onResponce)
		.catch(
			err => console.log(err)
		)
	}

	//Удалить пользователя
	deleteUser(id) {
		return fetch(`${this._baseUrl}/users/${id}`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json; charset=utf-8',
				'Accept': 'application/json'
			}
		}).then(onResponce)
		.catch(
			err => console.log(err)
		)
	}

	//Добавить пользователя
	addUser(data) {
		return fetch(`${this._baseUrl}/users`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json; charset=utf-8',
				'Accept': 'application/json'
			},
			body: JSON.stringify(data)
		}).then(onResponce)
		.catch(
			err => console.log(err)
		)
	}

	//Обновить пользователя
	updateUser(id, data) {
		return fetch(`${this._baseUrl}/users/${id}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json; charset=utf-8',
				'Accept': 'application/json'
			},
			body: JSON.stringify(data)
		}).then(onResponce)
		.catch(
			err => console.log(err)
		)
	}

	//Загрузить реестр
	loadReestr(data) {
		return fetch(`${this._baseUrl}/reestr/`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json; charset=utf-8',
				'Accept': 'application/json'
			},
			body: JSON.stringify(data)
		}).then(onResponce)
		.catch(
			err => console.log(err)
		)
	}

	//Проверить строку прикрепления
	loadAttachmentStroke(data) {
		return fetch(`${this._baseUrl}/reestr/attachment`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json; charset=utf-8',
				'Accept': 'application/json'
			},
			body: JSON.stringify(data)
		}).then(onResponce)
		.catch(
			err => console.log(err)
		)
	}

	//Проверить строку открепления
	loadDetachmentStroke(data) {
		return fetch(`${this._baseUrl}/reestr/detachment`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json; charset=utf-8',
				'Accept': 'application/json'
			},
			body: JSON.stringify(data)
		}).then(onResponce)
		.catch(
			err => console.log(err)
		)
	}

	//Проверить контрольный список
	checkControl(data) {
		return fetch(`${this._baseUrl}/reestr/control`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json; charset=utf-8',
				'Accept': 'application/json'
			},
			body: JSON.stringify(data)
		}).then(onResponce)
		.catch(
			err => console.log(err)
		)
	}

	//Получить все полисы на закрытие
	getAllClosePolis() {
		return fetch(`${this._baseUrl}/reestr/delete`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json; charset=utf-8',
				'Accept': 'application/json'
			}
		}).then(onResponce)
		.catch(
			err => console.log(err)
		)
	}

	//Получить полисы на изменение по дате
	getAllChangePolis() {
		return fetch(`${this._baseUrl}/reestr/change`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json; charset=utf-8',
				'Accept': 'application/json'
			}
		}).then(onResponce)
		.catch(
			err => console.log(err)
		)
	}

	//Получить уникальные
	getEndChangePolis() {
		return fetch(`${this._baseUrl}/reestr/change/end`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json; charset=utf-8',
				'Accept': 'application/json'
			}
		}).then(onResponce)
		.catch(
			err => console.log(err)
		)
	}
}

const api = new Api();

export default api;