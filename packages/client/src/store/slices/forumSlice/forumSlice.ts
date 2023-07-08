import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import {
    createComment,
    createTopic,
    deleteTopic,
    getTopicById,
    getTopics,
    updateTopic,
    getRepliesByComment,
    getCommentsByTopic,
} from './actions'

export type Topic = {
    text: string
    id: number
    userId: number
    createdAt: Date
    updatedAt: Date
}

export type Comment = {
    id: number
    userId: number
}
export interface Forum {
    topic: Topic
    topics: Topic[]
    comment: Comment
    comments: Comment[]
    isLoading: boolean
    error: string
}

const initialState: Forum = {
    topic: {
        userId: 0,
        id: 0,
        text: '',
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    topics: [],
    comment: {
        userId: 0,
        id: 0,
    },
    comments: [],
    isLoading: false,
    error: '',
}

const forumSlice = createSlice({
    name: 'forum',
    initialState,
    reducers: {},
    extraReducers: {
        [createTopic.fulfilled.type]: (
            state: Forum,
            action: PayloadAction<Topic>
        ) => {
            state.isLoading = false
            state.topic = action.payload
            state.topics.push(action.payload)
            state.error = ''
        },
        [createTopic.pending.type]: (state: Forum) => {
            state.isLoading = true
            state.error = ''
        },
        [createTopic.rejected.type]: (state: Forum, action) => {
            state.isLoading = false
            state.error = action.error.message
        },

        [getTopics.fulfilled.type]: (
            state: Forum,
            action: PayloadAction<Topic[]>
        ) => {
            state.isLoading = false
            state.topics = action.payload
            state.error = ''
        },
        [getTopics.pending.type]: (state: Forum) => {
            state.isLoading = true
            state.error = ''
        },
        [getTopics.rejected.type]: (state: Forum, action) => {
            state.isLoading = false
            state.error = action.error.message
        },

        [getTopicById.fulfilled.type]: (
            state: Forum,
            action: PayloadAction<Topic>
        ) => {
            state.isLoading = false
            state.topic = action.payload
            state.error = ''
        },
        [getTopicById.pending.type]: (state: Forum) => {
            state.isLoading = true
            state.error = ''
        },
        [getTopicById.rejected.type]: (state: Forum, action) => {
            state.isLoading = false
            state.error = action.error.message
        },

        [updateTopic.fulfilled.type]: (
            state: Forum,
            action: PayloadAction<Topic>
        ) => {
            state.isLoading = false
            state.topic = action.payload
            state.error = ''
        },
        [updateTopic.pending.type]: (state: Forum) => {
            state.isLoading = true
            state.error = ''
        },
        [updateTopic.rejected.type]: (state: Forum, action) => {
            state.isLoading = false
            state.error = action.error.message
        },

        [deleteTopic.fulfilled.type]: (
            state: Forum,
            action: PayloadAction<Topic>
        ) => {
            state.isLoading = false
            state.topic = action.payload
            state.error = ''
        },
        [deleteTopic.pending.type]: (state: Forum) => {
            state.isLoading = true
            state.error = ''
        },
        [deleteTopic.rejected.type]: (state: Forum, action) => {
            state.isLoading = false
            state.error = action.error.message
        },

        // Комментарии

        [createComment.fulfilled.type]: (
            state: Forum,
            action: PayloadAction<Comment>
        ) => {
            state.isLoading = false
            state.comment = action.payload
            state.comments.push(action.payload)
            state.error = ''
        },
        [createComment.pending.type]: (state: Forum) => {
            state.isLoading = true
            state.error = ''
        },
        [createComment.rejected.type]: (state: Forum, action) => {
            state.isLoading = false
            state.error = action.error.message
        },

        [getCommentsByTopic.fulfilled.type]: (
            state: Forum,
            action: PayloadAction<Comment[]>
        ) => {
            state.isLoading = false
            state.comments = action.payload
            state.error = ''
        },
        [getCommentsByTopic.pending.type]: (state: Forum) => {
            state.isLoading = true
            state.error = ''
        },
        [getCommentsByTopic.rejected.type]: (state: Forum, action) => {
            state.isLoading = false
            state.error = action.error.message
        },

        [getRepliesByComment.fulfilled.type]: (
            state: Forum,
            action: PayloadAction<Comment>
        ) => {
            state.isLoading = false
            state.comment = action.payload
            state.error = ''
        },
        [getRepliesByComment.pending.type]: (state: Forum) => {
            state.isLoading = true
            state.error = ''
        },
        [getRepliesByComment.rejected.type]: (state: Forum, action) => {
            state.isLoading = false
            state.error = action.error.message
        },
    },
})

export const forumReducer = forumSlice.reducer
