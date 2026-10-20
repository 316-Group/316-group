import { Block, Field } from 'payload'
import { bgColorPickerAll } from '@/fields/bgColorPicker'
import { textColorPickerAll } from '@/fields/textColorPicker'
import { link } from '@/fields/link'
import { fontSizeOptions, fontWeightOptions } from '../CenteredContent/config'

const allowAnySelect = (() => true as const) as any

const alignmentOptions = [
  { label: 'Left (Default)', value: 'left' },
  { label: 'Center', value: 'center' },
  { label: 'Right', value: 'right' },
]

export const imageSliderFields: Field[] = [
  // ─── Section Background & Spacing ──────────────────────────────────────────
  {
    type: 'row',
    fields: [
      bgColorPickerAll({
        overrides: {
          name: 'sectionBgColor',
          label: 'Background Color',
          defaultValue: 'bg-transparent',
          validate: allowAnySelect,
          admin: { width: '33.33%' },
        },
      }),
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
        ],
        admin: { width: '33.33%' },
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
        ],
        admin: { width: '33.33%' },
      },
    ],
  },

  // ─── Horizontal Padding Controls ──────────────────────────────────────────
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
          { label: 'Default Padding (Matches Mockup Margins)', value: 'default' },
          { label: 'No Padding / Full Column Width (0px)', value: 'none' },
          { label: 'Custom Horizontal Padding', value: 'custom' },
        ],
        admin: {
          width: '50%',
          description: 'Set to "No Padding" to let the slider occupy the full width of the column.',
        },
      },
      {
        name: 'paddingSide',
        type: 'select',
        label: 'Padding Target Side',
        defaultValue: 'both',
        validate: allowAnySelect,
        admin: {
          width: '50%',
          condition: (_, siblingData) => siblingData?.paddingMode === 'custom',
          description:
            'Choose whether padding applies to both sides together, left only, right only, or set separate left & right values.',
        },
        options: [
          { label: 'Both Sides (Left & Right Together)', value: 'both' },
          { label: 'Left Side Only', value: 'left' },
          { label: 'Right Side Only', value: 'right' },
          { label: 'Separate Left & Right', value: 'split' },
        ],
      },
    ],
  },

  // ─── Both Sides (Left & Right Together) ──────────────────────────────────
  {
    type: 'row',
    admin: {
      condition: (_, siblingData) =>
        siblingData?.paddingMode === 'custom' &&
        (!siblingData?.paddingSide || siblingData?.paddingSide === 'both'),
    },
    fields: [
      {
        name: 'paddingXDesktop',
        type: 'select',
        label: 'Desktop Padding (Left & Right)',
        defaultValue: '48px',
        validate: allowAnySelect,
        options: [
          { label: '0px (Full Bleed)', value: '0px' },
          { label: '8px', value: '8px' },
          { label: '16px', value: '16px' },
          { label: '24px', value: '24px' },
          { label: '32px', value: '32px' },
          { label: '40px', value: '40px' },
          { label: '48px (Default)', value: '48px' },
          { label: '60px', value: '60px' },
          { label: '80px', value: '80px' },
          { label: '100px', value: '100px' },
          { label: '120px', value: '120px' },
          { label: '150px', value: '150px' },
          { label: '180px', value: '180px' },
          { label: '200px', value: '200px' },
          { label: '250px', value: '250px' },
          { label: '300px', value: '300px' },
          { label: 'Custom Value', value: 'custom' },
        ],
        admin: { width: '50%' },
      },
      {
        name: 'paddingXDesktopCustom',
        type: 'text',
        label: 'Custom Desktop Padding (e.g. 50px)',
        admin: {
          width: '50%',
          condition: (_, siblingData) => siblingData?.paddingXDesktop === 'custom',
        },
      },
    ],
  },
  {
    type: 'row',
    admin: {
      condition: (_, siblingData) =>
        siblingData?.paddingMode === 'custom' &&
        (!siblingData?.paddingSide || siblingData?.paddingSide === 'both'),
    },
    fields: [
      {
        name: 'paddingXMobile',
        type: 'select',
        label: 'Mobile Padding (Left & Right)',
        defaultValue: '16px',
        validate: allowAnySelect,
        options: [
          { label: '0px (Full Bleed)', value: '0px' },
          { label: '8px', value: '8px' },
          { label: '16px (Default)', value: '16px' },
          { label: '20px', value: '20px' },
          { label: '24px', value: '24px' },
          { label: '30px', value: '30px' },
          { label: '40px', value: '40px' },
          { label: '50px', value: '50px' },
          { label: '60px', value: '60px' },
          { label: '80px', value: '80px' },
          { label: 'Custom Value', value: 'custom' },
        ],
        admin: { width: '50%' },
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

  // ─── Left Side (For 'left' or 'split') ────────────────────────────────────
  {
    type: 'row',
    admin: {
      condition: (_, siblingData) =>
        siblingData?.paddingMode === 'custom' &&
        (siblingData?.paddingSide === 'left' || siblingData?.paddingSide === 'split'),
    },
    fields: [
      {
        name: 'paddingLeftDesktop',
        type: 'select',
        label: 'Desktop Padding Left',
        defaultValue: '48px',
        validate: allowAnySelect,
        options: [
          { label: '0px (Full Bleed)', value: '0px' },
          { label: '8px', value: '8px' },
          { label: '16px', value: '16px' },
          { label: '24px', value: '24px' },
          { label: '32px', value: '32px' },
          { label: '40px', value: '40px' },
          { label: '48px (Default)', value: '48px' },
          { label: '60px', value: '60px' },
          { label: '80px', value: '80px' },
          { label: '100px', value: '100px' },
          { label: '120px', value: '120px' },
          { label: '150px', value: '150px' },
          { label: '180px', value: '180px' },
          { label: '200px', value: '200px' },
          { label: '250px', value: '250px' },
          { label: '300px', value: '300px' },
          { label: 'Custom Value', value: 'custom' },
        ],
        admin: { width: '50%' },
      },
      {
        name: 'paddingLeftDesktopCustom',
        type: 'text',
        label: 'Custom Desktop Padding Left (e.g. 75px)',
        admin: {
          width: '50%',
          condition: (_, siblingData) => siblingData?.paddingLeftDesktop === 'custom',
        },
      },
    ],
  },
  {
    type: 'row',
    admin: {
      condition: (_, siblingData) =>
        siblingData?.paddingMode === 'custom' &&
        (siblingData?.paddingSide === 'left' || siblingData?.paddingSide === 'split'),
    },
    fields: [
      {
        name: 'paddingLeftMobile',
        type: 'select',
        label: 'Mobile Padding Left',
        defaultValue: '16px',
        validate: allowAnySelect,
        options: [
          { label: '0px (Full Bleed)', value: '0px' },
          { label: '8px', value: '8px' },
          { label: '16px (Default)', value: '16px' },
          { label: '20px', value: '20px' },
          { label: '24px', value: '24px' },
          { label: '30px', value: '30px' },
          { label: 'Custom Value', value: 'custom' },
        ],
        admin: { width: '50%' },
      },
      {
        name: 'paddingLeftMobileCustom',
        type: 'text',
        label: 'Custom Mobile Padding Left (e.g. 12px)',
        admin: {
          width: '50%',
          condition: (_, siblingData) => siblingData?.paddingLeftMobile === 'custom',
        },
      },
    ],
  },

  // ─── Right Side (For 'right' or 'split') ───────────────────────────────────
  {
    type: 'row',
    admin: {
      condition: (_, siblingData) =>
        siblingData?.paddingMode === 'custom' &&
        (siblingData?.paddingSide === 'right' || siblingData?.paddingSide === 'split'),
    },
    fields: [
      {
        name: 'paddingRightDesktop',
        type: 'select',
        label: 'Desktop Padding Right',
        defaultValue: '48px',
        validate: allowAnySelect,
        options: [
          { label: '0px (Full Bleed)', value: '0px' },
          { label: '8px', value: '8px' },
          { label: '16px', value: '16px' },
          { label: '24px', value: '24px' },
          { label: '32px', value: '32px' },
          { label: '40px', value: '40px' },
          { label: '48px (Default)', value: '48px' },
          { label: '60px', value: '60px' },
          { label: '80px', value: '80px' },
          { label: '100px', value: '100px' },
          { label: '120px', value: '120px' },
          { label: '150px', value: '150px' },
          { label: '180px', value: '180px' },
          { label: '200px', value: '200px' },
          { label: '250px', value: '250px' },
          { label: '300px', value: '300px' },
          { label: 'Custom Value', value: 'custom' },
        ],
        admin: { width: '50%' },
      },
      {
        name: 'paddingRightDesktopCustom',
        type: 'text',
        label: 'Custom Desktop Padding Right (e.g. 75px)',
        admin: {
          width: '50%',
          condition: (_, siblingData) => siblingData?.paddingRightDesktop === 'custom',
        },
      },
    ],
  },
  {
    type: 'row',
    admin: {
      condition: (_, siblingData) =>
        siblingData?.paddingMode === 'custom' &&
        (siblingData?.paddingSide === 'right' || siblingData?.paddingSide === 'split'),
    },
    fields: [
      {
        name: 'paddingRightMobile',
        type: 'select',
        label: 'Mobile Padding Right',
        defaultValue: '16px',
        validate: allowAnySelect,
        options: [
          { label: '0px (Full Bleed)', value: '0px' },
          { label: '8px', value: '8px' },
          { label: '16px (Default)', value: '16px' },
          { label: '20px', value: '20px' },
          { label: '24px', value: '24px' },
          { label: '30px', value: '30px' },
          { label: 'Custom Value', value: 'custom' },
        ],
        admin: { width: '50%' },
      },
      {
        name: 'paddingRightMobileCustom',
        type: 'text',
        label: 'Custom Mobile Padding Right (e.g. 12px)',
        admin: {
          width: '50%',
          condition: (_, siblingData) => siblingData?.paddingRightMobile === 'custom',
        },
      },
    ],
  },

  // ─── Slider Master Toggle & Settings ──────────────────────────────────────
  {
    name: 'enableSlider',
    type: 'checkbox',
    label: 'Enable Slider (Slide cards instead of static row)',
    defaultValue: true,
    admin: {
      description: 'When enabled, image cards display as an animated slider. When disabled, cards are scrollable along the x-axis.',
    },
  },
  {
    name: 'sliderSettings',
    type: 'group',
    label: 'Slider Configuration',
    admin: {
      condition: (_, siblingData) => Boolean(siblingData?.enableSlider),
      description: 'Configure top-right arrows, autoplay timing, indicators, and slides to scroll.',
    },
    fields: [
      {
        type: 'row',
        fields: [
          {
            name: 'showArrows',
            type: 'checkbox',
            label: 'Show Top-Right Navigation Arrows (Left & Right)',
            defaultValue: true,
            admin: {
              width: '50%',
              description: 'Displays Left & Right arrow buttons at the top-right above the cards.',
            },
          },
          {
            name: 'showIndicators',
            type: 'checkbox',
            label: 'Show Bottom Indicator Dots (Clickable to jump to slide)',
            defaultValue: true,
            admin: {
              width: '50%',
              description: 'Displays clickable pagination dots at the bottom to jump to that card.',
            },
          },
        ],
      },
      {
        type: 'row',
        fields: [
          {
            name: 'autoSlide',
            type: 'checkbox',
            label: 'Enable Automatic Slider (Autoplay)',
            defaultValue: false,
            admin: {
              width: '50%',
              description: 'Automatically advances slides at the interval specified below.',
            },
          },
          {
            name: 'autoSlideInterval',
            type: 'number',
            label: 'Autoplay Interval in Milliseconds (ms)',
            defaultValue: 4000,
            admin: {
              width: '50%',
              condition: (_, siblingData) => Boolean(siblingData?.autoSlide),
              description: 'Time in milliseconds between automatic slide transitions (Default: 4000ms = 4s).',
            },
          },
        ],
      },
      {
        type: 'row',
        fields: [
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
              description: 'Number of cards to advance when clicking the navigation arrow.',
            },
          },
        ],
      },
    ],
  },

  // ─── Image Cards Array ────────────────────────────────────────────────────
  {
    name: 'cards',
    type: 'array',
    label: 'Image Showcase Cards',
    fields: [
      {
        name: 'image',
        type: 'upload',
        relationTo: 'media',
        label: 'Card Background Image',
        required: false,
      },

      // Title
      {
        name: 'titleGroup',
        type: 'group',
        label: 'Card Title',
        fields: [
          {
            name: 'text',
            type: 'text',
            label: 'Title Text (supports inline HTML)',
            defaultValue: 'Cross-Border Payments',
          },
          {
            type: 'row',
            fields: [
              textColorPickerAll({
                overrides: {
                  name: 'color',
                  label: 'Color',
                  defaultValue: 'text-white',
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
                name: 'fontWeight',
                type: 'select',
                label: 'Font Weight',
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

      // Margin Bottom Between Title and Description
      {
        type: 'row',
        fields: [
          {
            name: 'titleSpacingBottom',
            type: 'select',
            label: 'Margin Bottom Between Title & Description',
            defaultValue: '12px',
            validate: allowAnySelect,
            options: [
              { label: '0px (No Margin)', value: '0px' },
              { label: '8px', value: '8px' },
              { label: '12px (Default)', value: '12px' },
              { label: '16px', value: '16px' },
              { label: '20px', value: '20px' },
              { label: '24px', value: '24px' },
              { label: 'Custom Value', value: 'custom' },
            ],
            admin: {
              width: '50%',
              description: 'Spacing between the card title and description.',
            },
          },
          {
            name: 'titleSpacingBottomCustom',
            type: 'text',
            label: 'Custom Margin Bottom (e.g. 14px)',
            admin: {
              width: '50%',
              condition: (_, siblingData) => siblingData?.titleSpacingBottom === 'custom',
            },
          },
        ],
      },

      // Description
      {
        name: 'descriptionGroup',
        type: 'group',
        label: 'Card Description',
        fields: [
          {
            name: 'text',
            type: 'textarea',
            label: 'Description Text (supports inline HTML)',
            defaultValue:
              'Enable fast, low-cost international settlements with institutional-grade security.',
          },
          {
            type: 'row',
            fields: [
              textColorPickerAll({
                overrides: {
                  name: 'color',
                  label: 'Color',
                  defaultValue: 'text-white/80',
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
                name: 'fontWeight',
                type: 'select',
                label: 'Font Weight',
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

      // Action Button (Slide up from bottom on hover)
      {
        name: 'buttonGroup',
        type: 'group',
        label: 'Action Button (Slides Up from Bottom on Hover)',
        fields: [
          {
            name: 'showButton',
            type: 'checkbox',
            label: 'Enable Button',
            defaultValue: true,
          },
          {
            name: 'text',
            type: 'text',
            label: 'Button Label',
            defaultValue: 'Learn more',
            admin: {
              condition: (_, siblingData) => siblingData?.showButton !== false,
            },
          },
          {
            type: 'row',
            admin: {
              condition: (_, siblingData) => siblingData?.showButton !== false,
            },
            fields: [
              textColorPickerAll({
                overrides: {
                  name: 'textColor',
                  label: 'Text Color',
                  defaultValue: 'text-white',
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
                name: 'fontWeight',
                type: 'select',
                label: 'Font Weight',
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
            admin: {
              condition: (_, siblingData) => siblingData?.showButton !== false,
            },
            fields: [
              bgColorPickerAll({
                overrides: {
                  name: 'iconBgColor',
                  label: 'Circled Icon Background Color',
                  defaultValue: 'bg-white',
                  validate: allowAnySelect,
                  admin: { width: '50%' },
                },
              }),
              textColorPickerAll({
                overrides: {
                  name: 'iconColor',
                  label: 'Circled Icon Arrow Color',
                  defaultValue: 'text-gray-900',
                  validate: allowAnySelect,
                  admin: { width: '50%' },
                },
              }),
            ],
          },
          link({
            appearances: false,
            disableLabel: true,
            required: false,
            condition: (_, siblingData) => siblingData?.showButton !== false,
            overrides: {
              name: 'link',
              label: 'Button Link',
            },
          }),
        ],
      },
    ],
  },
]

export const ImageSlider: Block = {
  slug: 'imageSlider',
  interfaceName: 'ImageSliderBlock',
  fields: imageSliderFields,
}
