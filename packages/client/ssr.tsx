import React from 'react'
import { App } from './src/App'
import { renderToString } from 'react-dom/server'
import { Provider } from 'react-redux'
import { StaticRouter } from 'react-router-dom/server';
import { ErrorBoundary } from '../client/src/components/ErrorBoundary'
import { routes } from './src/utils/routes';
import { configureStore } from '@reduxjs/toolkit';
import { forumReducer } from './src/store/slices/forumSlice/forumSlice';
import { leaderBoardReducer } from './src/store/slices/leaderBoardSlice/leaderBoardSlice';
import { changeTheme, userReducer } from './src/store/slices/userSlice/userSlice';
import { getTheme, getUserInfo, saveInnerUser } from './src/store/slices/userSlice/actions';

export async function render(url: string, authCookie: string) {
    let isLightTheme = false;

    const [ pathname ] = url.split('?')
    const currentRoute = routes.find(route => pathname === route.path)
    const store = configureStore({
        reducer: {
            user: userReducer,
            leaderBoard: leaderBoardReducer,
            forum: forumReducer,
        }
    })

    const userDataRes = await store.dispatch(getUserInfo(authCookie))

    const setTheme = async () => {
        const { login } = userDataRes.payload
        const innerUser = await store.dispatch(saveInnerUser({ login }))

        if (innerUser.payload === undefined) {
            return;
        }

        const { userId } = innerUser.payload
        const theme = await store.dispatch(getTheme({ userId }))

        if (theme.payload === undefined) {
            return;
        }

        isLightTheme = theme.payload.isLightTheme

        store.dispatch(changeTheme(isLightTheme))
    }

    if (userDataRes.payload !== undefined) {
        await setTheme()
    }

    if (currentRoute && currentRoute.loader) {
        await currentRoute.loader(store.dispatch);
    }

    const appHtml = renderToString(
        <React.StrictMode>
            <ErrorBoundary>
                <StaticRouter location={url}>
                    <Provider store={store}>
                        <App />
                    </Provider>
                </StaticRouter>
            </ErrorBoundary>
        </React.StrictMode>
    )

    const preloadedState = store.getState();

    return [ appHtml, preloadedState, isLightTheme ]
}
