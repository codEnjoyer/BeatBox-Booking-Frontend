const BASE_URL = 'http://158.160.58.186/api/v1'

export const get = async (url, headers={}) => {
	const res = await fetch(BASE_URL + url, { headers: headers })
	return await res.json()
}

export const getAuth = async (url, token) => {
	return await get(url, {
		'Authorization': 'Bearer ' + token
	})
}

export const post = async (url, json, headers={}) => {
	const res = await fetch(BASE_URL + url, {
		method: 'POST',
		body: json,
		headers: headers
	})
	return await res.json()
}

export const postAuth = async (url, data, token, headers={}) => {
	return await post(url, data, {
		'Authorization': 'Bearer ' + token,
		...headers
	})
}

export const put = async (url, data, headers={}) => {
	const res = await fetch(BASE_URL + url, {
		method: 'PUT',
		body: data,
		headers: headers
	})
	return await res.json()
}

export const putAuth = async (url, data, token, headers={}) => {
	return await put(url, data, {
		'Authorization': 'Bearer ' + token,
		...headers
	})
}

export const getImage = async (url) => {
	const res = await get(url);
	if (typeof res === 'string')
		return res
	return '/noimage.jpg'
}

export const getDateTimeTime = (datetime) => {
	const addZero = (num) => ('0' + num).slice(-2)

	const date = new Date(datetime)
	return `${addZero(date.getHours() - 5)}:${addZero(date.getMinutes())}`
}
