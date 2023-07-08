import { Comment } from '../db'
import { BaseRESTService } from './BaseRESTService'

export class CommentService implements BaseRESTService {
    static async createComment(
        text: string,
        userId: number,
        topicId: number,
        replyId?: number
    ) {
        return await Comment.create({ text, userId, topicId, replyId })
    }

    static async getCommentsByTopic(topicId: number) {
        return await Comment.findAll({ where: { topicId } })
    }

    static async getRepliesByComment(commentId: number) {
        return await Comment.findAll({ where: { replyId: commentId } })
    }
}
