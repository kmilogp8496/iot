import { desc, lte } from 'drizzle-orm'
import { tables } from '~~/server/utils/drizzle'

export default eventHandler(async (event) => {
  const db = useDrizzle()
  // Fetch all metrics
  const allMetrics = await db.select().from(tables.metrics).orderBy(desc(tables.metrics.timestamp))

  // Format metrics in Prometheus exposition format
  const lines: string[] = []
  for (const metric of allMetrics) {
    let labels = ''
    if (metric.labels) {
      try {
        const labelObj = JSON.parse(metric.labels)
        const labelPairs = Object.entries(labelObj)
          .map(([k, v]) => `${k}="${String(v).replace(/"/g, '"')}"`)
          .join(',')
        if (labelPairs) {
          labels = `{${labelPairs}}`
        }
      }
      catch {
        // ignore label parse errors
      }
    }
    // Prometheus expects timestamp in milliseconds
    lines.push(`${metric.metricName}${labels} ${metric.value} ${metric.timestamp}`)
  }

  const lastTimestamp = allMetrics[0]?.timestamp

  if (lastTimestamp)
    event.waitUntil(db.delete(tables.metrics).where(lte(tables.metrics.timestamp, lastTimestamp)))

  return lines.join('\n')
})
