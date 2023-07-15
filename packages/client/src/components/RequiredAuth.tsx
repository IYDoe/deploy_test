import { useAuthorization } from '../hooks/useAuthorization';
import { Navigate, useLocation } from 'react-router-dom';
import { ReactElement } from 'react';
import { Paths } from '../utils/paths';

export function RequiredAuth({ children }: {children: ReactElement}) {
    const { isAuth } = useAuthorization()
    const location = useLocation()

    if (isAuth) {
        return children;
    }

    return <Navigate to={Paths.login} state={{ from: location }}/>
}
