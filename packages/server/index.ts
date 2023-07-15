import dotenv from 'dotenv'
import cors from 'cors'
import https from 'https'
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
    let key, cert, ca;

    if (process.env.DOCKER_BUILD) {
        key = fs.readFileSync(
            path.resolve('../etc/letsencrypt/live/game-machine.ya-praktikum.tech', 'privkey.key')
        )
        cert = fs.readFileSync(
            path.resolve('../etc/letsencrypt/live/game-machine.ya-praktikum.tech', 'cert.crt')
        )
        ca = fs.readFileSync(
            path.resolve('../etc/letsencrypt/live/game-machine.ya-praktikum.tech', 'chain.pem')
        )
    }

    const app = express()

    const corsOptions = {
        credentials: true,
        origin: [ 'https://ya-praktikum.tech' ]
    };

    app.use(cors(corsOptions))

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
    } else if (!process.env.DOCKER_BUILD) {
        app.use('/assets', express.static(path.resolve(distPath, 'assets')))
        app.use('/images', express.static(path.resolve(distPath, 'images')))
        app.use('/fonts', express.static(path.resolve(distPath, 'fonts')))
    }

    app.use('/api/v2', createProxyMiddleware({
        changeOrigin: true,
        cookieDomainRewrite: { '*': '' },
        target: 'https://ya-praktikum.tech',
    }))

    addThemeRouters(app)
    addUserRouters(app)
    topicsRouters(app)
    commentRouters(app)
    replyRouters(app)
    reactionRouters(app)

    app.use('/.well-known/acme-challenge/a-WsBQSi0_LXbZj-SAvoBpd7k-31GhIchdfoml0qWZ0', (_, res) => {
        res.status(200).set({ 'Content-Type': 'text/html' }).end('a-WsBQSi0_LXbZj-SAvoBpd7k-31GhIchdfoml0qWZ0.Q8qWLzxJ5s6w8MlCeVNgxISUdfjAZb1PLlwp7h_JNgE')
    })

    app.use('*', async (req, res, next) => {
        const url = req.originalUrl
        const authCookie = req.rawHeaders.find((e: string) => {
            const reg = new RegExp('authCookie');
            return reg.test(e);
        });

        try {
            let template: string

            if (isDev()) {
                template = fs.readFileSync(
                    path.resolve(srcPath, 'index.html'),
                    'utf-8'
                )
                template = await vite!.transformIndexHtml(url, template)
            } else {
                if (process.env.DOCKER_BUILD) {
                    template = fs.readFileSync(
                        path.resolve('/app/client', 'index.html'),
                        'utf-8'
                    )
                } else {
                    template = fs.readFileSync(
                        path.resolve(distPath, 'index.html'),
                        'utf-8'
                    )
                }
            }

            let render: (url: string, authCookie: string | undefined) => Promise<string>

            if (isDev()) {
                render = (
                    await vite!.ssrLoadModule(path.resolve(srcPath, 'ssr.tsx'))
                ).render
            } else {
                if (process.env.DOCKER_BUILD) {
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

            const [ appHtml, preloadedState, isLightTheme ] = await render(url, authCookie)

            if (isLightTheme) {
                template = template.replace('<body>', '<body class="light-theme">')
            }

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

    if (process.env.DOCKER_BUILD) {
        const httpsServer = https.createServer({ key, cert, ca }, app);

        httpsServer.listen(port, () => {
            console.log(`  ➜ 🎸 HTTPS Server is listening on port: ${port}`)
        })
    } else {
        app.listen(port, () => {
            console.log(`  ➜ 🎸 Server is listening on port: ${port}`)
        })
    }
}

dbConnect().then(() => {
    startServer()
})
