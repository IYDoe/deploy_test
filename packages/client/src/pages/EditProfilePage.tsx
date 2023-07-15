import React, { FormEvent, useState, useRef, useEffect } from 'react'
import { ButtonBack } from '../components/ButtonBack'
import { INPUT_TOOLTIPS, Input } from '../components/Input'
import { validator } from '../utils/validator'
import { Paths } from '../utils/paths'
import { Button } from '../components/Button'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { selectIsLoadingUser, selectUserData } from '../store/selectors/userSelectors'
import { changeUser, editInnerUser } from '../store/slices/userSlice/actions'
import { Loader } from '../components/Loader'

export const EditProfilePage = () => {
    const navigate = useNavigate()
    const firstNameRef = useRef<HTMLInputElement>(null)
    const secondNameRef = useRef<HTMLInputElement>(null)
    const displayNameRef = useRef<HTMLInputElement>(null)
    const phoneRef = useRef<HTMLInputElement>(null)
    const loginRef = useRef<HTMLInputElement>(null)
    const emailRef = useRef<HTMLInputElement>(null)
    const dispatch = useAppDispatch()
    const userData = useAppSelector(selectUserData)
    const isLoading = useAppSelector(selectIsLoadingUser)
    const innerId = useAppSelector((state) => state.user.innerId);
    const { first_name, second_name, display_name, login, email, phone } =
        userData

    const [ errorMessage, setErrorMessage ] = useState('')

    const [ errorFields, setErrorFields ] = useState({
        firstName: false,
        secondName: false,
        displayName: false,
        login: false,
        email: false,
        phone: false,
    })

    const onSubmitForm = (event: FormEvent) => {
        event.preventDefault()
        const fieldsValidated = validateFields()

        if (fieldsValidated) {
            dispatch(
                changeUser({
                    first_name: firstNameRef.current?.value || '',
                    second_name: secondNameRef.current?.value || '',
                    display_name: displayNameRef.current?.value || '',
                    login: loginRef.current?.value || '',
                    email: emailRef.current?.value || '',
                    phone: phoneRef.current?.value || '',
                })
            )
                .unwrap()
                .then(res => {
                    if (res.success) {
                        if (loginRef.current?.value && innerId) {
                            dispatch(
                                editInnerUser({
                                    login: loginRef.current?.value,
                                    id: innerId
                                })
                            )
                        }

                        navigate(Paths.profile)
                    } else {
                        setErrorMessage(res.reason)
                    }
                })
        }
    }

    const validateFields = (): boolean => {
        const newErrorFields = {
            firstName: !validator(firstNameRef.current?.value, 'first_name'),
            secondName: !validator(secondNameRef.current?.value, 'second_name'),
            displayName: !validator(
                displayNameRef.current?.value,
                'display_name'
            ),
            login: !validator(loginRef.current?.value, 'login'),
            email: !validator(emailRef.current?.value, 'email'),
            phone: !validator(phoneRef.current?.value, 'phone'),
        }

        setErrorFields(newErrorFields)

        return !Object.values(newErrorFields).includes(true)
    }

    if (isLoading) {
        return <div className='main'><Loader /></div>
    }

    return (
        <main className="main">
            <div className="shape">
                <ButtonBack path={Paths.profile} />
                <div className="shape__wrapper">
                    <div className="profile">
                        <form
                            className="form"
                            method="post"
                            onSubmit={onSubmitForm}>
                            <Input
                                type="text"
                                name="first_name"
                                label="Имя"
                                tooltip={INPUT_TOOLTIPS.name}
                                ref={firstNameRef}
                                error={errorFields.firstName}
                                defaultValue={first_name}
                            />
                            <Input
                                type="text"
                                name="second_name"
                                label="Фамилия"
                                tooltip={INPUT_TOOLTIPS.name}
                                ref={secondNameRef}
                                error={errorFields.secondName}
                                defaultValue={second_name}
                            />
                            <Input
                                type="text"
                                name="display_name"
                                label="Имя в чате"
                                tooltip={INPUT_TOOLTIPS.login}
                                ref={displayNameRef}
                                error={errorFields.displayName}
                                defaultValue={display_name}
                            />
                            <Input
                                type="text"
                                name="login"
                                label="Логин"
                                tooltip={INPUT_TOOLTIPS.login}
                                ref={loginRef}
                                error={errorFields.login}
                                defaultValue={login}
                            />
                            <Input
                                type="text"
                                name="email"
                                label=" Почта"
                                tooltip={INPUT_TOOLTIPS.email}
                                ref={emailRef}
                                error={errorFields.email}
                                defaultValue={email}
                            />
                            <Input
                                type="text"
                                name="phone"
                                label="Телефон"
                                tooltip={INPUT_TOOLTIPS.phone}
                                ref={phoneRef}
                                error={errorFields.phone}
                                defaultValue={phone}
                            />
                            <Button
                                type="submit"
                                text="Сохранить"
                                buttonClass="form__button"
                            />
                            <p className='text error label__error'>{errorMessage}</p>
                        </form>
                    </div>
                </div>
            </div>
        </main>
    )
}
