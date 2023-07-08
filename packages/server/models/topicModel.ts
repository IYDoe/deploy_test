import { DataType } from 'sequelize-typescript'
import { ModelAttributes, Model } from 'sequelize'

interface Topic {
    id: number
    text: string
}

export const topicModel: ModelAttributes<Model, Topic> = {
    id: {
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    text: {
        type: DataType.STRING,
        allowNull: false,
    },
}
