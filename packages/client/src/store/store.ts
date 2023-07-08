import { configureStore } from '@reduxjs/toolkit'
import { userReducer, } from './slices/userSlice/userSlice'
import { leaderBoardReducer } from './slices/leaderBoardSlice/leaderBoardSlice'
import { forumReducer } from './slices/forumSlice/forumSlice'
import { gameReducer } from './slices/gameSlice/gameSlice'

declare global {
    interface Window {
        __PRELOADED_STATE__?: Record<string, unknown>
    }
}

export const store = configureStore({
    reducer: {
        user: userReducer,
        leaderBoard: leaderBoardReducer,
        forum: forumReducer,
        game: gameReducer,
    },
    preloadedState: window.__PRELOADED_STATE__
})

delete window.__PRELOADED_STATE__

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
