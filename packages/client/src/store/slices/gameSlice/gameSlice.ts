import { createSlice } from '@reduxjs/toolkit'

interface Game {
    deadPlayer: boolean,
    success: boolean,
    time: string | null,
}

const initialState: Game = {
    deadPlayer: false,
    success: false,
    time: null
}

const gameSlice = createSlice({
    name: 'game',
    initialState,
    reducers: {
        setFinishStatus: (state, { payload }) => {
            state.success = payload
        },
        setFinishTime: (state, { payload }) => {
            state.time = payload
        },
        setDeadPlayer: (state, { payload }) => {
            state.deadPlayer = payload
        },
    },
})

export const { setFinishStatus, setFinishTime, setDeadPlayer } = gameSlice.actions

export const gameReducer = gameSlice.reducer
