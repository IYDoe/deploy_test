import React, { useRef, useState, useEffect } from 'react'
import { gsap } from 'gsap'
import { useNavigate } from 'react-router-dom'
import { Paths } from '../utils/paths'
import { Button } from '../components/Button'
import { useAppSelector } from '../store/hooks'

export const EndScreenPage = () => {
    const titleRef = useRef(null)
    const [ isActiveButton, setIsActiveButton ] = useState(false)
    const navigate = useNavigate()
    const { success, time, deadPlayer } = useAppSelector((state) => state.game)

    const handleEndButton = () => {
        navigate(Paths.game)
    }

    useEffect(() => {
        const context = gsap.context(() => {
            gsap.to(titleRef.current, {
                startAt: {
                    y: '80vh'
                },
                duration: 1,
                y: '-=90vh',
                onComplete: () => setIsActiveButton(true),
                repeat: 0,
                overwrite: true,
            })
        })

        return () => context.revert()
    }, [])

    return (
        <main className='main'>
            <div className='end-game' ref={titleRef}>
                <h1 className='title__main title_centered' >
                    {success ? 'Поздравляем!' : 'Game over'}
                </h1>
                <br />
                {success &&
                <p className="text">
                    Уровень пройден за {time}
                </p>}

                {deadPlayer &&
                <p className="text">
                    Не все персонажи выжили
                </p>}
            </div>

            {isActiveButton && <Button
                onClick={handleEndButton}
                type='button'
                text={success ? 'Далее' : 'Начать с начала'}
                buttonClass='button__start' />}
        </main>
    )
}
