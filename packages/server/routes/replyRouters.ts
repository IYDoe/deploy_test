import express, { Express } from 'express'
import { createReply } from '../controllers/replyController'

export function replyRouters(app: Express) {
    app.get('/reply', express.json(), createReply)
}
