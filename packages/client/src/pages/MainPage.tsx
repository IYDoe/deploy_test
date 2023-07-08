import React, { useRef, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '../components/Button'
import { Paths } from '../utils/paths'
import { gsap } from 'gsap'
import { getUserInfo, oAuthYandex } from '../store/slices/userSlice/actions';
import { useAppDispatch } from '../store/hooks';

export const MainPage = () => {
    const description = useRef(null)
    const title = useRef(null)
    const [ isActiveButton, setIsActiveButton ] = useState(false)
    const navigate = useNavigate()
    const dispatch = useAppDispatch();

    const handleStartButton = () => {
        navigate(Paths.startScreen)
    }

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get('code');
        if (code) {
            dispatch(oAuthYandex(code)).then(response => {
                if (response.payload !== undefined) {
                    dispatch(getUserInfo()).then(res => {
                        if (res.payload !== undefined) {
                            navigate(Paths.startScreen);
                        } else {
                            navigate(Paths.login);
                        }
                    })
                } else {
                    navigate(Paths.login);
                }
            })
        }

        const context = gsap.context(() => {
            gsap.to([ description.current, title.current ], {
                startAt: {
                    y: '80vh'
                },
                duration: 1,
                y: '-=78vh',
                onComplete: () => setIsActiveButton(true),
                repeat: 0,
                overwrite: true,
            })
        })

        return () => context.revert()
    }, [])

    return (
        <main className='main'>
            <img className="main__logo" src="/images/logo.png" alt="Логотип." />
            <p className='text__main' ref={description}>
                Томатор,
                злой повелитель галактической империи
                крутонианцев, имел хобби —
                коллекционировал уникальные формы жизни. Однажды
                он решил пополнить свою коллекцию экземплярами с планеты Земля,
                для чего похитил трёх викингов. Они не растерялись и предприняли
                попытку побега из «зверинца», в результате чего очутились в неизвестном
                им пространстве и времени. Теперь они должны найти дорогу домой,
                в родную деревню, и расправиться с тем, кто заставил их бегать как
                угорелых через пространство и время. Помоги героям вернуться к родным
                или отправиться в Вальхаллу!
            </p>
            {isActiveButton && <Button
                onClick={handleStartButton}
                type='button'
                text='Начать'
                buttonClass='button__start' />}
        </main>
    )
}
