import config from '@/payload.config'
import { getPayload } from 'payload'

async function pruneVersions() {
  console.log('Initializing Payload...')
  const payload = await getPayload({ config })
  const adapter = payload.db as any

  console.log('Ensuring compound indexes on version collections...')
  if (adapter.versions) {
    for (const [slug, model] of Object.entries(adapter.versions as Record<string, any>)) {
      try {
        await model.collection.createIndex(
          { parent: 1, updatedAt: -1 },
          { background: true, name: 'parent_1_updatedAt_-1' },
        )
        console.log(`✓ Compound index ensured for versions of collection: "${slug}"`)
      } catch (err) {
        console.error(`✗ Failed to create index for collection "${slug}":`, err)
      }
    }
  }

  // Prune pages versions if bloated
  console.log('\nChecking for bloated versions on pages collection...')
  const pagesModel = adapter.versions?.['pages']
  if (pagesModel) {
    const counts = await pagesModel.collection
      .aggregate([
        { $group: { _id: '$parent', count: { $sum: 1 } } },
        { $match: { count: { $gt: 20 } } },
      ])
      .toArray()

    console.log(`Found ${counts.length} pages with more than 20 versions.`)

    for (const item of counts) {
      const parentId = item._id
      const excess = item.count - 20
      console.log(`Page parent ${parentId} has ${item.count} versions. Pruning ${excess} oldest versions...`)

      // Find the 21st most recent version's updatedAt timestamp
      const docs = await pagesModel.collection
        .find({ parent: parentId })
        .sort({ updatedAt: -1 })
        .skip(20)
        .limit(1)
        .toArray()

      if (docs.length > 0) {
        const cutoffDate = docs[0].updatedAt
        const deleteResult = await pagesModel.collection.deleteMany({
          parent: parentId,
          updatedAt: { $lte: cutoffDate },
        })
        console.log(`✓ Deleted ${deleteResult.deletedCount} old versions for page parent ${parentId}.`)
      }
    }
  }

  console.log('\nPrune and index routine completed!')
  process.exit(0)
}

pruneVersions().catch((err) => {
  console.error('Error during pruneVersions:', err)
  process.exit(1)
})

