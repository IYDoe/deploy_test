import React, { FC } from 'react'
import { useNavigate } from 'react-router-dom'

interface ErrorPageProps {
    title: string
    text?: string
}

export const ErrorPage: FC<ErrorPageProps> = ({ title, text }) => {
    const navigate = useNavigate()

    const handleBack = () => {
        navigate(-1)
    }

    return (
        <main className="main">
            <div className="shape">
                <div className="shape__wrapper">
                    <h1 className="title title_error">{title}</h1>
                    <p className="text text_error">{text}</p>
                    <button className="button" onClick={handleBack}>
                        Назад
                    </button>
                </div>
            </div>
        </main>
    )
}
