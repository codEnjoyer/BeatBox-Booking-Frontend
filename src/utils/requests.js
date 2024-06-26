const BASE_URL = 'http://158.160.58.186/api/v1'

export const get = async (url, headers={}) => {
    const res = await fetch(BASE_URL + url, {
        headers: headers
    })
    const data = await res.json()
    return data
}

export const getAuth = async (url, token) => {
    return await get(url, {
        headers: {
            'Authorization': token
        }
    })
}

export const post = async (url, json, headers={}) => {
    const res = await fetch(BASE_URL + url, {
        method: 'POST',
        body: json,
        headers: headers
    })
    const data = await res.json()
    return data
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