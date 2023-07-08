import React from 'react'
import { Paths } from '../utils/paths'
import { Menu } from '../components/Menu'
import { v4 as makeId } from 'uuid'
import { FullscreenButton } from '../components/FullscreenButton'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch } from '../store/hooks'
import { logoutUser } from '../store/slices/userSlice/actions'

export const StartPage = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const handleLogout = () => {
        dispatch(logoutUser())
        navigate(Paths.main)
    }

    const menuItems = [
        { title: 'Новая игра', url: Paths.game },
        { title: 'Форум', url: Paths.feed },
        { title: 'Профиль', url: Paths.profile },
        { title: 'Таблица лидеров', url: Paths.leaderBoard },
        { title: 'Выход', clickHandler: handleLogout }
    ].map(item => {
        return { ...item, id: makeId() }
    });

    return (
        <main className='main'>
            <img className="main__logo" src="/images/logo.png" alt="Логотип." />
            <Menu items={menuItems} />
            <FullscreenButton />
        </main>
    )
}
