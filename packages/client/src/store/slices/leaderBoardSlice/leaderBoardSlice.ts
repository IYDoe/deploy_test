import { createSlice } from '@reduxjs/toolkit'
import { addUser, getLeaderboards, getTeamLeaderboard } from './actions';
import { ParticipantData } from '../../../interfaces';

export interface LeaderBoard {
    data: ParticipantData[],
    ratingFieldName: string
    cursor: number | null
    limit: number | null,
    isLoading: boolean,
    error: string
}

const initialState: LeaderBoard = {
    data: [],
    ratingFieldName: '',
    cursor: null,
    limit: null,
    isLoading: false,
    error: ''
}

const leaderBoardSlice = createSlice({
    name: 'leaderBoard',
    initialState,
    reducers: {},
    extraReducers: {
        [addUser.fulfilled.type]: (state: LeaderBoard) => {
            state.isLoading = false;
            state.error = '';
        },
        [addUser.pending.type]: (state: LeaderBoard) => {
            state.isLoading = true;
            state.error = '';
        },
        [addUser.rejected.type]: (state: LeaderBoard, action) => {
            state.isLoading = false;
            state.error = action.error.message;
        },

        [getLeaderboards.fulfilled.type]: (state: LeaderBoard, action) => {
            state.isLoading = false;
            state.error = '';
            state.data = action.payload;
        },
        [getLeaderboards.pending.type]: (state: LeaderBoard) => {
            state.isLoading = true;
            state.error = '';
        },
        [getLeaderboards.rejected.type]: (state: LeaderBoard, action) => {
            state.isLoading = false;
            state.error = action.error.message;
        },

        [getTeamLeaderboard.fulfilled.type]: (state: LeaderBoard, action) => {
            state.isLoading = false;
            state.error = '';
            state.data = action.payload;
        },
        [getTeamLeaderboard.pending.type]: (state: LeaderBoard) => {
            state.isLoading = true;
            state.error = '';
        },
        [getTeamLeaderboard.rejected.type]: (state: LeaderBoard, action) => {
            state.isLoading = false;
            state.error = action.error.message;
        },
    }
})

export const leaderBoardReducer = leaderBoardSlice.reducer
