import { createConsola } from 'consola'
import type { H3Error } from 'h3'

const logger = createConsola({
  reporters: [
    {
      log(logObj) {
        console.log(JSON.stringify({
          tag: logObj.tag,
          timestamp: logObj.date.getTime(),
          level: logObj.level,
          ...logObj.args[0],
        }))
      },
    },
  ],
})

const errorLogger = createConsola({
  reporters: [
    {
      log(logObj) {
        const error = logObj.args[0] as H3Error
        const cause = typeof error.cause === 'object' ? error.cause : { message: error.cause }

        console.log(JSON.stringify({
          tag: logObj.tag,
          timestamp: logObj.date.getTime(),
          level: logObj.level,
          ...cause,
        }))
      },
    },
  ],
})

export default defineNitroPlugin((nitroApp) => {
  nitroApp.hooks.hook('request', (event) => {
    event.context.timestamp = Date.now()
    logger.withTag('request').info({ method: event.method, path: event.path, timestamp: event.context.timestamp })
  })

  nitroApp.hooks.hook('afterResponse', (event) => {
    logger.withTag('response').info({ method: event.method, path: event.path, duration: `${Date.now() - event.context.timestamp} ms` })
  })

  nitroApp.hooks.hook('error', (event) => {
    errorLogger.withTag('error').error(event)
  })
})
