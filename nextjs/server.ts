// server.js
import { createServer } from 'http'
import next from 'next'
import { nextJsApiRouter } from './connect-nextjs-adapter.js'
// const { nextJsApiRouter } = require('./connect-nextjs-adapter.js')
import routes from './connect.js'
// import router from './connect.js'

const dev = process.env.NODE_ENV !== 'production'
const hostname = 'localhost'
const port = 8080
// when using middleware `hostname` and `port` must be provided below
const app = next({ dev, hostname, port })

const fallback = app.getRequestHandler()
const apiRoute = nextJsApiRouter({
    routes,
    fallback,
})

app.prepare().then(() => {
    // @ts-ignore
    createServer(apiRoute.handler)
        .once('error', (err: unknown) => {
            console.error(err)
            process.exit(1)
        })
        .listen(port, () => {
            console.log(`> Ready on http://${hostname}:${port}`)
        })
})
