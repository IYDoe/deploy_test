import { createSelector } from '@reduxjs/toolkit'
import { RootState } from '../store'

const selectForum = (state: RootState) => state.forum

export const selectTopics = createSelector(
    [ selectForum ],
    forum => forum.topics || []
)