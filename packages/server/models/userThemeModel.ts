import { ModelAttributes, Model } from 'sequelize';
import { DataType } from 'sequelize-typescript';

interface UserTheme {
    id: number
    isLightTheme: boolean
    userId: number
}

export const userThemeModel: ModelAttributes<Model, UserTheme> = {
    id: {
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    isLightTheme: {
        type: DataType.BOOLEAN,
        defaultValue: false
    },
    userId: {
        type: DataType.INTEGER
    }
};
