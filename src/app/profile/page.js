'use client'
import Header from "@/components/Header";
import {read, removeAll, write} from '@/utils/storage'
import {redirect} from "@/utils/redirect";
import {useState, useEffect} from "react";
import Footer from "@/components/Footer";
import {toJson} from "@/utils/formData";
import {getAuth, postAuth, putAuth} from "@/utils/requests";

export default function Profile() {
	const [domLoaded, setDomLoaded] = useState(false);
	const [editing, setEditing] = useState(false);
	const [detail, setDetail] = useState("")
	const [passwording, setPasswording] = useState(false)
	const [books, setBooks] = useState([])

	console.log(books)

	const logout = () => {
		removeAll()
		redirect(window, "/profile", "/")
	}

	useEffect(() => {
		/*(async() => {
			setBooks(await getAuth(`/users/me/bookings`, read('token')))
		})()*/
		setDomLoaded(true);
		if (window && !read('token'))
			redirect(window, '/profile', '/login')
	}, [editing])

	const onSubmit = async e => {
		console.log(e.target)
		e.preventDefault();
		const data = toJson(new FormData(e.target))
		const res = await putAuth(`/users/me`, data, read('token'), {'Content-Type': 'application/json'})
		if (res.detail && typeof res.detail === 'string')
			setDetail(res.detail)
		else if (res.detail)
			setDetail(res.detail[0].msg);
		else {
			write('email', res.email)
			write('nickname', res.nickname)
			setEditing(false)
		}
	}

	const changePassword = e => {
		setPasswording(true)
	}

	const onPasswordSubmit = async e => {
		e.preventDefault();
		const data = toJson(new FormData(e.target))
		const res = await postAuth(`/users/me`, data, read('token'), {'Content-Type': 'application/json'})
		if (res.detail && typeof res.detail === 'string')
			setDetail(res.detail)
		else if (res.detail)
			setDetail(res.detail[0].msg)
		else redirect(window, '', '')
	}

	return <>
		<Header />
		<main className="container pt-8">
			<h1 className="font-semibold text-2xl mb-4">Настройки профиля</h1>
			{detail.length > 0 && <div
				className="block border-orange-700 border-2 mx-auto w-fit px-8 py-2">Ошибка!<br/>
				{detail}
			</div>}
			{passwording &&
				<form onSubmit={onPasswordSubmit}>
					<div className="grid grid-cols-[220px_auto] mb-3 gap-2">
						<p>Старый пароль:</p>
						<input className="text-bg" type="password" name="old_password"/>
						<p>Новый пароль:</p>
						<input className="text-bg" type="password" name="new_password"/>
					</div>
					<button type="submit">Сменить</button>
				</form>
			}
			{!passwording && <form onSubmit={onSubmit}>
				<div className="grid grid-cols-[220px_auto] mb-3 gap-2">
					<p className="text-secondary">Email:</p>
					{domLoaded ? (!editing
							? <p>{read('email')}</p>
							: <input type="email" name="email" className="bg-bg border border-text px-1 w-[250px]"
									 defaultValue={read('email')} required/>
					) : <p></p>}
					<p className="text-secondary">Имя пользователя:</p>
					{domLoaded && (!editing
							? <p>{read('nickname')}</p>
							: <input type="text" name="nickname" className="bg-bg border border-text px-1 w-[250px]"
									 defaultValue={read('nickname')} required/>
					)}
				</div>

				{!editing
					? <button type="button" className="border-[1px] border-text px-2 py-1" onClick={e => {
						e.preventDefault()
						setEditing(true);
					}}>Изменить</button>
					: <button type="submit" className="border-[1px] bg-accent border-text px-2 py-1">Сохранить</button>
				}
			</form>}
			<p className="text-secondary mt-2 flex gap-6">
				<button onClick={changePassword}>Сменить пароль</button>
				<button onClick={logout}>Выйти</button>
			</p>
			{books.length > 0 &&
				<div className="books">
					<h2 className="font-semibold text-2xl my-4">Брони</h2>
					{books.map((book, index) =>
						<div key={index}>
							<span>{book.studio_id}</span>
						</div>)
					}
				</div>
			}
		</main>
		<Footer />
	</>
}