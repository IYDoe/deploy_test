import dotenv from 'dotenv'
import cors from 'cors'
import axios from 'axios'
import type { ViteDevServer } from 'vite'
import { createServer as createViteServer } from 'vite'
import { createProxyMiddleware } from 'http-proxy-middleware'
import { addThemeRouters } from './routes/addThemeRouters'
import { addUserRouters } from './routes/addUserRouters'
import { topicsRouters } from './routes/topicRouters'
import { commentRouters } from './routes/commentRouters'
import { replyRouters } from './routes/replyRouters'
import { reactionRouters } from './routes/reactionRouters'
import { dbConnect } from './db'

dotenv.config()

import express from 'express'
import * as fs from 'fs'
import * as path from 'path'

const isDev = () => process.env.NODE_ENV === 'development'

async function startServer() {
    let vite: ViteDevServer | undefined

    const app = express()

    app.use(cors())

    const port = Number(process.env.SERVER_PORT) || 3000
    const distPath = 'packages/client/dist'
    const srcPath = '../client/'

    if (isDev()) {
        vite = await createViteServer({
            server: { middlewareMode: true },
            root: srcPath,
            appType: 'custom',
        })

        app.use(vite.middlewares)
    } else {
        const needProxy = (url?: string) => {
            const dirs = [ 'assets', 'images', 'fonts' ]

            dirs.forEach(dir => {
                if (url) {
                    app.use(
                        `/${dir}`,
                        createProxyMiddleware({
                            target: `http://${url}`,
                            changeOrigin: true,
                        })
                    )
                } else {
                    app.use(
                        `/${dir}`,
                        express.static(path.resolve(distPath, dir))
                    )
                }
            })
        }

        needProxy(process.env.CLIENT_URL)
    }

    addThemeRouters(app)
    addUserRouters(app)
    topicsRouters(app)
    commentRouters(app)
    replyRouters(app)
    reactionRouters(app)

    app.use('*', async (req, res, next) => {
        const url = req.originalUrl

        try {
            let template: string

            if (isDev()) {
                template = fs.readFileSync(
                    path.resolve(srcPath, 'index.html'),
                    'utf-8'
                )
                template = await vite!.transformIndexHtml(url, template)
            } else {
                if (process.env.CLIENT_URL) {
                    const response = await axios.get(
                        `http://${process.env.CLIENT_URL}`
                    )

                    template = response.data
                } else {
                    template = fs.readFileSync(
                        path.resolve(distPath, 'index.html'),
                        'utf-8'
                    )
                }
            }

            let render: (url: string) => Promise<string>

            if (isDev()) {
                render = (
                    await vite!.ssrLoadModule(path.resolve(srcPath, 'ssr.tsx'))
                ).render
            } else {
                if (process.env.CLIENT_URL) {
                    render = (
                        await import(require.resolve('/app/ssr/client.cjs'))
                    ).render
                } else {
                    render = (
                        await import(
                            require.resolve('../../client/dist-ssr/client.cjs')
                        )
                    ).render
                }
            }

            const [ appHtml, preloadedState ] = await render(url)
            const html = template
                .replace('<!--ssr-outlet-->', appHtml)
                .replace(
                    '<!--preloaded-state-->',
                    `<script>window.__PRELOADED_STATE__ = ${JSON.stringify(
                        preloadedState
                    )}</script>`
                )

            res.status(200).set({ 'Content-Type': 'text/html' }).end(html)
        } catch (e) {
            if (isDev()) {
                vite!.ssrFixStacktrace(e as Error)
            }
            next(e)
        }
    })

    app.listen(port, () => {
        console.log(`  ➜ 🎸 Server is listening on port: ${port}`)
    })
}

dbConnect().then(() => {
    startServer()
})
