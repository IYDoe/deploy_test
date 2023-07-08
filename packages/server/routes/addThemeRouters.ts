import express, { Express } from 'express'
import { ThemeService } from '../services/ThemeService';

export function addThemeRouters(app: Express) {
    app.post('/local/theme_set', express.json(), async (req, res) => {
        try {
            const { isLightTheme, userId } = req.body.data
            const themeData = await ThemeService.find(userId)
    
            if (themeData?.dataValues.id) {
                ThemeService.update(isLightTheme, userId)
            } else {
                ThemeService.create(isLightTheme, userId)
            }
    
            res.send('ok')
        } catch {
            res.send('fail')
        }
    })

    app.post('/local/theme_get', express.json(), async (req, res) => {
        try {
            const { userId } = req.body.data
            const themeData = await ThemeService.find(userId)
            res.send(themeData ? themeData : null)
        } catch {
            res.send(null);
        }
    })
}
