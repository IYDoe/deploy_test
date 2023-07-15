import React, { FormEvent, useState, useRef } from 'react'
import { ButtonBack } from '../components/ButtonBack'
import { INPUT_TOOLTIPS, Input } from '../components/Input'
import { validator } from '../utils/validator'
import { Paths } from '../utils/paths'
import { Button } from '../components/Button'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch } from '../store/hooks'
import { changePassword } from '../store/slices/userSlice/actions'

export const EditPasswordPage = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const oldPasswordRef = useRef<HTMLInputElement>(null)
    const newPasswordRef = useRef<HTMLInputElement>(null)
    const repeatPasswordRef = useRef<HTMLInputElement>(null)
    const [ errorMessage, setErrorMessage ] = useState('')

    const [ errorFields, setErrorFields ] = useState({
        oldPassword: false,
        newPassword: false,
        passwordRepeat: false,
    })

    const onSubmitForm = (e: FormEvent) => {
        e.preventDefault()
        const fieldsValidated = validateFields()

        if (fieldsValidated) {
            dispatch(
                changePassword({
                    oldPassword: oldPasswordRef.current?.value || '',
                    newPassword: newPasswordRef.current?.value || '',
                })
            )
                .unwrap()
                .then((res) => {
                    if (res.success) {
                        navigate(Paths.profile)
                    } else {
                        setErrorMessage(res.reason)
                    }
                })
        }
    }

    const validateFields = (): boolean => {
        const newErrorFields = {
            oldPassword: !validator(oldPasswordRef.current?.value, 'password'),
            newPassword: !validator(
                newPasswordRef.current?.value,
                'newPassword'
            ),
            passwordRepeat: !validator(
                repeatPasswordRef.current?.value,
                'passwordRepeat',
                newPasswordRef.current?.value
            ),
        }

        setErrorFields(newErrorFields)

        return !Object.values(newErrorFields).includes(true)
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
                                type="password"
                                name="password"
                                label="Пароль"
                                tooltip={INPUT_TOOLTIPS.password}
                                ref={oldPasswordRef}
                            />
                            <Input
                                type="password"
                                name="newPassword"
                                label="Новый пароль"
                                tooltip={INPUT_TOOLTIPS.password}
                                ref={newPasswordRef}
                                error={errorFields.newPassword}
                            />
                            <Input
                                type="password"
                                name="passwordRepeat"
                                label="Новый пароль (еще раз)"
                                ref={repeatPasswordRef}
                                error={errorFields.passwordRepeat}
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
