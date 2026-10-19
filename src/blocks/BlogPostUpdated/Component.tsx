import React from 'react'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { BlogPostUpdatedClient, type BlogPostUpdatedProps } from './BlogPostUpdatedClient'
import type { Post } from '@/payload-types'

export interface BlogPostUpdatedBlockServerProps extends BlogPostUpdatedProps {
  postsLimit?: string | null
}

export const BlogPostUpdatedBlock: React.FC<BlogPostUpdatedBlockServerProps> = async (props) => {
  const { postsLimit = 'all', ...clientProps } = props

  let limit = 100
  if (postsLimit && postsLimit !== 'all') {
    const parsed = parseInt(postsLimit, 10)
    if (!isNaN(parsed) && parsed > 0) {
      limit = parsed
    }
  }

  let posts: Post[] = []
  try {
    const payload = await getPayload({ config: configPromise })
    const result = await payload.find({
      collection: 'posts',
      depth: 2,
      limit,
      sort: '-createdAt',
      overrideAccess: false,
    })
    posts = (result?.docs as Post[]) || []
  } catch (error) {
    console.error('Error fetching posts in BlogPostUpdatedBlock:', error)
  }

  return <BlogPostUpdatedClient {...clientProps} posts={posts} />
}
