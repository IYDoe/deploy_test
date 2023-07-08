import React, { JSX } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import { RequiredAuth } from './components/RequiredAuth';
import { routes, Routes as IRoutes } from './utils/routes';
import { ThemeButton } from './components/ThemeButton';
import { Paths } from './utils/paths';

export const App = () => {
    const location = useLocation()

    const makeProtected = (element: JSX.Element) => {
        return <RequiredAuth>{element}</RequiredAuth>
    }

    const addThemeBtn = (route: IRoutes) => {
        return <>{route.element} {route.path === Paths.game ? null : <ThemeButton />}</>
    }

    return (
        <Routes location={location}>
            {routes.map(route => (
                <Route
                    key={route.path}
                    path={route.path}
                    element={route.protected ?
                        makeProtected( addThemeBtn(route) ) :
                        addThemeBtn(route)}
                />
            ))}
        </Routes>
    )
}
