import React from 'react'
import { useNavigate } from 'react-router-dom'
import { BackIcon } from '../assets/icons/Back'

export const ButtonBack = () => {
    const navigate = useNavigate()

    const handleBack = () => {
        navigate(-1)
    }

    return (
        <button className="shape__back" onClick={handleBack}>
            <BackIcon />
        </button>
    )
}
