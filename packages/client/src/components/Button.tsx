import React from 'react'
import { ButtonProps } from '../interfaces'

export function Button({ buttonClass, type, onClick, text }: ButtonProps) {
    return (
        <button className={'button ' + buttonClass} type={type} onClick={onClick}>
            {text}
        </button>
    )
}
