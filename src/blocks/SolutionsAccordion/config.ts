import { Block, Field } from 'payload'
import {
  FixedToolbarFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'
import { bgColorPickerAll } from '@/fields/bgColorPicker'
import { textColorPickerAll } from '@/fields/textColorPicker'
import { link } from '@/fields/link'

const allowAnySelect = (() => true as const) as any

export const solutionsAccordionLayoutFields: Field[] = [
  // ─── Horizontal Padding Controls ──────────────────────────────────────────
  {
    type: 'row',
    fields: [
      {
        name: 'paddingMode',
        type: 'select',
        label: 'Horizontal Padding Mode',
        defaultValue: 'default',
        options: [
          { label: 'Default Padding (~50px)', value: 'default' },
          { label: 'No Padding / Full Width Screen Bleed (0px)', value: 'none' },
          { label: 'Custom Horizontal Padding', value: 'custom' },
        ],
        admin: {
          width: '33.33%',
          description: 'Control the left and right padding of the accordion section.',
        },
      },
      {
        name: 'paddingXDesktop',
        type: 'select',
        label: 'Desktop Padding Left / Right',
        defaultValue: '50px',
        options: [
          { label: '0px (Full Bleed)', value: '0px' },
          { label: '10px', value: '10px' },
          { label: '20px', value: '20px' },
          { label: '30px', value: '30px' },
          { label: '40px', value: '40px' },
          { label: '50px (Default)', value: '50px' },
          { label: '60px', value: '60px' },
          { label: '80px', value: '80px' },
          { label: '100px', value: '100px' },
          { label: '120px', value: '120px' },
          { label: '150px', value: '150px' },
          { label: 'Custom Value', value: 'custom' },
        ],
        admin: {
          width: '33.33%',
          condition: (_, siblingData) => siblingData?.paddingMode === 'custom',
        },
      },
      {
        name: 'paddingXMobile',
        type: 'select',
        label: 'Mobile Padding Left / Right',
        defaultValue: '16px',
        options: [
          { label: '0px (Full Bleed)', value: '0px' },
          { label: '8px', value: '8px' },
          { label: '10px', value: '10px' },
          { label: '16px (Default Mobile)', value: '16px' },
          { label: '20px', value: '20px' },
          { label: '24px', value: '24px' },
          { label: '30px', value: '30px' },
          { label: 'Custom Value', value: 'custom' },
        ],
        admin: {
          width: '33.33%',
          condition: (_, siblingData) => siblingData?.paddingMode === 'custom',
        },
      },
    ],
  },
  {
    type: 'row',
    admin: {
      condition: (_, siblingData) => siblingData?.paddingMode === 'custom',
    },
    fields: [
      {
        name: 'paddingXDesktopCustom',
        type: 'text',
        label: 'Custom Desktop Padding (e.g. 75px)',
        admin: {
          width: '50%',
          condition: (_, siblingData) => siblingData?.paddingXDesktop === 'custom',
        },
      },
      {
        name: 'paddingXMobileCustom',
        type: 'text',
        label: 'Custom Mobile Padding (e.g. 12px)',
        admin: {
          width: '50%',
          condition: (_, siblingData) => siblingData?.paddingXMobile === 'custom',
        },
      },
    ],
  },

  // ─── 2-Column Grid Gap ─────────────────────────────────────────────────────
  {
    type: 'row',
    fields: [
      {
        name: 'columnGap',
        type: 'select',
        label: 'Column Gap (Between Left & Right Column)',
        defaultValue: '0px',
        options: [
          { label: '0px (Default - No Gap)', value: '0px' },
          { label: '16px (Small Gap)', value: '16px' },
          { label: '24px (Medium Gap)', value: '24px' },
          { label: '32px (Standard Gap)', value: '32px' },
          { label: '48px (Large Gap)', value: '48px' },
          { label: '64px (Extra Large Gap)', value: '64px' },
          { label: 'Custom Gap', value: 'custom' },
        ],
        admin: {
          width: '50%',
          description: 'Set the spacing gap between the left panel and right accordion list.',
        },
      },
      {
        name: 'columnGapCustom',
        type: 'text',
        label: 'Custom Gap Value (e.g. 40px)',
        admin: {
          width: '50%',
          condition: (_, siblingData) => siblingData?.columnGap === 'custom',
        },
      },
    ],
  },
]

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

    ...solutionsAccordionLayoutFields,

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
          appearances: false,
          disableLabel: true,
          required: false,
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
      fields: [
        // ── Row header ────────────────────────────────────────────────────────
        {
          name: 'title',
          type: 'text',
          label: 'Title',
          required: false,
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
        bgColorPickerAll({
          overrides: {
            name: 'iconCardBgColor',
            label: 'Icon Card Background (Inactive)',
            defaultValue: 'bg-[#EFF2FE]',
            validate: allowAnySelect,
            admin: {
              description:
                'Background color of the small rounded card containing the inactive icon.',
            },
          },
        }),
        bgColorPickerAll({
          overrides: {
            name: 'activeIconCardBgColor',
            label: 'Icon Card Background (Active/Open)',
            defaultValue: 'bg-white/20',
            validate: allowAnySelect,
            admin: {
              description:
                'Background color of the small rounded card when active/open (e.g. translucent white).',
            },
          },
        }),

        // Active card content
        bgColorPickerAll({
          overrides: {
            name: 'activeBgColor',
            label: 'Active Card Background Color',
            defaultValue: 'bg-blue-custom',
          },
        }),
        {
          name: 'activeTitle',
          type: 'text',
          label: 'Active Title (shown when open beside icon)',
          required: false,
          admin: {
            description:
              'Optional custom title shown when this accordion item is active/open. If empty, the default title is used.',
          },
        },
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

        // Image Overlay Badges (Three translucent cards at bottom-left of the image)
        {
          name: 'imageBadges',
          type: 'group',
          label: 'Image Overlay Badges (Bottom-Left Cards)',
          admin: {
            description:
              'Up to 3 frosted glass cards displayed at the bottom-left of this image (e.g. Wallets, Transfers, Fx). Only cards with content will display.',
          },
          fields: [
            {
              type: 'row',
              fields: [
                {
                  name: 'badge1',
                  type: 'text',
                  label: 'Card 1 Text',
                  defaultValue: 'Wallets',
                  required: false,
                  admin: { width: '33.33%', placeholder: 'e.g. Wallets' },
                },
                {
                  name: 'badge2',
                  type: 'text',
                  label: 'Card 2 Text',
                  defaultValue: 'Transfers',
                  required: false,
                  admin: { width: '33.33%', placeholder: 'e.g. Transfers' },
                },
                {
                  name: 'badge3',
                  type: 'text',
                  label: 'Card 3 Text',
                  defaultValue: 'Fx',
                  required: false,
                  admin: { width: '33.33%', placeholder: 'e.g. Fx' },
                },
              ],
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'badgeBgOverlay',
                  type: 'select',
                  label: 'Card Overlay Background',
                  defaultValue: 'bg-white/20 backdrop-blur-md border border-white/25',
                  validate: allowAnySelect,
                  options: [
                    {
                      label: 'Frosted Glass White - 20% (Default from mockup)',
                      value: 'bg-white/20 backdrop-blur-md border border-white/25',
                    },
                    {
                      label: 'Frosted Glass White - 30% (Slightly Stronger)',
                      value: 'bg-white/30 backdrop-blur-md border border-white/30',
                    },
                    {
                      label: 'Frosted Glass White - 15% (Subtle)',
                      value: 'bg-white/15 backdrop-blur-md border border-white/20',
                    },
                    {
                      label: 'Frosted Glass White - 40% (High Contrast)',
                      value: 'bg-white/40 backdrop-blur-md border border-white/40',
                    },
                    {
                      label: 'Frosted Dark Glass - 25% (Dark Overlay)',
                      value: 'bg-black/25 backdrop-blur-md border border-white/15',
                    },
                    {
                      label: 'Frosted Dark Glass - 40%',
                      value: 'bg-black/40 backdrop-blur-md border border-white/20',
                    },
                    {
                      label: 'Solid White (Clean Pill)',
                      value: 'bg-white border border-gray-100 shadow-md',
                    },
                    {
                      label: 'Brand Blue Glass',
                      value: 'bg-blue-600/30 backdrop-blur-md border border-blue-400/30',
                    },
                  ],
                  admin: { width: '50%' },
                },
                textColorPickerAll({
                  overrides: {
                    name: 'badgeTextColor',
                    label: 'Card Text Color',
                    defaultValue: 'text-white',
                    validate: allowAnySelect,
                    admin: { width: '50%' },
                  },
                }),
              ],
            },
          ],
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
          appearances: false,
          disableLabel: true,
          required: false,
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
