import React, { FC } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Avatar } from '../components/Avatar'
import { Paths } from '../utils/paths'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { selectUserData } from '../store/selectors/userSelectors'
import { logoutUser } from '../store/slices/userSlice/actions'
import { ButtonBack } from '../components/ButtonBack'

export const ProfilePage: FC = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const userData = useAppSelector(selectUserData)
    const { first_name, second_name, login, email, phone, display_name } =
        userData

    const handleLogout = () => {
        dispatch(logoutUser())
        navigate(Paths.main)
    }

    return (
        <main className="main">
            <div className="shape">
                <ButtonBack path={Paths.startScreen} />
                <div className="shape__wrapper">
                    <div className="profile">
                        <div className="profile__inner">
                            <Avatar />

                            <Link to={Paths.editProfile} className="link">
                                Изменить данные
                            </Link>
                            <Link to={Paths.editPassword} className="link">
                                Изменить пароль
                            </Link>
                            <div
                                className="link link_warning"
                                onClick={handleLogout}>
                                Выйти
                            </div>
                        </div>
                        <ul className="profile__list">
                            <li className="profile__item">
                                <span className="profile__lettering">Имя</span>
                                {first_name}
                            </li>
                            <li className="profile__item">
                                <span className="profile__lettering">
                                    Фамилия
                                </span>
                                {second_name}
                            </li>
                            <li className="profile__item">
                                <span className="profile__lettering">
                                    Имя в чате
                                </span>
                                {display_name}
                            </li>
                            <li className="profile__item">
                                <span className="profile__lettering">
                                    Логин
                                </span>
                                {login}
                            </li>
                            <li className="profile__item">
                                <span className="profile__lettering">
                                    Почта
                                </span>
                                {email}
                            </li>
                            <li className="profile__item">
                                <span className="profile__lettering">
                                    Телефон
                                </span>
                                {phone}
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </main>
    )
}
