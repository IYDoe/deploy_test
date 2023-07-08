import express, { Express } from 'express'
import { UserService } from '../services/UserService';

export function addUserRouters(app: Express) {
    app.post('/local/user_set', express.json(), async (req, res) => {
        try {
            const { login } = req.body.data
            const user = await UserService.create(login);
            res.send({ userId: user[0].dataValues.id })
        } catch {
            res.send({ userId: null })
        }
    })

    app.post('/local/user_eidt', express.json(), async (req, res) => {
        try {
            const { login, id } = req.body.data
            const user = await UserService.update(login, id);
            res.send(user)
        } catch {
            res.send(null)
        }
    })
}
