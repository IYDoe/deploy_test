import { ModelAttributes, Model } from 'sequelize';
import { DataType } from 'sequelize-typescript';

interface User {
    id: number
    login: string
}

export const userModel: ModelAttributes<Model, User> = {
    id: {
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    login: {
        type: DataType.STRING,
    },
}
