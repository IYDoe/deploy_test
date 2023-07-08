import { Request, Response } from 'express'
import { ReactionService } from '../services/ReactionService'

export const createReaction = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const {
            type,
            userId,
            commentId,
        }: { type: string; userId: number; commentId: number } = req.body

        if (!type || !userId || !commentId) {
            res.status(400).json({ error: 'Missing required fields' })
            return
        }

        const reaction = await ReactionService.create(type, userId, commentId)
        res.status(201).json(reaction)
    } catch (error) {
        console.error('Error creating reaction:', error)
        res.status(500).json({ error: 'Failed to create reaction' })
    }
}
