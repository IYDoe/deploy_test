import React, { FormEvent, useEffect, useRef, useState } from 'react'
import { Input, INPUT_TOOLTIPS } from '../components/Input'
import { Button } from '../components/Button'
import { Link, useNavigate } from 'react-router-dom'
import { validator } from '../utils/validator'
import { Paths } from '../utils/paths'
import { useAuthorization } from '../hooks/useAuthorization'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { getClientId, getUserInfo } from '../store/slices/userSlice/actions'
import { Loader } from '../components/Loader'
import { Urls } from '../utils/api';

export function LoginPage() {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const loginRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const error = useAppSelector(state => state.user.error);
    const { isAuth, signin, isLoading } = useAuthorization();
    const [ errorFields, setErrorFields ] = useState({
        login: false,
        password: false
    })

    useEffect(() => {
        if (isAuth) {
            navigate(Paths.startScreen)
        }
    }, [ isAuth, errorFields ])

    const onSubmitForm = (e: FormEvent) => {
        e.preventDefault();
        const errorFields = getErrorFields();
        setErrorFields(errorFields);

        const fieldsValidated = !Object.values(errorFields).includes(true);
        if (fieldsValidated) {
            signin({
                login: loginRef.current?.value as string,
                password: passwordRef.current?.value as string
            }).then(() => {
                dispatch(getUserInfo());
            })
        }
    }

    const getErrorFields = () => {
        return {
            login: !validator(loginRef.current?.value, 'login'),
            password: !validator(passwordRef.current?.value, 'password')
        }
    }

    const onYandexAuthorization = () => {
        dispatch(getClientId()).then(res => {
            window.location.href = `https://oauth.yandex.ru/authorize?response_type=code&client_id=${res.payload.service_id}&redirect_uri=${Urls.redirectUri}`;
        })
    }

    if (isLoading) {
        return <main className='main'><Loader /></main>
    }

    return (
        <main className='main'>
            <div className='shape'>
                <div className='shape__wrapper'>
                    <div className='title title_main shape__title shape__title_big'>
                        Вход
                    </div>
                    <form method='post' className='form' onSubmit={onSubmitForm}>
                        <Input
                            type='text'
                            name='login'
                            label='Логин'
                            tooltip={INPUT_TOOLTIPS.login}
                            ref={loginRef}
                            error={errorFields.login}
                        />
                        <Input
                            type='password'
                            name='password'
                            label='Пароль'
                            tooltip={INPUT_TOOLTIPS.password}
                            ref={passwordRef}
                            error={errorFields.password}
                        />
                        <Button type='submit' text='Войти' buttonClass='form__button'/>
                    </form>
                    <Button type='button' text='Войти с помощью Яндекс' buttonClass='form__button button_top-indent' onClick={onYandexAuthorization}/>
                    <p className='text error label__error'>{error}</p>
                    <Link to={Paths.register} className='link shape__link'>Еще не зарегестрированы?</Link>
                </div>
            </div>
        </main>
    )
}
