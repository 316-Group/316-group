import type { CollectionConfig } from 'payload'
import { anyone } from '../../access/anyone'
import { authenticated } from '../../access/authenticated'

export const WebinarRecapSubmissions: CollectionConfig = {
  slug: 'webinar-recap-submissions',
  labels: {
    singular: 'Webinar Replay Request',
    plural: 'Webinar Replay Requests',
  },
  access: {
    admin: authenticated,
    create: anyone,
    delete: authenticated,
    read: authenticated,
    update: authenticated,
  },
  admin: {
    group: 'Webinars',
    defaultColumns: [
      'createdAt',
      'firstName',
      'lastName',
      'workEmail',
      'organisation',
      'sector',
      'sourceWebinarTitle',
      'status',
    ],
    useAsTitle: 'workEmail',
  },
  fields: [
    {
      type: 'row',
      fields: [
        {
          name: 'firstName',
          type: 'text',
          required: true,
          admin: { width: '50%' },
        },
        {
          name: 'lastName',
          type: 'text',
          required: true,
          admin: { width: '50%' },
        },
      ],
    },
    {
      name: 'workEmail',
      type: 'email',
      required: true,
      index: true,
    },
    {
      type: 'row',
      fields: [
        {
          name: 'organisation',
          type: 'text',
          required: true,
          admin: { width: '50%' },
        },
        {
          name: 'jobTitle',
          type: 'text',
          admin: { width: '50%' },
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'sector',
          type: 'text',
          admin: { width: '50%' },
        },
        {
          name: 'discussionTopic',
          type: 'text',
          admin: { width: '50%' },
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'viewingTime',
          type: 'text',
          admin: { width: '50%' },
        },
        {
          name: 'followUpPreference',
          type: 'text',
          admin: { width: '50%' },
        },
      ],
    },
    {
      name: 'notes',
      type: 'textarea',
      label: 'Additional Priorities / Questions',
    },
    {
      name: 'consentAccepted',
      type: 'checkbox',
      required: true,
      defaultValue: true,
    },
    {
      type: 'row',
      fields: [
        {
          name: 'sourceWebinarTitle',
          type: 'text',
          label: 'Source Webinar Title',
          admin: { width: '50%' },
        },
        {
          name: 'sourceWebinarSlug',
          type: 'text',
          label: 'Source Webinar Slug',
          admin: { width: '50%' },
        },
      ],
    },
    {
      name: 'formFieldLabels',
      type: 'json',
      label: 'Configured Field Labels at Submission',
      admin: {
        description:
          'Stores the exact custom labels configured by the editor when this form was submitted.',
      },
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'new',
      options: [
        { label: 'New Request', value: 'new' },
        { label: 'Contacted', value: 'contacted' },
        { label: 'Replay Sent', value: 'replay_sent' },
        { label: 'Completed', value: 'completed' },
        { label: 'Archived', value: 'archived' },
      ],
      admin: {
        position: 'sidebar',
      },
    },
  ],
  timestamps: true,
}

export default WebinarRecapSubmissions
