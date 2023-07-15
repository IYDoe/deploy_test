import { Sequelize, SequelizeOptions } from 'sequelize-typescript'
import { userThemeModel } from './models/userThemeModel'
import { userModel } from './models/userModel'
import { topicModel } from './models/topicModel'
import { commentModel } from './models/commentModel'
import { replyModel } from './models/replyModel'
import { reactionModel } from './models/reactionModel'

const {
    POSTGRES_USER,
    POSTGRES_PASSWORD,
    POSTGRES_DB,
    POSTGRES_PORT,
    POSTGRES_HOST,
} = process.env

const sequelizeOptions: SequelizeOptions = {
    username: POSTGRES_USER,
    host: POSTGRES_HOST,
    database: POSTGRES_DB,
    password: POSTGRES_PASSWORD,
    port: Number(POSTGRES_PORT),
    dialect: 'postgres',
}

export const sequelize = new Sequelize(sequelizeOptions)

export const UserTheme = sequelize.define('UserTheme', userThemeModel, {
    timestamps: false,
})

export const User = sequelize.define('User', userModel, {
    timestamps: false,
    indexes: [
        {
            unique: true,
            fields: [ 'login' ],
        },
    ],
})

export const Topic = sequelize.define('Topic', topicModel, {
    freezeTableName: true,
})

export const Comment = sequelize.define('Comment', commentModel, {
    freezeTableName: true,
})

export const Reply = sequelize.define('Reply', replyModel, {
    freezeTableName: true,
})

export const Reaction = sequelize.define('Reaction', reactionModel, {
    freezeTableName: true,
})

User.hasMany(Topic)
User.hasMany(Comment)

Topic.belongsTo(User)
Topic.hasMany(Comment)

Comment.belongsTo(Topic)
Comment.belongsTo(Topic)
Comment.hasMany(Reply)
Comment.hasMany(Reaction)

Reply.belongsTo(Comment)
Reaction.belongsTo(Comment)

UserTheme.belongsTo(User, {
    onDelete: 'CASCADE',
    foreignKey: 'userId',
})

export async function dbConnect() {
    try {
        await sequelize.authenticate()
        await sequelize.sync()

        console.log('Connection has been established successfully.')
    } catch (error) {
        console.error('Unable to connect to the database:', error)
    }
}
