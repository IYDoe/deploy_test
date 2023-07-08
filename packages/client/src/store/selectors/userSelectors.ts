import { createSelector } from '@reduxjs/toolkit'
import { RootState } from '../store'

const selectUser = (state: RootState) => state.user

export const selectUserData = createSelector(
    [ selectUser ],
    user => user.userData
)

export const selectIsLoadingUser = createSelector(
    [ selectUser ],
    user => user.isLoading
)
