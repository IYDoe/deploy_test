import React from 'react'
import ReactDOM from 'react-dom/client'
import { ErrorBoundary } from './components/ErrorBoundary'
import { App } from './App'
import { BrowserRouter } from 'react-router-dom'
import { store } from './store/store'
import { Provider } from 'react-redux'
import './styles/style.scss'

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker
            .register('/serviceWorker.ts')
            .then(() => {
                console.log('Service Worker registered')
            })
            .catch(error => {
                console.error('Error registering Service Worker:', error)
            })
    })
}

ReactDOM.hydrateRoot(
    document.getElementById('root') as HTMLElement,
    <React.StrictMode>
        <ErrorBoundary>
            <BrowserRouter>
                <Provider store={store}>
                    <App />
                </Provider>
            </BrowserRouter>
        </ErrorBoundary>
    </React.StrictMode>
)
