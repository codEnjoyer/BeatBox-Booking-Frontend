import moment from "moment/moment";

export const getTime = time =>
    moment(time, 'HH:mm:ssZ').format("HH:mm")

export const openTime = (studio) => {
    if (!studio.opening_at)
        return
    return `${getTime(studio.opening_at)} — ${getTime(studio.closing_at)}`
}