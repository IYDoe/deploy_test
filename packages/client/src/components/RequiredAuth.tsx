import { useAuthorization } from '../hooks/useAuthorization';
import { Navigate, useLocation } from 'react-router-dom';
import { ReactElement, useEffect, useState } from 'react';
import { Paths } from '../utils/paths';
import { Loader } from './Loader';
import { PayloadAction } from '@reduxjs/toolkit';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { changeTheme } from '../store/slices/userSlice/userSlice';
import { getUserInfo, saveInnerUser, getTheme } from '../store/slices/userSlice/actions';
import { UserData } from '../types/user';

export function RequiredAuth({ children }: {children: ReactElement}) {
    const [ loading, setLoading ] = useState(true)
    const { isAuth } = useAuthorization()
    const location = useLocation()
    const dispatch = useAppDispatch()
    const userData = useAppSelector((state) => state.user.userData)
    const { login } = userData;

    const setTheme = async (login: string) => {
        const innerUser = await dispatch(saveInnerUser({ login }))
        if (innerUser.payload === undefined) {
            return;
        }

        const { userId } = innerUser.payload
        const theme = await dispatch(getTheme({ userId }))

        if (theme.payload === undefined) {
            return;
        }

        const { isLightTheme } = theme.payload

        dispatch(changeTheme(isLightTheme))
    }

    useEffect(() => {
        if (isAuth && login) {
            setTheme(login)
        }
    }, [ isAuth, login ])

    if (isAuth) {
        return children;
    } else {
        dispatch(getUserInfo()).then(async (res: PayloadAction<unknown>) => {
            if (res.payload !== undefined) {
                const { login } = res.payload as UserData
                setTheme(login)
            }

            setLoading(false)
        })

        if (loading) {
            return <main className='main'><Loader /></main>
        }
    }

    return <Navigate to={Paths.login} state={{ from: location }}/>
}
