import { DataType } from 'sequelize-typescript'
import { ModelAttributes, Model } from 'sequelize'

interface Reply {
    id: number
    text: string
    userId: number
    topicId: number
    commentId: number
}

export const replyModel: ModelAttributes<Model, Reply> = {
    id: {
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    text: {
        type: DataType.STRING,
        allowNull: false,
    },
    userId: {
        type: DataType.INTEGER,
        allowNull: false,
    },
    topicId: {
        type: DataType.INTEGER,
        allowNull: false,
    },
    commentId: {
        type: DataType.INTEGER,
        allowNull: false,
    },
}
