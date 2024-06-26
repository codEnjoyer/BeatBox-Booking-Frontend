'use client'
import Header from "@/components/Header";
import {read, write} from '@/utils/storage'
import {redirect} from "@/utils/redirect";
import {useState, useEffect} from "react";

export default function Profile() {
    const [content, setContent] = useState(<>Загрука</>);

    useEffect(() => {
        if (!read('token'))
            redirect('/profile', '/login')

        setContent(<>
            <h1 className="font-semibold text-2xl mb-4">Настройки профиля</h1>
            <div className="grid grid-cols-[220px_auto]">
                <p className="text-secondary">Email:</p>
                <p>{read('email')}</p>
                <p className="text-secondary">Имя пользователя:</p>
                <p>{read('nickname') || read('email').slice(0, read('email').indexOf('@'))}</p>
            </div>

            <button type="button border-[1px] border-text px-2 py-1">Изменить</button>
        </>)
    }, [])


    const onNicknameSubmit = e => {

    }
    return <>
        <Header />
        <main className="container pt-8">
            {content}
            {/*
            {!read('nickname') ?
                <form onSubmit={onNicknameSubmit}>
                    <p className="mb-2"><label htmlFor="nickname">Пожалуйста, введите имя
                    пользователя:</label></p>
                    <p className="mb-4"><input type="text" name="nickname" id="nickname" required /></p>
                    <button type="submit" className="bg-accent py-1 px-4">Сохранить</button>
                </form>
                :
                <>
                    <p>Имя пользователя: {read('nickname')}</p></>
            }*/}

        </main>
    </>
}