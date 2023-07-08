import React, { useEffect } from 'react'
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { saveTheme } from '../store/slices/userSlice/actions';
import { changeTheme } from '../store/slices/userSlice/userSlice';
import { useAuthorization } from '../hooks/useAuthorization';

export function ThemeButton() {
    const dispatch = useAppDispatch();
    const { isAuth } = useAuthorization()
    const isLightTheme = useAppSelector(state => state.user.isLightTheme);
    const userId = useAppSelector(state => state.user.innerId);

    const toggleTheme = () => {
        const newValue = !isLightTheme

        dispatch(changeTheme(newValue))

        if (isAuth && userId) {
            dispatch(saveTheme({ isLightTheme: newValue, userId }));
        }

        localStorage.setItem('lightTheme', String(newValue ? true : ''));
    }

    useEffect(() => {
        if (!isAuth) {
            const storageValue = Boolean(localStorage.getItem('lightTheme'));
            dispatch(changeTheme(storageValue))
        } else {
            dispatch(changeTheme(isLightTheme))
            localStorage.setItem('lightTheme', String(isLightTheme ? true : ''));
        }
    }, [])

    useEffect(() => {
        if (isLightTheme) {
            document.body.classList.add('light-theme');
        } else {
            document.body.classList.remove('light-theme');
        }
    }, [ isLightTheme ])

    return (
        <button className='round-button round-button_top' onClick={toggleTheme}>
            <img src={`/images/${ isLightTheme ? 'sun' : 'moon' }.svg`} alt="Сменить тему." />
        </button>
    )
}
