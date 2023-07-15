import React from 'react'
import { useNavigate } from 'react-router-dom'
import { BackIcon } from '../assets/icons/Back'
import { ButtonBackProps } from '../interfaces'

export const ButtonBack = ({ path }: ButtonBackProps) => {
    const navigate = useNavigate()

    const handleBack = () => {
        navigate(path)
    }

    return (
        <button className="shape__back" onClick={handleBack}>
            <BackIcon />
        </button>
    )
}
