import express, { Express } from 'express'
import {
    createTopic,
    getTopics,
    getTopicById,
    updateTopic,
    deleteTopic,
} from '../controllers/topicController'

export function topicsRouters(app: Express) {
    app.post('/topics', express.json(), createTopic)
    app.get('/topics', express.json(), getTopics)
    app.get('/topics/:id', express.json(), getTopicById)
    app.put('/topics/:id', express.json(), updateTopic)
    app.delete('/topics/:id', express.json(), deleteTopic)
}
