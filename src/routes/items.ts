import { FastifyInstance} from "fastify";
import testQueue from "../controllers/items";


const Item = {
  type: 'object',
  properties: {
    id: { type: 'string' },
    name: { type: 'string' },
  },
}

const testQueueOpts: any = {
    schema: {
      response: {
        200: Item,
      },
    },
    handler: testQueue,
  }

  function itemRoutes(fastify: any, options: any, done: any) {
    fastify.get('/items/testqueue', testQueueOpts)

    done()
  }

export default itemRoutes
