import express, { Express } from 'express'
import {
    createComment,
    getCommentsByTopic,
    getRepliesByComment,
} from '../controllers/commentController'

export function commentRouters(app: Express) {
    app.get('/comments', express.json(), createComment)
    app.post('/topics/:topicId/comments', express.json(), getCommentsByTopic)
    app.get('/comments/:commentId/replies', express.json(), getRepliesByComment)
}
