import React, { ForwardedRef, forwardRef, RefObject, useEffect, useState } from 'react'
import { InputProps } from '../interfaces'
import { validator } from '../utils/validator'

export const INPUT_TOOLTIPS = {
    name: 'Первая буква должна быть заглавной, без пробелов и без цифр,допустим дефис',
    login: 'От 3 до 20 символов, латиница, может содержать цифры, но не состоять из них, без пробелов, допустимы дефис и нижнее подчёркивание',
    phone: 'Без пробелов, состоит из цифр, может начинается с плюса',
    password: 'От 8 до 40 символов, обязательно хотя бы одна заглавная буква и цифра',
    email: 'Почта может включать цифры и буквы'
}

export const Input = forwardRef((props: InputProps, ref: ForwardedRef<HTMLInputElement>) => {
    const { type, name, label, tooltip, error, defaultValue } = props;
    const [ inputClass, setInputClass ] = useState('label__input');
    const [ inputError, setInputError ] = useState(error);

    useEffect(() => {
        setInputError(error)

        return () => {
            setInputError(false)
        }
    }, [ error ]);

    useEffect(() => {
        if (defaultValue) {
            setInputClass('label__input not-empty');
        }
    }, [ defaultValue ])

    const handleChange = () => {
        const value = (ref as RefObject<HTMLInputElement>).current?.value;
        if (value) {
            setInputClass('label__input not-empty');
        } else {
            setInputClass('label__input');
        }
        removeError();
    }

    const handleBlur = () => {
        if (name === 'passwordRepeat') {
            return
        }

        const validation = validator((ref as RefObject<HTMLInputElement>).current?.value, name);
        if (!validation) {
            setInputError(true);
        }
    }

    const removeError = () => {
        if (inputError) {
            setInputError(false);
        }
    }

    const addTooltip = () => {
        if (tooltip) {
            return (<span className='tooltip label__tooltip tooltip_left tooltip_bottom' data-text={tooltip}></span>)
        }
    }

    const labelClass = inputError ? 'label error' : 'label';
    return (
        <label className={labelClass}>
            <input type={type} className={inputClass} name={name}
                onChange={handleChange} onBlur={handleBlur} onFocus={removeError}
                defaultValue={defaultValue}
                ref={ref}/>
            <div className='label__line'></div>
            <span className='label__name'>{label}</span>
            <p className='text label__message'>{inputError ? (name === 'passwordRepeat' ? 'Пароли должны совпадать' : 'Неверно заполнено поле') : ''}</p>
            {addTooltip()}
        </label>
    )
})
