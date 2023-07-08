import { createSelector } from '@reduxjs/toolkit'
import { RootState } from '../store'

const selectLeaderboard = (state: RootState) => state.leaderBoard

export const selectLeaderboardData = createSelector(
    [ selectLeaderboard ],
    leaderboard => leaderboard.data
)

export const selectIsLoadingLeaderboard = createSelector(
    [ selectLeaderboard ],
    leaderboard => leaderboard.isLoading
)
