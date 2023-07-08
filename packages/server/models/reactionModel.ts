import { DataType } from 'sequelize-typescript'
import { ModelAttributes, Model } from 'sequelize'

interface Reaction {
    id: number
    type: string
    userId: number
    commentId: number
}

export const reactionModel: ModelAttributes<Model, Reaction> = {
    id: {
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    type: {
        type: DataType.STRING,
        allowNull: false,
    },
    userId: {
        type: DataType.INTEGER,
        allowNull: false,
    },
    commentId: {
        type: DataType.INTEGER,
        allowNull: false,
    },
}
