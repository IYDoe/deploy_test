import { createAsyncThunk } from '@reduxjs/toolkit';
import { ParticipantProps } from '../../../interfaces';
import { Urls } from '../../../utils/api';
import { request } from '../../../utils/request';

type leaderboardAddUserData = {
    data: ParticipantProps,
    teamName: string,
    ratingFieldName: string
}
type leaderboardGetData = {
    ratingFieldName: string,
    cursor: number,
    limit: number
}

export const addUser = createAsyncThunk('leaderboard/add_user', async (data: leaderboardAddUserData) => {
    const { baseUrl, leaderBoard } = Urls;
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
        credentials: 'include'
    }
    const response = await request(`${baseUrl}${leaderBoard}`, options);
    if (!response.ok) {
        await response.json().then(result => {
            throw new Error(result.reason)
        })
    }
})

export const getLeaderboards = createAsyncThunk('leaderboard/all', async (data: leaderboardGetData) => {
    const { baseUrl, leaderBoards } = Urls;
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
        credentials: 'include'
    }
    const response = await request(`${baseUrl}${leaderBoards}`, options);
    if (response.ok) {
        return await response.json()
    } else {
        throw new Error('Get all leaderboards request failed')
    }
})

export const getTeamLeaderboard = createAsyncThunk('leaderboard/all', async ({ data, teamName }: {data: leaderboardGetData, teamName: string}) => {
    const { baseUrl, leaderBoard } = Urls;
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
        credentials: 'include'
    }
    const response = await request(`${baseUrl}${leaderBoard}/${teamName}`, options);
    if (response.ok) {
        return await response.json()
    } else {
        throw new Error('Get team leaderboard request failed')
    }
})
