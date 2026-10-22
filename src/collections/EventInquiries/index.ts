import type { CollectionConfig } from 'payload'
import { anyone } from '../../access/anyone'
import { authenticated } from '../../access/authenticated'

export const EventInquiries: CollectionConfig = {
  slug: 'event-inquiries',
  labels: {
    singular: 'Event Meeting Request',
    plural: 'Event Meeting Requests',
  },
  access: {
    admin: authenticated,
    create: anyone,
    delete: authenticated,
    read: authenticated,
    update: authenticated,
  },
  admin: {
    defaultColumns: [
      'createdAt',
      'firstName',
      'lastName',
      'workEmail',
      'organisation',
      'discussionTopic',
      'preferredDay',
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
      name: 'discussionTopic',
      type: 'text',
      required: true,
    },
    {
      type: 'row',
      fields: [
        {
          name: 'preferredDay',
          type: 'text',
          admin: { width: '50%' },
        },
        {
          name: 'meetingFormat',
          type: 'text',
          admin: { width: '50%' },
        },
      ],
    },
    {
      name: 'notes',
      type: 'textarea',
      label: 'Additional Information / Notes',
    },
    {
      name: 'consentAccepted',
      type: 'checkbox',
      required: true,
      defaultValue: true,
      label: 'Agreed to communications & privacy policy',
    },
    {
      name: 'sourceEventTitle',
      type: 'text',
      admin: {
        description: 'Title of the Event where this inquiry was submitted from',
      },
    },
    {
      name: 'sourceEventSlug',
      type: 'text',
      admin: {
        description: 'Slug of the Event where this inquiry was submitted from',
      },
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'pending',
      options: [
        { label: 'Pending Review', value: 'pending' },
        { label: 'Contacted', value: 'contacted' },
        { label: 'Confirmed / Scheduled', value: 'confirmed' },
        { label: 'Declined', value: 'declined' },
      ],
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'internalNotes',
      type: 'textarea',
      label: 'Internal Staff Notes',
      admin: {
        position: 'sidebar',
        description: 'Internal coordinator notes and follow-up status',
      },
    },
  ],
  timestamps: true,
}
