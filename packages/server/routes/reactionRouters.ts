import express, { Express } from 'express'
import { createReaction } from '../controllers/reactionController'

export function reactionRouters(app: Express) {
    app.get('/reaction', express.json(), createReaction)
}
