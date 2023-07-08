import { Reaction } from '../db'
import { BaseRESTService } from './BaseRESTService'

export class ReactionService implements BaseRESTService {
    static async create(type: string, userId: number, commentId: number) {
        return await Reaction.create({ type, userId, commentId })
    }
}
