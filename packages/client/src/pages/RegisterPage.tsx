import React, { FormEvent, useEffect, useRef, useState } from 'react'
import { Input } from '../components/Input'
import { INPUT_TOOLTIPS } from '../components/Input'
import { Button } from '../components/Button'
import { Link, useNavigate } from 'react-router-dom'
import { validator } from '../utils/validator'
import { Paths } from '../utils/paths'
import { useAuthorization } from '../hooks/useAuthorization'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { getUserInfo, registerUser } from '../store/slices/userSlice/actions'
import { Loader } from '../components/Loader'

export function RegisterPage() {
    const navigate = useNavigate()
    const dispatch = useAppDispatch();
    const { isAuth, isLoading } = useAuthorization();
    const error = useAppSelector(state => state.user.error);
    const firstNameRef = useRef<HTMLInputElement>(null);
    const secondNameRef = useRef<HTMLInputElement>(null);
    const phoneRef = useRef<HTMLInputElement>(null);
    const loginRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const passwordRepeatRef = useRef<HTMLInputElement>(null);
    const emailRef = useRef<HTMLInputElement>(null);
    const [ errorFields, setErrorFields ] = useState({
        login: false,
        password: false,
        phone: false,
        firstName: false,
        secondName: false,
        email: false,
        passwordRepeat: false
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
            dispatch(registerUser({
                email: emailRef.current?.value as string,
                first_name: firstNameRef.current?.value as string,
                login: loginRef.current?.value as string,
                phone: phoneRef.current?.value as string,
                second_name: secondNameRef.current?.value as string,
                password: passwordRef.current?.value as string
            })).then(() => {
                dispatch(getUserInfo())
            })
        }
    }

    const getErrorFields = () => {
        return {
            login: !validator(loginRef.current?.value, 'login'),
            password: !validator(passwordRef.current?.value, 'password'),
            phone: !validator(phoneRef.current?.value, 'phone'),
            firstName: !validator(firstNameRef.current?.value, 'first_name'),
            secondName: !validator(secondNameRef.current?.value, 'second_name'),
            email: !validator(emailRef.current?.value, 'email'),
            passwordRepeat: !validator(passwordRef.current?.value, 'passwordRepeat', passwordRepeatRef.current?.value)
        }
    }

    if (isLoading) {
        return <main className='main'><Loader /></main>
    }

    return (
        <main className='main'>
            <div className='shape'>
                <div className='shape__wrapper'>
                    <div className='title title_main shape__title shape__title_big'>
                        Регистрация
                    </div>
                    <form method='post' className='form' onSubmit={onSubmitForm}>
                        <Input
                            type='text'
                            name='first_name'
                            label='Имя'
                            tooltip={INPUT_TOOLTIPS.name}
                            ref={firstNameRef}
                            error={errorFields.firstName}
                        />
                        <Input
                            type='text'
                            name='second_name'
                            label='Фамилия'
                            tooltip={INPUT_TOOLTIPS.name}
                            ref={secondNameRef}
                            error={errorFields.secondName}
                        />
                        <Input
                            type='text'
                            name='login'
                            label='Логин'
                            tooltip={INPUT_TOOLTIPS.login}
                            ref={loginRef}
                            error={errorFields.login}
                        />
                        <Input
                            type='text'
                            name='email'
                            label='Почта'
                            tooltip={INPUT_TOOLTIPS.email}
                            ref={emailRef}
                            error={errorFields.email}
                        />
                        <Input
                            type='text'
                            name='phone'
                            label='Телефон'
                            tooltip={INPUT_TOOLTIPS.phone}
                            ref={phoneRef}
                            error={errorFields.phone}
                        />
                        <Input
                            type='password'
                            name='password'
                            label='Пароль'
                            tooltip={INPUT_TOOLTIPS.password}
                            ref={passwordRef}
                            error={errorFields.password}
                        />
                        <Input
                            type='password'
                            name='passwordRepeat'
                            label='Пароль еще раз'
                            ref={passwordRepeatRef}
                            error={errorFields.passwordRepeat}
                        />
                        <Button type='submit' text='Зарегестрироваться'
                            buttonClass='form__button'/>
                    </form>
                    <p className='text error label__error'>{error}</p>
                    <Link to={Paths.login} className='link shape__link'>Войти</Link>
                </div>
            </div>
        </main>
    )
}
