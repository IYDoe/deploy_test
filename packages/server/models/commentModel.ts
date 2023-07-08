import { DataType } from 'sequelize-typescript'
import { ModelAttributes, Model } from 'sequelize'

interface Comment {
    id: number
    text: string
    userId: number
    topicId: number
    replyId: number
}

export const commentModel: ModelAttributes<Model, Comment> = {
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
    replyId: {
        type: DataType.INTEGER,
        allowNull: true,
    },
}
