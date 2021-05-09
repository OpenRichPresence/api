import 'reflect-metadata'
import './setup'
import { buildSchema } from 'type-graphql'
import { ApolloServer } from 'apollo-server'
import Logger from '@bwatton/logger'
import { createConnection } from 'typeorm'

const PORT = process.env.PORT || 4000
const DEVMODE = process.env.NODE_ENV !== 'production'
const logger = new Logger('ORP')

;(async() => {
  logger.info('Connecting to DB...')
  await createConnection()
  logger.info('  - Done.')

  logger.info('Building GQL schema...')
  const schema = await buildSchema({
    resolvers: [__dirname + '/resolvers/**/*.ts'],
  })
  logger.info('  - Done.')

  logger.info('Starting server...')
  const server = new ApolloServer({
    schema,
    playground: DEVMODE,
  })

  const { url } = await server.listen(PORT)
  logger.info(`Server is running at ${url}`)
})()
