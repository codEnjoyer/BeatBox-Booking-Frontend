'use client';
import Header from "@/components/Header";
import Link from "next/link";
import {getAuth, post} from "@/utils/requests";
import {useState} from "react";
import {write} from "@/utils/storage";
import { useRouter } from 'next/navigation'

export default function Login() {
    const [result, setResult] = useState(null);
    const router = useRouter()

    const getRes = async (data) => {
        console.log(data)
        const res = await post('/login', data)
        if (res.access_token) {
            write('token', res.access_token)
            write('email', data.get('username'))
            const fuckyou = await getAuth('/users/me', res.access_token);

            // console.log(fuckyou)
            // debugger;
            write('nickname', fuckyou.nickname)
            window.location.replace(window.location.href.replace('/login', ''))
        }
    }

    const onSubmit = async e => {
        e.preventDefault();
        const data = new FormData(e.target)
        console.log(await getRes(data))
    }

    return <>
        <Header />
        <main className="flex justify-center py-10">
            <div className="border-2 border-black p-5 rounded-xl">
                <h1 className="font-semibold text-2xl mb-4">Войти</h1>
                <form onSubmit={onSubmit} className="flex flex-col gap-2 mb-5">
                    <p className="flex flex-col gap-0 5">
                        <label htmlFor="email">E-mail</label>
                        <input type="email" id="email" name="username" className="text-bg p-1" required />
                    </p>
                    <p className="flex flex-col gap-0 5">
                        <label htmlFor="password">Пароль</label>
                        <input type="password" id="password" name="password" className="text-bg p-1" required />
                    </p>
                    <button type="submit" className="bg-accent w-fit py-1 px-6 mt-4">Войти</button>
                </form>
                <Link href="/register" className="text-secondary hover:underline">Еще нет аккаунта?</Link>
            </div>
        </main>
    </>
}