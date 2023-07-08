import { Reply } from '../db'
import { BaseRESTService } from './BaseRESTService'

export class ReplyService implements BaseRESTService {
    static async create(
        text: string,
        userId: number,
        topicId: number,
        commentId: number
    ) {
        return await Reply.create({ text, userId, topicId, commentId })
    }
}
