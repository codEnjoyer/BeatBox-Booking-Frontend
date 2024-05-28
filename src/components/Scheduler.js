'use client'
import { useState, useEffect, useRef } from 'react';
import moment from 'moment';
import 'moment/locale/ru'
import '@/app/calendar.css'


export default function Scheduler({from, to, data, storagePath}) {
	moment.locale('ru')
	const [weekStart, setWeekStart] = useState(moment().clone().startOf('isoWeek'));
	const [books, setBooks] = useState(data);
	const [week, setWeek] = useState();
	const [holding, setHolding] = useState([false, []]);
	const [showConfirmation, setShowConfirmation] = useState(false);

	const cellRef = useRef([])

	const setBookLocalStorage = (newBooks) => {
		localStorage.setItem(storagePath, JSON.stringify(newBooks))
	}

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
		const min = holding[1].reduce((min, c) => c < min ? c : min)
		const max = holding[1].reduce((max, c) => c > max ? c : max)
		bookStart.current = dateTimeFromInner(min).format("H") + ":00"
		bookEnd.current = +dateTimeFromInner(max).format("H") + 1 + ":00"
		bookDate.current = dateTimeFromInner(min).format("D MMM")
		setShowConfirmation(true);
	}

	const addBooks = () => {
		const start = moment(bookDate.current+bookStart.current, 'D MMMH:mm')
		const end = moment(bookDate.current+bookEnd.current, 'D MMMH:mm')

		const newBooks = [
			...books, [
			start.format(),
			end.format()
		]]
		setBooks(newBooks)
		setBookLocalStorage(newBooks)
		setShowConfirmation(false);
	}

	useEffect(() => {
		const dates = getWeek();

		const week = {}
		dates.forEach(date => {
			week[innerDateFormat(date)] = [...Array(24)].map(() => 0)
		})
		books.forEach((book, i) => {
			const start = moment(book[0])
			const end = moment(book[1])
			const date = innerDateFormat(start)
			const length = moment.duration(end.diff(start)).asHours()

			if (!week[date])
				return;

			week[date][start.format('HH')] = length
			for (let i = 1; i < length; i++) {
				week[date][+start.format('HH') + i + ""] = -1
			}
		})

		setWeek(week)
	}, [weekStart, books])

	return <div className="calendar select-none" onMouseUp={stopHolding}>
		<div className="cal-navigation">
			<button className="prev" onClick={() => doNavigation(0)}>&lt;</button>
			<div className="month w-16 text-center">{getWeek()[3].format('MMMM')}</div>
			<button className="prev" onClick={() => doNavigation(1)}>&gt;</button>
		</div>
		<div className="w-full calendar-grid max-h-[80vh]">
			<div className="flex sticky top-0 bg-bg z-10">
				<div className="pt-2 pl-1 text-secondary text-sm">GMT+5</div>
				<div className="border-secondary border-b-[1px] w-2 absolute right-0 -bottom-[1px]"></div>
			</div>
			{
				getWeek().map((day, i) =>
					<div key={i} className="sticky top-0 bg-bg">
						<div className="px-2 text-center text-2xl border-secondary">
							{day.format("DD")}
						</div>
						<div className="border-l-[1px] border-b-[1px] relative top-[1px] border-secondary h-4"></div>
					</div>
				)
			}

			{[...Array(24).keys()].map((t, i) => {if (t >= from && t < to) return <>
				<div key={"worp" + t} className="flex gap-2 justify-end">
					<div className="text-right h-8 pt-0">
						<span className="relative -top-[.85em] text-sm z-10 text-secondary pointer-events-none select-none">{getTime(t)}</span>
					</div>
					<div className="border-secondary border-t-[1px] w-2"></div>
				</div>
				{getWeek().map((day, i) => {
					const defaultEl = <div
							key={innerDateTimeFormat(day, t)}
							ref={el => cellRef.current[""+innerDateTimeFormat(day, t)] = el}
							onMouseDown={() => startHold(day, t)}
							onMouseOver={() => tryHold(day, t)}
							className="ts-cell border-l-[1px] border-t-[1px] p-2 border-secondary"></div>

					if (week === undefined)
						return defaultEl

					const date = innerDateFormat(day);
					const event = week[date][t];

					if (event === 0)
						return defaultEl

					if (event === -1)
						return;

					return <div
							key={innerDateTimeFormat(day, t)}
							className={"ts-rows-" + event + " ts-event ts-cell border-l-[1px] border-t-[1px] p-2 border-secondary"}
							></div>

				})}
			</>})}
		</div>
		{showConfirmation &&
		<div className="confirmation">
			<p className="mb-2">Вы хотите забронировать студию на {bookDate.current} с {bookStart.current} до {bookEnd.current}?</p>
			<button className="px-5 py-1 bg-white/20 mr-4" onClick={addBooks}>OK</button>
			<button className="px-5 py-1 bg-white/20" onClick={cancel}>Отмена</button>
		</div>}
	</div>
}