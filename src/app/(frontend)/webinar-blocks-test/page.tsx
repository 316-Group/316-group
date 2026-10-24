import React from 'react'
import { FeaturedWebinarBlock } from '@/blocks/FeaturedWebinar/Component'
import { PastWebinarBlock } from '@/blocks/PastWebinar/Component'

export const dynamic = 'force-dynamic'

export default async function WebinarBlocksTestPage() {
  return (
    <div className="w-full bg-white min-h-screen py-16 px-4 md:px-8">
      <div className="w-full max-w-[1472px] mx-auto flex flex-col gap-24">
        <section className="w-full">
          <FeaturedWebinarBlock />
        </section>

        <section className="w-full">
          <PastWebinarBlock />
        </section>
      </div>
    </div>
  )
}
