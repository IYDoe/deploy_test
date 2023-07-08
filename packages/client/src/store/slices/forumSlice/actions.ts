import { createAsyncThunk } from '@reduxjs/toolkit'
import { request } from '../../../utils/request'
import { Urls } from '../../../utils/api'

export const createTopic = createAsyncThunk(
    'create_topic',
    async (data: { text: string }) => {
        const { topics } = Urls
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ data }),
        }

        const response = await request(topics, options)

        if (response.ok) {
            return await response.json()
        } else {
            throw new Error('topics create failed')
        }
    }
)

export const getTopics = createAsyncThunk('get_topics', async () => {
    const { topics } = Urls
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    }
    const response = await request(topics, options)

    if (response.ok) {
        return await response.json()
    } else {
        throw new Error('topics get failed')
    }
})

export const getTopicById = createAsyncThunk(
    'get_topic_by_id',
    async (data: { id: number }) => {
        const { topics } = Urls
        const options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        }
        const response = await request(`${topics}/${data.id}`, options)

        if (response.ok) {
            return await response.json()
        } else {
            throw new Error('topics get failed')
        }
    }
)

export const updateTopic = createAsyncThunk(
    'update_topic',
    async (data: { id: number; text: string }) => {
        const { topics } = Urls
        const options = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ text: data.text }),
        }
        const response = await request(`${topics}/${data.id}`, options)

        if (response.ok) {
            return await response.json()
        } else {
            throw new Error('topics get failed')
        }
    }
)

export const deleteTopic = createAsyncThunk(
    'delete_topic',
    async (data: { id: number }) => {
        const { topics } = Urls
        const options = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        }
        const response = await request(`${topics}/${data.id}`, options)

        if (response.ok) {
            return await response.json()
        } else {
            throw new Error('topics get failed')
        }
    }
)

// Комментарии

export const createComment = createAsyncThunk(
    'create_comment',
    async (data: {
        text: string
        userId: number
        topicId: number
        replyId?: number
    }) => {
        const { comments } = Urls
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ data }),
        }

        const response = await request(comments, options)

        if (response.ok) {
            return await response.json()
        } else {
            throw new Error('comment create failed')
        }
    }
)

export const getCommentsByTopic = createAsyncThunk(
    'get_comment_by_topic',
    async (data: { topicId: number }) => {
        const { comments } = Urls
        const options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        }
        const response = await request(`${comments}/${data.topicId}`, options)

        if (response.ok) {
            return await response.json()
        } else {
            throw new Error('comment get failed')
        }
    }
)

export const getRepliesByComment = createAsyncThunk(
    'get_reply_by_comment',
    async (data: { commentId: number }) => {
        const { comments } = Urls
        const options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        }
        const response = await request(`${comments}/${data.commentId}`, options)

        if (response.ok) {
            return await response.json()
        } else {
            throw new Error('comment get failed')
        }
    }
)
