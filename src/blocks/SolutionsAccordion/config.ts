import { Block } from 'payload'
import {
  FixedToolbarFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'
import { bgColorPickerAll } from '@/fields/bgColorPicker'
import { textColorPickerAll } from '@/fields/textColorPicker'
import { link } from '@/fields/link'

export const SolutionsAccordion: Block = {
  slug: 'solutionsAccordion',
  interfaceName: 'SolutionsAccordionBlock',
  labels: {
    singular: 'Solutions Accordion',
    plural: 'Solutions Accordions',
  },
  fields: [
    // ─── Section-level colours ────────────────────────────────────────────────
    bgColorPickerAll({
      overrides: {
        name: 'sectionBgColor',
        label: 'Section Background Color',
        defaultValue: 'bg-white',
      },
    }),

    // ─── Left Panel ───────────────────────────────────────────────────────────
    {
      name: 'leftPanel',
      type: 'group',
      label: 'Left Panel',
      fields: [
        bgColorPickerAll({
          overrides: {
            name: 'bgColor',
            label: 'Left Column Background',
            defaultValue: 'bg-white',
          },
        }),

        // Badge
        {
          name: 'badgeText',
          type: 'text',
          label: 'Badge Text',
          defaultValue: 'Our Solutions',
        },
        bgColorPickerAll({
          overrides: {
            name: 'badgeBgColor',
            label: 'Badge Background Color',
            defaultValue: 'bg-gray-100',
          },
        }),
        textColorPickerAll({
          overrides: {
            name: 'badgeTextColor',
            label: 'Badge Text Color',
            defaultValue: 'text-gray-800',
          },
        }),

        // Main heading
        {
          name: 'heading',
          type: 'richText',
          label: 'Heading',
          editor: lexicalEditor({
            features: ({ rootFeatures }) => [
              ...rootFeatures,
              FixedToolbarFeature(),
              InlineToolbarFeature(),
            ],
          }),
        },
        textColorPickerAll({
          overrides: {
            name: 'headingTextColor',
            label: 'Heading Text Color',
            defaultValue: 'text-black',
          },
        }),

        // Sub-badge / pill button
        {
          name: 'showSubBadge',
          type: 'checkbox',
          label: 'Show Sub-Badge / Button',
          defaultValue: true,
        },
        {
          name: 'subBadgeText',
          type: 'text',
          label: 'Sub-Badge Text',
          defaultValue: 'Explore payments',
          admin: {
            condition: (_, { showSubBadge }) => showSubBadge !== false,
          },
        },
        bgColorPickerAll({
          overrides: {
            name: 'subBadgeBgColor',
            label: 'Sub-Badge Background Color',
            defaultValue: 'bg-blue-custom',
            admin: {
              condition: (_, { showSubBadge }) => showSubBadge !== false,
            },
          },
        }),
        textColorPickerAll({
          overrides: {
            name: 'subBadgeTextColor',
            label: 'Sub-Badge Text Color',
            defaultValue: 'text-white',
            admin: {
              condition: (_, { showSubBadge }) => showSubBadge !== false,
            },
          },
        }),
        link({
          overrides: {
            name: 'subBadgeLink',
            label: 'Sub-Badge Link',
            admin: {
              condition: (_, { showSubBadge }) => showSubBadge !== false,
            },
          },
        }),
      ],
    },

    // ─── Right Panel / Accordion Items ───────────────────────────────────────
    bgColorPickerAll({
      overrides: {
        name: 'rightBgColor',
        label: 'Right Column Background',
        defaultValue: 'bg-white',
      },
    }),

    {
      name: 'accordionItems',
      type: 'array',
      label: 'Accordion Items',
      labels: {
        singular: 'Accordion Item',
        plural: 'Accordion Items',
      },
      minRows: 1,
      fields: [
        // ── Row header ────────────────────────────────────────────────────────
        {
          name: 'title',
          type: 'text',
          label: 'Title',
          required: true,
        },
        textColorPickerAll({
          overrides: {
            name: 'titleTextColor',
            label: 'Title Text Color (inactive state)',
            defaultValue: 'text-black',
          },
        }),

        // Icon uploads
        {
          name: 'icon',
          type: 'upload',
          label: 'Icon (default / inactive variant)',
          relationTo: 'media',
          required: false,
          admin: {
            description: 'Icon shown in the inactive row and in the active card header.',
          },
        },
        {
          name: 'iconActive',
          type: 'upload',
          label: 'Icon (active / white variant)',
          relationTo: 'media',
          required: false,
          admin: {
            description: 'White/light variant of the icon shown inside the open card.',
          },
        },

        // Active card content
        bgColorPickerAll({
          overrides: {
            name: 'activeBgColor',
            label: 'Active Card Background Color',
            defaultValue: 'bg-blue-custom',
          },
        }),
        {
          name: 'subHeading',
          type: 'text',
          label: 'Sub-Heading (shown when open)',
        },
        textColorPickerAll({
          overrides: {
            name: 'subHeadingTextColor',
            label: 'Sub-Heading Text Color',
            defaultValue: 'text-white',
          },
        }),
        {
          name: 'bodyText',
          type: 'richText',
          label: 'Body Text (shown when open)',
          editor: lexicalEditor({
            features: ({ rootFeatures }) => [
              ...rootFeatures,
              FixedToolbarFeature(),
              InlineToolbarFeature(),
            ],
          }),
        },
        textColorPickerAll({
          overrides: {
            name: 'bodyTextColor',
            label: 'Body Text Color',
            defaultValue: 'text-white',
          },
        }),

        // Image for left column
        {
          name: 'image',
          type: 'upload',
          label: 'Left Column Image (shown when this item is active)',
          relationTo: 'media',
          required: false,
        },

        // CTA button
        {
          name: 'showCTAButton',
          type: 'checkbox',
          label: 'Show CTA Button',
          defaultValue: true,
        },
        {
          name: 'ctaLabel',
          type: 'text',
          label: 'CTA Button Label',
          defaultValue: 'Learn more',
          admin: {
            condition: (_, { showCTAButton }) => showCTAButton !== false,
          },
        },
        bgColorPickerAll({
          overrides: {
            name: 'ctaBgColor',
            label: 'CTA Button Background Color',
            defaultValue: 'bg-white',
            admin: {
              condition: (_, { showCTAButton }) => showCTAButton !== false,
            },
          },
        }),
        textColorPickerAll({
          overrides: {
            name: 'ctaTextColor',
            label: 'CTA Button Text Color',
            defaultValue: 'text-blue-custom',
            admin: {
              condition: (_, { showCTAButton }) => showCTAButton !== false,
            },
          },
        }),
        link({
          overrides: {
            name: 'ctaLink',
            label: 'CTA Button Link',
            admin: {
              condition: (_, { showCTAButton }) => showCTAButton !== false,
            },
          },
        }),

        // Animation
        {
          name: 'animationStyle',
          type: 'select',
          label: 'Animation Style',
          defaultValue: 'slide',
          options: [
            { label: 'Slide (ease-in-out)', value: 'slide' },
            { label: 'Fade (opacity only)', value: 'fade' },
            { label: 'Scale (scale-y)', value: 'scale' },
          ],
        },
        {
          name: 'animationSpeed',
          type: 'select',
          label: 'Animation Speed',
          defaultValue: 'normal',
          options: [
            { label: 'Fast (150ms)', value: 'fast' },
            { label: 'Normal (300ms)', value: 'normal' },
            { label: 'Slow (500ms)', value: 'slow' },
          ],
        },
      ],
    },

    // ─── Scroll Animation Config ──────────────────────────────────────────────
    {
      name: 'scrollAnimation',
      type: 'group',
      label: 'Scroll Entrance Animation',
      admin: {
        description: 'Animate the section when it scrolls into view.',
      },
      fields: [
        {
          name: 'enabled',
          type: 'checkbox',
          label: 'Enable Scroll Animation',
          defaultValue: true,
        },
        {
          name: 'type',
          type: 'select',
          label: 'Animation Type',
          defaultValue: 'fade-up',
          admin: { condition: (_, s) => s.enabled !== false },
          options: [
            { label: 'Fade Up (default)', value: 'fade-up' },
            { label: 'Fade Down', value: 'fade-down' },
            { label: 'Fade In (no movement)', value: 'fade-in' },
            { label: 'Fade Left (slide from right)', value: 'fade-left' },
            { label: 'Fade Right (slide from left)', value: 'fade-right' },
            { label: 'Zoom In', value: 'zoom-in' },
            { label: 'Slide Up', value: 'slide-up' },
          ],
        },
        {
          name: 'speed',
          type: 'select',
          label: 'Animation Speed',
          defaultValue: 'normal',
          admin: { condition: (_, s) => s.enabled !== false },
          options: [
            { label: 'Fast (350ms)', value: 'fast' },
            { label: 'Normal (650ms)', value: 'normal' },
            { label: 'Slow (1000ms)', value: 'slow' },
          ],
        },
        {
          name: 'leftDelay',
          type: 'select',
          label: 'Left Column Delay',
          defaultValue: '0',
          admin: { condition: (_, s) => s.enabled !== false },
          options: [
            { label: 'No delay', value: '0' },
            { label: '100ms', value: '100' },
            { label: '150ms', value: '150' },
            { label: '200ms', value: '200' },
            { label: '300ms', value: '300' },
          ],
        },
        {
          name: 'rightDelay',
          type: 'select',
          label: 'Right Column Delay',
          defaultValue: '200',
          admin: { condition: (_, s) => s.enabled !== false },
          options: [
            { label: 'No delay', value: '0' },
            { label: '100ms', value: '100' },
            { label: '150ms', value: '150' },
            { label: '200ms', value: '200' },
            { label: '300ms', value: '300' },
            { label: '400ms', value: '400' },
            { label: '500ms', value: '500' },
          ],
        },
      ],
    },
  ],
}
