import { Block, Field } from 'payload'
import { bgColorPickerAll } from '@/fields/bgColorPicker'
import { textColorPickerAll } from '@/fields/textColorPicker'
import { fontSizeOptions, fontWeightOptions } from '../CenteredContent/config'

const allowAnySelect = (() => true as const) as any

const alignmentOptions = [
  { label: 'Left (Default)', value: 'left' },
  { label: 'Center', value: 'center' },
  { label: 'Right', value: 'right' },
]

export const blogPostUpdatedFields: Field[] = [
  // ─── 1. Query & Limit Settings ─────────────────────────────────────────────
  {
    type: 'row',
    fields: [
      {
        name: 'postsLimit',
        type: 'select',
        label: 'Number of Posts to Display',
        defaultValue: 'all',
        validate: allowAnySelect,
        options: [
          { label: 'All Posts (Default)', value: 'all' },
          { label: '3 Posts', value: '3' },
          { label: '6 Posts', value: '6' },
          { label: '9 Posts', value: '9' },
          { label: '12 Posts', value: '12' },
        ],
        admin: {
          width: '50%',
          description: 'Choose how many posts from the Posts collection to display.',
        },
      },
      bgColorPickerAll({
        overrides: {
          name: 'sectionBgColor',
          label: 'Section Background Color',
          defaultValue: 'bg-transparent',
          validate: allowAnySelect,
          admin: { width: '50%' },
        },
      }),
    ],
  },

  // ─── 2. Vertical Spacing ───────────────────────────────────────────────────
  {
    type: 'row',
    fields: [
      {
        name: 'paddingTop',
        type: 'select',
        label: 'Padding Top',
        defaultValue: 'pt-8',
        validate: allowAnySelect,
        options: [
          { label: 'None (0)', value: 'pt-0' },
          { label: 'Extra Small (pt-4)', value: 'pt-4' },
          { label: 'Small (pt-8)', value: 'pt-8' },
          { label: 'Medium (pt-12)', value: 'pt-12' },
          { label: 'Standard (pt-16)', value: 'pt-16' },
          { label: 'Large (pt-20)', value: 'pt-20' },
        ],
        admin: { width: '50%' },
      },
      {
        name: 'paddingBottom',
        type: 'select',
        label: 'Padding Bottom',
        defaultValue: 'pb-16',
        validate: allowAnySelect,
        options: [
          { label: 'None (0)', value: 'pb-0' },
          { label: 'Extra Small (pb-4)', value: 'pb-4' },
          { label: 'Small (pb-8)', value: 'pb-8' },
          { label: 'Medium (pb-12)', value: 'pb-12' },
          { label: 'Standard (pb-16)', value: 'pb-16' },
          { label: 'Large (pb-20)', value: 'pb-20' },
        ],
        admin: { width: '50%' },
      },
    ],
  },

  // ─── 3. Horizontal Padding Controls ───────────────────────────────────────
  {
    type: 'row',
    fields: [
      {
        name: 'paddingMode',
        type: 'select',
        label: 'Horizontal Padding Mode',
        defaultValue: 'default',
        validate: allowAnySelect,
        options: [
          { label: 'Default Padding (Matches Standard Container Margins)', value: 'default' },
          { label: 'No Padding / Full Column Width (0px)', value: 'none' },
          { label: 'Custom Horizontal Padding', value: 'custom' },
        ],
        admin: {
          width: '33.33%',
          description: 'Set to "No Padding" to let the posts occupy the full width of the column.',
        },
      },
      {
        name: 'paddingXDesktop',
        type: 'select',
        label: 'Desktop Padding Left / Right',
        defaultValue: '48px',
        validate: allowAnySelect,
        options: [
          { label: '0px (Full Bleed)', value: '0px' },
          { label: '16px', value: '16px' },
          { label: '24px', value: '24px' },
          { label: '32px', value: '32px' },
          { label: '48px (Default)', value: '48px' },
          { label: '60px', value: '60px' },
          { label: '80px', value: '80px' },
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
        validate: allowAnySelect,
        options: [
          { label: '0px (Full Bleed)', value: '0px' },
          { label: '8px', value: '8px' },
          { label: '16px (Default)', value: '16px' },
          { label: '24px', value: '24px' },
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
        label: 'Custom Desktop Padding (e.g. 50px)',
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

  // ─── 4. Slider Controls ───────────────────────────────────────────────────
  {
    name: 'enableSlider',
    type: 'checkbox',
    label: 'Enable Slider (Slide cards instead of static row)',
    defaultValue: true,
    admin: {
      description: 'When enabled, blog cards display in an interactive carousel slider. When disabled, cards are scrollable along the x-axis.',
    },
  },
  {
    name: 'sliderSettings',
    type: 'group',
    label: 'Slider Configuration',
    admin: {
      condition: (_, siblingData) => Boolean(siblingData?.enableSlider),
    },
    fields: [
      {
        type: 'row',
        fields: [
          {
            name: 'showArrows',
            type: 'checkbox',
            label: 'Show Navigation Arrows (Left & Right)',
            defaultValue: true,
            admin: {
              width: '33.33%',
              description: 'Displays Left & Right arrow buttons at top right above the cards.',
            },
          },
          {
            name: 'autoSlide',
            type: 'checkbox',
            label: 'Enable Automatic Slider (Autoplay)',
            defaultValue: false,
            admin: {
              width: '33.33%',
              description: 'Automatically transitions slides after a timing delay.',
            },
          },
          {
            name: 'slideDirection',
            type: 'select',
            label: 'Slider Direction',
            defaultValue: 'ltr',
            validate: allowAnySelect,
            options: [
              { label: 'Left to Right (Default)', value: 'ltr' },
              { label: 'Right to Left', value: 'rtl' },
            ],
            admin: {
              width: '33.33%',
              description: 'Direction of automatic or forward slider movement.',
            },
          },
        ],
      },
      {
        type: 'row',
        fields: [
          {
            name: 'autoSlideInterval',
            type: 'number',
            label: 'Autoplay Interval in Milliseconds (ms)',
            defaultValue: 4000,
            admin: {
              width: '50%',
              condition: (_, siblingData) => Boolean(siblingData?.autoSlide),
              description: 'Time in milliseconds between auto transitions (Default: 4000ms = 4s).',
            },
          },
          {
            name: 'slidesToScroll',
            type: 'select',
            label: 'Slides to Scroll at Once (Desktop)',
            defaultValue: '1',
            validate: allowAnySelect,
            options: [
              { label: '1 Slide (Default)', value: '1' },
              { label: '2 Slides', value: '2' },
              { label: '3 Slides', value: '3' },
            ],
            admin: {
              width: '50%',
              description: 'Number of posts to advance when clicking the navigation arrow.',
            },
          },
        ],
      },
      {
        type: 'row',
        fields: [
          {
            name: 'showIndicators',
            type: 'checkbox',
            label: 'Show Bottom Indicator Dots (Clickable to jump to slide)',
            defaultValue: true,
            admin: {
              width: '50%',
              description: 'Displays clickable pagination dots below the cards.',
            },
          },
          {
            name: 'indicatorsAlignment',
            type: 'select',
            label: 'Indicators Alignment',
            defaultValue: 'left',
            validate: allowAnySelect,
            options: [
              { label: 'Left (Default)', value: 'left' },
              { label: 'Center', value: 'center' },
              { label: 'Right', value: 'right' },
            ],
            admin: {
              width: '50%',
              condition: (_, siblingData) => Boolean(siblingData?.showIndicators),
            },
          },
        ],
      },
    ],
  },

  // ─── 5. Card Spacing & Typography ─────────────────────────────────────────
  {
    name: 'cardStyling',
    type: 'group',
    label: 'Card Spacing & Typography',
    fields: [
      // Image Spacing
      {
        type: 'row',
        fields: [
          {
            name: 'imageSpacingBottom',
            type: 'select',
            label: 'Spacing Below Image (before Announcement)',
            defaultValue: '20px',
            validate: allowAnySelect,
            options: [
              { label: '12px', value: '12px' },
              { label: '16px', value: '16px' },
              { label: '20px (Default)', value: '20px' },
              { label: '24px', value: '24px' },
              { label: '32px', value: '32px' },
              { label: 'Custom (px)', value: 'custom' },
            ],
            admin: { width: '50%' },
          },
          {
            name: 'imageSpacingBottomCustom',
            type: 'text',
            label: 'Custom Spacing (e.g. 22px)',
            admin: {
              width: '50%',
              condition: (_, siblingData) => siblingData?.imageSpacingBottom === 'custom',
            },
          },
        ],
      },

      // Announcement / Category Styling & Spacing
      {
        name: 'categoryGroup',
        type: 'group',
        label: 'Category / Announcement Text',
        fields: [
          {
            type: 'row',
            fields: [
              {
                name: 'spacingBottom',
                type: 'select',
                label: 'Spacing Below Category (before Title)',
                defaultValue: '12px',
                validate: allowAnySelect,
                options: [
                  { label: '8px', value: '8px' },
                  { label: '12px (Default)', value: '12px' },
                  { label: '16px', value: '16px' },
                  { label: '20px', value: '20px' },
                  { label: 'Custom (px)', value: 'custom' },
                ],
                admin: { width: '50%' },
              },
              {
                name: 'spacingBottomCustom',
                type: 'text',
                label: 'Custom Spacing (e.g. 10px)',
                admin: {
                  width: '50%',
                  condition: (_, siblingData) => siblingData?.spacingBottom === 'custom',
                },
              },
            ],
          },
          {
            type: 'row',
            fields: [
              textColorPickerAll({
                overrides: {
                  name: 'color',
                  label: 'Text Color',
                  defaultValue: 'text-gray-900',
                  validate: allowAnySelect,
                  admin: { width: '25%' },
                },
              }),
              {
                name: 'fontSize',
                type: 'select',
                label: 'Font Size',
                defaultValue: 'text-sm md:text-base',
                validate: allowAnySelect,
                options: fontSizeOptions,
                admin: { width: '25%' },
              },
              {
                name: 'fontSizeMobile',
                type: 'select',
                label: 'Font Size (Mobile)',
                defaultValue: 'text-sm',
                validate: allowAnySelect,
                options: fontSizeOptions,
                admin: { width: '25%' },
              },
              {
                name: 'fontWeight',
                type: 'select',
                label: 'Font Weight',
                defaultValue: 'font-normal',
                validate: allowAnySelect,
                options: fontWeightOptions,
                admin: { width: '25%' },
              },
              {
                name: 'fontWeightMobile',
                type: 'select',
                label: 'Font Weight (Mobile)',
                defaultValue: 'font-normal',
                validate: allowAnySelect,
                options: fontWeightOptions,
                admin: { width: '25%' },
              },
              {
                name: 'alignment',
                type: 'select',
                label: 'Alignment',
                defaultValue: 'left',
                validate: allowAnySelect,
                options: alignmentOptions,
                admin: { width: '25%' },
              },
            ],
          },
        ],
      },

      // Post Title Styling & Spacing
      {
        name: 'titleGroup',
        type: 'group',
        label: 'Post Title',
        fields: [
          {
            type: 'row',
            fields: [
              {
                name: 'spacingBottom',
                type: 'select',
                label: 'Spacing Below Title (before Description)',
                defaultValue: '14px',
                validate: allowAnySelect,
                options: [
                  { label: '8px', value: '8px' },
                  { label: '12px', value: '12px' },
                  { label: '14px (Default)', value: '14px' },
                  { label: '16px', value: '16px' },
                  { label: '20px', value: '20px' },
                  { label: 'Custom (px)', value: 'custom' },
                ],
                admin: { width: '50%' },
              },
              {
                name: 'spacingBottomCustom',
                type: 'text',
                label: 'Custom Spacing (e.g. 15px)',
                admin: {
                  width: '50%',
                  condition: (_, siblingData) => siblingData?.spacingBottom === 'custom',
                },
              },
            ],
          },
          {
            type: 'row',
            fields: [
              textColorPickerAll({
                overrides: {
                  name: 'color',
                  label: 'Text Color',
                  defaultValue: 'text-gray-950',
                  validate: allowAnySelect,
                  admin: { width: '25%' },
                },
              }),
              {
                name: 'fontSize',
                type: 'select',
                label: 'Font Size',
                defaultValue: 'text-2xl md:text-3xl',
                validate: allowAnySelect,
                options: fontSizeOptions,
                admin: { width: '25%' },
              },
              {
                name: 'fontSizeMobile',
                type: 'select',
                label: 'Font Size (Mobile)',
                defaultValue: 'text-2xl',
                validate: allowAnySelect,
                options: fontSizeOptions,
                admin: { width: '25%' },
              },
              {
                name: 'fontWeight',
                type: 'select',
                label: 'Font Weight',
                defaultValue: 'font-semibold',
                validate: allowAnySelect,
                options: fontWeightOptions,
                admin: { width: '25%' },
              },
              {
                name: 'fontWeightMobile',
                type: 'select',
                label: 'Font Weight (Mobile)',
                defaultValue: 'font-semibold',
                validate: allowAnySelect,
                options: fontWeightOptions,
                admin: { width: '25%' },
              },
              {
                name: 'alignment',
                type: 'select',
                label: 'Alignment',
                defaultValue: 'left',
                validate: allowAnySelect,
                options: alignmentOptions,
                admin: { width: '25%' },
              },
            ],
          },
        ],
      },

      // Description Styling, Truncation & Spacing
      {
        name: 'descriptionGroup',
        type: 'group',
        label: 'Post Description',
        fields: [
          {
            type: 'row',
            fields: [
              {
                name: 'maxCharacters',
                type: 'number',
                label: 'Max Character Count (Truncate with ...)',
                defaultValue: 160,
                admin: {
                  width: '50%',
                  description: 'Maximum characters displayed before truncating with an ellipsis.',
                },
              },
              {
                name: 'spacingBottom',
                type: 'select',
                label: 'Spacing Below Description (before Button)',
                defaultValue: '16px',
                validate: allowAnySelect,
                options: [
                  { label: '12px', value: '12px' },
                  { label: '16px (Default)', value: '16px' },
                  { label: '20px', value: '20px' },
                  { label: '24px', value: '24px' },
                  { label: 'Custom (px)', value: 'custom' },
                ],
                admin: { width: '50%' },
              },
            ],
          },
          {
            type: 'row',
            fields: [
              textColorPickerAll({
                overrides: {
                  name: 'color',
                  label: 'Text Color',
                  defaultValue: 'text-gray-600',
                  validate: allowAnySelect,
                  admin: { width: '25%' },
                },
              }),
              {
                name: 'fontSize',
                type: 'select',
                label: 'Font Size',
                defaultValue: 'text-sm md:text-base',
                validate: allowAnySelect,
                options: fontSizeOptions,
                admin: { width: '25%' },
              },
              {
                name: 'fontSizeMobile',
                type: 'select',
                label: 'Font Size (Mobile)',
                defaultValue: 'text-sm',
                validate: allowAnySelect,
                options: fontSizeOptions,
                admin: { width: '25%' },
              },
              {
                name: 'fontWeight',
                type: 'select',
                label: 'Font Weight',
                defaultValue: 'font-normal',
                validate: allowAnySelect,
                options: fontWeightOptions,
                admin: { width: '25%' },
              },
              {
                name: 'fontWeightMobile',
                type: 'select',
                label: 'Font Weight (Mobile)',
                defaultValue: 'font-normal',
                validate: allowAnySelect,
                options: fontWeightOptions,
                admin: { width: '25%' },
              },
              {
                name: 'alignment',
                type: 'select',
                label: 'Alignment',
                defaultValue: 'left',
                validate: allowAnySelect,
                options: alignmentOptions,
                admin: { width: '25%' },
              },
            ],
          },
        ],
      },

      // Action Button (Slide Up on Hover)
      {
        name: 'buttonGroup',
        type: 'group',
        label: 'Action Button (Slides Up on Hover)',
        fields: [
          {
            name: 'text',
            type: 'text',
            label: 'Button Label',
            defaultValue: 'Learn more',
          },
          {
            type: 'row',
            fields: [
              textColorPickerAll({
                overrides: {
                  name: 'textColor',
                  label: 'Text Color',
                  defaultValue: 'text-gray-950',
                  validate: allowAnySelect,
                  admin: { width: '25%' },
                },
              }),
              {
                name: 'fontSize',
                type: 'select',
                label: 'Font Size',
                defaultValue: 'text-base',
                validate: allowAnySelect,
                options: fontSizeOptions,
                admin: { width: '25%' },
              },
              {
                name: 'fontSizeMobile',
                type: 'select',
                label: 'Font Size (Mobile)',
                defaultValue: 'text-base',
                validate: allowAnySelect,
                options: fontSizeOptions,
                admin: { width: '25%' },
              },
              {
                name: 'fontWeight',
                type: 'select',
                label: 'Font Weight',
                defaultValue: 'font-semibold',
                validate: allowAnySelect,
                options: fontWeightOptions,
                admin: { width: '25%' },
              },
              {
                name: 'fontWeightMobile',
                type: 'select',
                label: 'Font Weight (Mobile)',
                defaultValue: 'font-semibold',
                validate: allowAnySelect,
                options: fontWeightOptions,
                admin: { width: '25%' },
              },
              {
                name: 'alignment',
                type: 'select',
                label: 'Alignment',
                defaultValue: 'left',
                validate: allowAnySelect,
                options: alignmentOptions,
                admin: { width: '25%' },
              },
            ],
          },
          {
            type: 'row',
            fields: [
              bgColorPickerAll({
                overrides: {
                  name: 'iconBgColor',
                  label: 'Circle Icon Background Color',
                  defaultValue: 'bg-blue-custom',
                  validate: allowAnySelect,
                  admin: { width: '50%' },
                },
              }),
              textColorPickerAll({
                overrides: {
                  name: 'iconColor',
                  label: 'Arrow Icon Color',
                  defaultValue: 'text-white',
                  validate: allowAnySelect,
                  admin: { width: '50%' },
                },
              }),
            ],
          },
        ],
      },
    ],
  },
]

export const BlogPostUpdated: Block = {
  slug: 'blogPostUpdated',
  interfaceName: 'BlogPostUpdatedBlock',
  fields: blogPostUpdatedFields,
}
