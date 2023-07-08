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
import { userReducer } from './src/store/slices/userSlice/userSlice';

export async function render(url: string) {
    const [ pathname ] = url.split('?')
    const currentRoute = routes.find(route => pathname === route.path)
    const store = configureStore({
        reducer: {
            user: userReducer,
            leaderBoard: leaderBoardReducer,
            forum: forumReducer,
        }
    })

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

    return [ appHtml, preloadedState ]
}
