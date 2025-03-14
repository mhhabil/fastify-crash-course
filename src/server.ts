// const fastify = require('fastify')({ logger: true })
import Fastify, { FastifyInstance } from 'fastify'
const fastify = Fastify({
    logger: true
})
fastify.register(require('fastify-swagger'), {
  exposeRoute: true,
  routePrefix: '/docs',
  swagger: {
    info: { title: 'fastify-api' },
  },
})
fastify.register(require('./routes/items'))

const PORT = 5002

const start = async () => {
  try {
    await fastify.listen(PORT)
  } catch (error) {
    fastify.log.error(error)
    console.log(error)
    process.exit(1)
  }
}

start()