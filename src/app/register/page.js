'use client';
import Header from "@/components/Header";
import Link from "next/link";
import {getAuth, post} from "@/utils/requests";
import {useState} from "react";
import {write} from "@/utils/storage";
import { useRouter } from 'next/navigation'
import {toJson} from "@/utils/formData";
import Footer from "@/components/Footer";


export default function Register() {
	const [detail, setDetail] = useState("");
	const [result, setResult] = useState(null);
	const router = useRouter()

	const getRes = async (data) => {
		const res = await post('/register', toJson(data), {'Content-Type': 'application/json'});
		console.log(res)

		if (res.detail && typeof res.detail !== 'string')
			setDetail(res.detail[0].msg)
		else if (res.detail)
			setDetail(res.detail)
		else {
			const loginFormData = new FormData()
			loginFormData.append('username', data.get('email'))
			loginFormData.append('password', data.get('password'))
			const loginData = await post('/login', loginFormData)
			write('token', loginData.access_token)
			write('email', data.get('email'))
			const fuckyou = await getAuth('/users/me', loginData.access_token);
			write('nickname', fuckyou.nickname)
			window.location.replace(window.location.href.replace('/register', ''))
		}
	}

	const onSubmit = async e => {
		e.preventDefault();
		const data = new FormData(e.target)
		await getRes(data)
	}

	return <>
		<Header/>
		{detail.length > 0 &&
			<div className="block border-orange-700 border-2 mx-auto w-fit px-8 py-2">Ошибка!<br />
				{detail}
			</div>
		}
		<main className="flex justify-center py-3">
			<div className="border-2 border-black p-5 rounded-xl">
				<h1 className="font-semibold text-2xl mb-4">Регистрация</h1>
				<form onSubmit={onSubmit} className="flex flex-col gap-2 mb-5">
					<p className="flex flex-col gap-0 5">
						<label htmlFor="email">E-mail</label>
						<input type="email" id="email" name="email" className="text-bg p-1" required/>
					</p>
					<p className="flex flex-col gap-0 5">
						<label htmlFor="nickname">Имя пользователя</label>
						<input type="nickname" id="nickname" name="nickname" className="text-bg p-1" required/>
					</p>
					<p className="flex flex-col gap-0 5">
						<label htmlFor="password">Пароль</label>
						<input type="password" id="password" name="password" className="text-bg p-1" required/>
					</p>
					<button type="submit" className="bg-accent w-fit py-1 px-6 mt-4">Создать аккаунт</button>
				</form>
				<Link href="/login" className="text-secondary hover:underline">Уже есть аккаунт?</Link>
			</div>
		</main>
		<Footer />
	</>
}