'use client'
import { useState, useEffect, useRef } from 'react';
import moment from 'moment';
import 'moment/locale/ru'
import '@/app/calendar.css'
import {postAuth} from '@/utils/requests'
import {read} from "@/utils/storage";


export default function Scheduler({from, to, data, studioId, roomId}) {
	// console.log(data)
	moment.locale('ru')
	const nameRef = useRef(null);
	const [weekStart, setWeekStart] = useState(moment().clone().startOf('isoWeek'));
	const [books, setBooks] = useState([]);
	const [week, setWeek] = useState();
	const [holding, setHolding] = useState([false, []]);
	const [showConfirmation, setShowConfirmation] = useState(false);
	const [detail, setDetail] = useState("")

	useEffect(() => {setBooks(data)}, [data])

	const cellRef = useRef([])

	/*const setBookLocalStorage = (newBooks) => {
		localStorage.setItem(storagePath, JSON.stringify(newBooks))
	}*/

	const getWeek = () => {
		const days = [];

		for (let i = 0; i < 7; ++i) {
			days.push(moment(weekStart).add(i, 'days'));
		}
		return days
	}

	const cancel = () => {
		document.querySelectorAll('.ts-active').forEach(cell => cell.className = cell.className.replace(' ts-active', ''))
		setShowConfirmation(false)
	}

	const getTime = (hour) => {
		if (hour === 0)
			return ''
		return hour < 10 ? `0${hour}:00` : `${hour}:00`
	}

	const innerDateFormat = (dateTime) =>
		dateTime.format('DDMMYY')

	const dateFromInner = (innerDate) =>
		moment(innerDate, 'DDMMYY')


	const innerDateTimeFormat = (day, time) =>
		`${day.format('DDMMYY')}${time}`

	const dateTimeFromInner = innerDateTime =>
		moment(innerDateTime, 'DDMMYYHHmm')

	const doNavigation = (navigation) => {
		setWeek();
		cellRef.current = [];
		if (navigation === 1)
			setWeekStart(weekStart.clone().add('7', 'days'))
		else
			setWeekStart(weekStart.clone().subtract('7', 'days'))
	}

	const startHold = (day, t) => {
		setDetail("")
		document.querySelectorAll('.ts-active').forEach(cell => cell.className = cell.className.replace(' ts-active', ''))
		const datetime = innerDateTimeFormat(day, t);

		const cell = cellRef.current[datetime]
		if (cell.className.includes('ts-active'))
			return;
		setHolding([true, [datetime]]);
		cell.className = cell.className + ' ts-active'
	}

	const tryHold = (day, t) => {
		if (!holding[0])
			return
		const datetime = innerDateTimeFormat(day, t);
		if (holding[1].includes(datetime))
			return;
		if (datetime.slice(0,6) != holding[1][0].slice(0, 6))
			return;
		holding[1].push(datetime)
		const cell = cellRef.current[innerDateTimeFormat(day, t)]
		cell.className = cell.className + ' ts-active'
	}

	const bookStart = useRef("")
	const bookEnd = useRef("")
	const bookDate = useRef("")
	const stopHolding = () => {
		if (!holding[0])
			return;
		setHolding([false, []]);
		const min = holding[1].reduce((min, c) => +c < +min ? c : min)
		const max = holding[1].reduce((max, c) => +c > +max ? c : max)
		bookStart.current = dateTimeFromInner(min).format("H") + ":00"
		bookEnd.current = +dateTimeFromInner(max).format("H") + 1 + ":00"
		bookDate.current = dateTimeFromInner(min).format("D MMM, YYYY ")
		// console.log(bookStart.current, bookEnd.current)
		setShowConfirmation(true);
	}

	const createBook = async (data) => {
		const res = await postAuth(
			`/studios/${studioId}/rooms/${roomId}/bookings`,
			JSON.stringify(data),
			read('token'),
			{'Content-Type': 'application/json'})

		console.log(res)
		if (res.detail && typeof res.detail === 'string') {
			setDetail(res.detail)
			return false
		} else if (res.detail) {
			setDetail(res.detail[0].msg)
			return false
		}
		return true
		// debugger;
	}

	const addBooks = async (e) => {
		e.preventDefault()

		const start = moment(bookDate.current + bookStart.current, 'D MMM, YYYY H:mm')
		const end = moment(bookDate.current + bookEnd.current, 'D MMM, YYYY H:mm')
		console.log(start, end)

		const data = {
			name: new FormData(e.target).get('name'),
			surname: null,
			starts_at: start.toISOString(),
			ends_at: end.toISOString()
		}
		const ok = await createBook(data)
		if (!ok)
			return

		const newBooks = [
			...books, [
			start.format(),
			end.format()
		]]

		setBooks(newBooks)
		// setBookLocalStorage(newBooks)
		setShowConfirmation(false);
	}

	useEffect(() => {
		const dates = getWeek();

		const week = {}
		dates.forEach(date => {
			week[innerDateFormat(date)] = [...Array(24)].map(() => [0, null])
		})
		books.forEach((book, i) => {
			const start = moment(book[0])
			const end = moment(book[1])

			const my = book[2]

			const closed = book[3]

			const date = innerDateFormat(start)
			const length = moment.duration(end.diff(start)).asHours()
			// console.log(start, end, date, length)

			if (!week[date])
				return;

			// console.log(+start.format('HH'))

			if (my)
				week[date][+start.format('HH')] = [100 + length, book.id]
			else if (closed)
				week[date][+start.format('HH')] = [1000 + length, book.id]
			else
				week[date][+start.format('HH')] = [length, book.id]
			for (let i = 1; i < length; i++) {
				week[date][+start.format('HH') + i + ""] = [-1, null]
			}
			// for (let [k, v] of Object.entries(week)) {
			// 	if (v.filter(x => x).length > 0)
			// 		console.log(k, v)
			// }
		})

		setWeek(week)
	}, [weekStart, books])

	const getEnd = (date) => {
		// TODO: добавить state для даты
		if (date === '24:00')
			return '0:00'
	}

	return <div className="calendar select-none" onMouseUp={stopHolding}>
		<div className="flex justify-between items-center mb-4">
			<h2 className="text-2xl font-semibold">Забронировать</h2>
			<div className="cal-navigation">
				<button className="prev" onClick={() => doNavigation(0)}>&lt;</button>
				<div className="month w-22 text-center">{getWeek()[3].format('MMMM Y')}</div>
				<button className="prev" onClick={() => doNavigation(1)}>&gt;</button>
			</div>
		</div>

		<div className="w-full calendar-grid max-h-[80vh] mb-4">
			<div className="flex sticky top-0 bg-bg z-10">
				<div className="pt-2 pl-1 text-secondary text-sm">GMT+5</div>
				<div className="border-secondary border-b-[1px] w-2 absolute right-0 -bottom-[1px]"></div>
			</div>
			{
				getWeek().map((day, i) =>
					<div key={i + 'alp'} className="sticky top-0 bg-bg">
						<div className="px-2 text-center text-2xl border-secondary" key={i + 'abc'}>
							{day.format("DD")}
						</div>
						<div className="border-l-[1px] border-b-[1px] relative top-[1px] border-secondary h-4"
							 key={i + 'bcd'}></div>
					</div>
				)
			}

			{[...Array(24).keys()].map((t, i) => {
				if (t >= from && t < to) return <>
					<div key={"worp" + t} className="flex gap-2 justify-end">
						<div className="text-right h-8 pt-0">
							<span
								className="relative -top-[.85em] text-sm z-10 text-secondary pointer-events-none select-none">{getTime(t)}</span>
						</div>
						<div className="border-secondary border-t-[1px] w-2"></div>
					</div>
					{getWeek().map((day, i) => {
						const defaultEl = <div
							key={'hey' + innerDateTimeFormat(day, t)}
							ref={el => cellRef.current["" + innerDateTimeFormat(day, t)] = el}
							onMouseDown={() => startHold(day, t)}
							onMouseOver={() => tryHold(day, t)}
							className="ts-cell border-l-[1px] border-t-[1px] p-2 border-secondary"></div>

						if (week === undefined)
							return defaultEl

						const date = innerDateFormat(day);
						const [event, uuid] = week[date][t];

						if (event === 0)
							return defaultEl

						if (event === -1)
							return;

						const length = event % 100
						const type = event > 1000 ? 'ts-closed' : event > 100 ? 'ts-my' : 'ts-event';

						return <div
							key={'what' + innerDateTimeFormat(day, t)}
							className={`ts-rows-${length} ${type} ts-cell border-l-[1px] border-t-[1px] p-2 border-secondary`}
						></div>

					})}
				</>
			})}
		</div>
		{detail.length > 0 &&
			<div className="block border-orange-700 border-2 mx-auto w-fit px-8 py-2">Ошибка!<br/>
				{detail}
			</div>
		}
		{showConfirmation &&
			<form className="confirmation" onSubmit={addBooks}>
				<p className="mb-2">Вы хотите забронировать студию
					на {bookDate.current} с {bookStart.current} до {getEnd(bookEnd.current)}?</p>
				<p className="mb-1"><label htmlFor="name">Забронировать на имя:</label></p>
				<p className="mb-4"><input type="text" name="name" id="name" className="text-bg p-1" required/></p>
				<button type="submit" className="px-5 py-1 bg-accent mr-4">OK</button>
				<button type="button" className="px-5 py-1 bg-white/20" onClick={cancel}>Отмена</button>
			</form>}
	</div>
}