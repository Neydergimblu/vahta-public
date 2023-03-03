const onResponce = (res) => {
	return res.json()
}

class RequestApi {
	constructor() {
		this._baseUrl = 'http://192.168.0.45:5000/api';
	}

	//Получить все заявки пользователя
	getAllRequest(id) {
		return fetch(`${this._baseUrl}/requests/user/${id}`, {
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

	//Получить заявку по id
	getRequestById(id) {
		return fetch(`${this._baseUrl}/requests/${id}`, {
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

	//Добавить завку
	addRequest(data) {
		return fetch(`${this._baseUrl}/requests`, {
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

	//Удалить заявку
	deleteRequest(id) {
		return fetch(`${this._baseUrl}/requests/${id}`, {
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

	//Отправить заявку на согласование
	sendForAgreement(id) {
		return fetch(`${this._baseUrl}/requests/sendForAgreement/${id}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json; charset=utf-8',
				'Accept': 'application/json'
			}
		}).then(onResponce)
			.catch(
				err => console.log(err)
			)
	}

	//Отправить заявку на утверждение
	sendForApproval(id) {
		return fetch(`${this._baseUrl}/requests/sendForApproval/${id}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json; charset=utf-8',
				'Accept': 'application/json'
			}
		}).then(onResponce)
			.catch(
				err => console.log(err)
			)
	}

	//Отправить заявку в работу
	sendToWork(id) {
		return fetch(`${this._baseUrl}/requests/sendToWork/${id}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json; charset=utf-8',
				'Accept': 'application/json'
			}
		}).then(onResponce)
			.catch(
				err => console.log(err)
			)
	}

	//Отправить заявку в работу
	sendToArchive(id) {
		return fetch(`${this._baseUrl}/requests/sendToArchive/${id}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json; charset=utf-8',
				'Accept': 'application/json'
			}
		}).then(onResponce)
			.catch(
				err => console.log(err)
			)
	}

	//Получить заявки для обработки
	getAllRequestsForProcessing() {
		return fetch(`${this._baseUrl}/processing`, {
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

	//Получить заявки для мониторинга
	getAllRequestsForMonitoring() {
		return fetch(`${this._baseUrl}/monitoring`, {
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

	//Обновить данные заявки
	updateRequest(id, data) {
		return fetch(`${this._baseUrl}/requests/${id}`, {
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

	//Ожидание обновления заявок
	waitRequest() {
		return fetch(`${this._baseUrl}/processing/wait-request`, {
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

	//Получить машины на территории
	getCarInTheArea() {
		return fetch(`${this._baseUrl}/cars`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json; charset=utf-8',
				'Accept': 'application/json'
			},
		}).then(onResponce)
			.catch(
				err => console.log(err)
			)
	}

	//Заезд машины на территорию
	carEnteredTheArea(data) {
		return fetch(`${this._baseUrl}/cars/`, {
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

	//Выезд машины с территории
	theCarLeftTheArea(id) {
		return fetch(`${this._baseUrl}/cars/left/${id}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json; charset=utf-8',
				'Accept': 'application/json'
			},
		}).then(onResponce)
			.catch(
				err => console.log(err)
			)
	}

	//Заезд машины по регламенту на территорию учреждения
	addCarForReglament(data) {
		return fetch(`${this._baseUrl}/cars/reglament`, {
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

}

const requestApi = new RequestApi();

export default requestApi;