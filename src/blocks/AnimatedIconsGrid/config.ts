import { Block, Field } from 'payload'
import { bgColorPickerAll } from '@/fields/bgColorPicker'
import { textColorPickerAll } from '@/fields/textColorPicker'
import { link } from '@/fields/link'
import { fontSizeOptions, fontWeightOptions } from '../CenteredContent/config'

const allowAnySelect = (() => true as const) as any

const alignmentOptions = [
  { label: 'Left', value: 'left' },
  { label: 'Center (Default)', value: 'center' },
  { label: 'Right', value: 'right' },
]

const desktopPaddingOptions = [
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
]

const mobilePaddingOptions = [
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
  { label: '100px', value: '100px' },
  { label: 'Custom Value', value: 'custom' },
]

export const animatedIconsGridFields: Field[] = [
  // ─── 1. Section Spacing & Background ─────────────────────────────────────
  {
    type: 'row',
    fields: [
      bgColorPickerAll({
        overrides: {
          name: 'sectionBgColor',
          label: 'Section Background Color',
          defaultValue: 'bg-[#F4F6FB]',
          validate: allowAnySelect,
          admin: { width: '33.33%' },
        },
      }),
      {
        name: 'paddingTop',
        type: 'select',
        label: 'Padding Top',
        defaultValue: 'pt-20',
        validate: allowAnySelect,
        admin: { width: '33.33%' },
        options: [
          { label: 'None (0)', value: 'pt-0' },
          { label: 'Small (pt-12)', value: 'pt-12' },
          { label: 'Medium (pt-16)', value: 'pt-16' },
          { label: 'Large (pt-20 - Default)', value: 'pt-20' },
          { label: 'Extra Large (pt-28)', value: 'pt-28' },
        ],
      },
      {
        name: 'paddingBottom',
        type: 'select',
        label: 'Padding Bottom',
        defaultValue: 'pb-20',
        validate: allowAnySelect,
        admin: { width: '33.33%' },
        options: [
          { label: 'None (0)', value: 'pb-0' },
          { label: 'Small (pb-12)', value: 'pb-12' },
          { label: 'Medium (pb-16)', value: 'pb-16' },
          { label: 'Large (pb-20 - Default)', value: 'pb-20' },
          { label: 'Extra Large (pb-28)', value: 'pb-28' },
        ],
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
          { label: 'Default Padding (Responsive 16px - 48px, Max-Width 1720px)', value: 'default' },
          { label: 'No Padding / Full Screen Bleed (0px)', value: 'none' },
          { label: 'Custom Horizontal Padding', value: 'custom' },
        ],
        admin: {
          width: '50%',
          description: 'Set custom padding to adjust the inner icon grid and content padding independently.',
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
            'Choose whether to apply padding to both sides together, left only, right only, or set separate left & right values.',
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
        options: desktopPaddingOptions,
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
        options: mobilePaddingOptions,
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
        options: desktopPaddingOptions,
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
        options: mobilePaddingOptions,
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
        options: desktopPaddingOptions,
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
        options: mobilePaddingOptions,
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

  // ─── 2. Main Heading Group ───────────────────────────────────────────────
  {
    name: 'headingGroup',
    type: 'group',
    label: 'Main Heading Settings',
    fields: [
      {
        name: 'heading',
        type: 'text',
        label: 'Heading Text',
        defaultValue: 'Access <style="color:#0256FF">50+ Connectors</style>',
        admin: {
          description:
            'Supports inline styles such as <style="color:#0256FF">50+ Connectors</style> or <strong>bold</strong>.',
        },
      },
      {
        type: 'row',
        fields: [
          textColorPickerAll({
            overrides: {
              name: 'headingColor',
              label: 'Base Heading Color',
              defaultValue: 'text-gray-950',
              validate: allowAnySelect,
              admin: { width: '25%' },
            },
          }),
          {
            name: 'headingFontSize',
            type: 'select',
            label: 'Font Size',
            defaultValue: 'text-4xl md:text-5xl lg:text-6xl',
            validate: allowAnySelect,
            options: fontSizeOptions,
            admin: { width: '25%' },
          },
          {
            name: 'headingFontWeight',
            type: 'select',
            label: 'Font Weight',
            defaultValue: 'font-bold',
            validate: allowAnySelect,
            options: fontWeightOptions,
            admin: { width: '25%' },
          },
          {
            name: 'headingAlignment',
            type: 'select',
            label: 'Alignment',
            defaultValue: 'center',
            validate: allowAnySelect,
            options: alignmentOptions,
            admin: { width: '25%' },
          },
        ],
      },
      {
        type: 'row',
        fields: [
          {
            name: 'headingFontSizeMobile',
            type: 'select',
            label: 'Heading Font Size (Mobile < 768px)',
            defaultValue: '',
            validate: allowAnySelect,
            options: [
              { label: 'Inherit / Auto Responsive', value: '' },
              ...fontSizeOptions,
            ],
            admin: {
              width: '50%',
              description: 'Overrides heading font size on mobile screens.',
            },
          },
          {
            name: 'headingFontWeightMobile',
            type: 'select',
            label: 'Heading Font Weight (Mobile < 768px)',
            defaultValue: '',
            validate: allowAnySelect,
            options: [
              { label: 'Inherit / Default', value: '' },
              ...fontWeightOptions,
            ],
            admin: {
              width: '50%',
              description: 'Overrides heading font weight on mobile screens.',
            },
          },
        ],
      },
    ],
  },

  // ─── 3. Description Group ────────────────────────────────────────────────
  {
    name: 'descriptionGroup',
    type: 'group',
    label: 'Description Text Settings',
    fields: [
      {
        name: 'description',
        type: 'textarea',
        label: 'Description Text',
        defaultValue:
          "Fintech Connect ships with pre-built connectors to the world's leading banking, payments, compliance, and crypto infrastructure providers.",
      },
      {
        type: 'row',
        fields: [
          textColorPickerAll({
            overrides: {
              name: 'descriptionColor',
              label: 'Description Color',
              defaultValue: 'text-gray-700',
              validate: allowAnySelect,
              admin: { width: '25%' },
            },
          }),
          {
            name: 'descriptionFontSize',
            type: 'select',
            label: 'Font Size',
            defaultValue: 'text-base md:text-lg',
            validate: allowAnySelect,
            options: fontSizeOptions,
            admin: { width: '25%' },
          },
          {
            name: 'descriptionFontWeight',
            type: 'select',
            label: 'Font Weight',
            defaultValue: 'font-normal',
            validate: allowAnySelect,
            options: fontWeightOptions,
            admin: { width: '25%' },
          },
          {
            name: 'descriptionAlignment',
            type: 'select',
            label: 'Alignment',
            defaultValue: 'center',
            validate: allowAnySelect,
            options: alignmentOptions,
            admin: { width: '25%' },
          },
        ],
      },
      {
        type: 'row',
        fields: [
          {
            name: 'descriptionFontSizeMobile',
            type: 'select',
            label: 'Description Font Size (Mobile < 768px)',
            defaultValue: '',
            validate: allowAnySelect,
            options: [
              { label: 'Inherit / Auto Responsive', value: '' },
              ...fontSizeOptions,
            ],
            admin: {
              width: '50%',
              description: 'Overrides description font size on mobile screens.',
            },
          },
          {
            name: 'descriptionFontWeightMobile',
            type: 'select',
            label: 'Description Font Weight (Mobile < 768px)',
            defaultValue: '',
            validate: allowAnySelect,
            options: [
              { label: 'Inherit / Default', value: '' },
              ...fontWeightOptions,
            ],
            admin: {
              width: '50%',
              description: 'Overrides description font weight on mobile screens.',
            },
          },
        ],
      },
    ],
  },

  // ─── 4. Button / CTA Group ───────────────────────────────────────────────
  {
    name: 'buttonGroup',
    type: 'group',
    label: 'Button / Link Settings',
    fields: [
      {
        name: 'enableButton',
        type: 'checkbox',
        label: 'Enable Button',
        defaultValue: true,
      },
      {
        name: 'buttonText',
        type: 'text',
        label: 'Button Label',
        defaultValue: 'Explore FintecConnect',
        admin: { condition: (_, s) => s?.enableButton !== false },
      },
      link({
        appearances: false,
        disableLabel: true,
        required: false,
        overrides: {
          name: 'buttonLink',
          label: 'Button Link',
          admin: { condition: (_, s) => s?.enableButton !== false },
        },
      }),
      {
        type: 'row',
        admin: { condition: (_, s) => s?.enableButton !== false },
        fields: [
          bgColorPickerAll({
            overrides: {
              name: 'buttonBgColor',
              label: 'Button Background',
              defaultValue: 'bg-[#1D4ED8]',
              validate: allowAnySelect,
              admin: { width: '25%' },
            },
          }),
          textColorPickerAll({
            overrides: {
              name: 'buttonTextColor',
              label: 'Text Color',
              defaultValue: 'text-white',
              validate: allowAnySelect,
              admin: { width: '25%' },
            },
          }),
          bgColorPickerAll({
            overrides: {
              name: 'iconCircleBg',
              label: 'Icon Circle BG',
              defaultValue: 'bg-white',
              validate: allowAnySelect,
              admin: { width: '25%' },
            },
          }),
          textColorPickerAll({
            overrides: {
              name: 'iconColor',
              label: 'Icon Arrow Color',
              defaultValue: 'text-[#1D4ED8]',
              validate: allowAnySelect,
              admin: { width: '25%' },
            },
          }),
        ],
      },
      {
        type: 'row',
        admin: { condition: (_, s) => s?.enableButton !== false },
        fields: [
          {
            name: 'buttonAlignment',
            type: 'select',
            label: 'Button Alignment',
            defaultValue: 'center',
            validate: allowAnySelect,
            options: alignmentOptions,
            admin: { width: '33.33%' },
          },
          {
            name: 'buttonFontSize',
            type: 'select',
            label: 'Button Font Size',
            defaultValue: 'text-sm',
            validate: allowAnySelect,
            options: fontSizeOptions,
            admin: { width: '33.33%' },
          },
          {
            name: 'buttonFontWeight',
            type: 'select',
            label: 'Button Font Weight',
            defaultValue: 'font-semibold',
            validate: allowAnySelect,
            options: fontWeightOptions,
            admin: { width: '33.33%' },
          },
        ],
      },
      {
        type: 'row',
        admin: { condition: (_, s) => s?.enableButton !== false },
        fields: [
          {
            name: 'buttonFontSizeMobile',
            type: 'select',
            label: 'Button Font Size (Mobile < 768px)',
            defaultValue: '',
            validate: allowAnySelect,
            options: [
              { label: 'Inherit / Auto Responsive', value: '' },
              ...fontSizeOptions,
            ],
            admin: {
              width: '50%',
              description: 'Overrides button font size on mobile screens.',
            },
          },
          {
            name: 'buttonFontWeightMobile',
            type: 'select',
            label: 'Button Font Weight (Mobile < 768px)',
            defaultValue: '',
            validate: allowAnySelect,
            options: [
              { label: 'Inherit / Default', value: '' },
              ...fontWeightOptions,
            ],
            admin: {
              width: '50%',
              description: 'Overrides button font weight on mobile screens.',
            },
          },
        ],
      },
    ],
  },

  // ─── 5. Card Animation & Timing Settings ──────────────────────────────────
  {
    name: 'animationSettings',
    type: 'group',
    label: 'Card Animation & Timing Settings',
    admin: {
      description:
        'Configure the randomized fade-in and fade-out speed, delay times, and opacity for the 21 icon cards.',
    },
    fields: [
      {
        type: 'row',
        fields: [
          {
            name: 'speedPreset',
            type: 'select',
            label: 'Animation Speed Preset',
            defaultValue: 'default',
            validate: allowAnySelect,
            options: [
              {
                label: 'Default Speed (3.5s fade, 6s–12s visible, 2.5s–4.5s hidden)',
                value: 'default',
              },
              {
                label: 'Fast & Lively (1.5s fade, 2s–4s visible, 1s–2s hidden)',
                value: 'fast',
              },
              {
                label: 'Slow & Calm (5s fade, 10s–16s visible, 4s–7s hidden)',
                value: 'slow',
              },
              {
                label: 'Ultra Slow Breathing (7s fade, 15s–25s visible, 6s–10s hidden)',
                value: 'ultraSlow',
              },
              {
                label: 'Custom Timing (Enter Custom Delays in Milliseconds Below)',
                value: 'custom',
              },
            ],
            admin: {
              width: '50%',
              description:
                'Quickly pick a pre-tuned animation speed, or choose "Custom Timing" to configure exact millisecond values.',
            },
          },
          {
            name: 'fadedOpacity',
            type: 'select',
            label: 'Faded Card Opacity Level',
            defaultValue: '0.35',
            validate: allowAnySelect,
            options: [
              { label: '35% Opacity (Default — Frosted outline visible)', value: '0.35' },
              { label: '0% Opacity (Completely invisible when faded)', value: '0' },
              { label: '15% Opacity (Very faint outline)', value: '0.15' },
              { label: '25% Opacity (Soft outline)', value: '0.25' },
              { label: '50% Opacity (Semi-transparent)', value: '0.50' },
            ],
            admin: {
              width: '50%',
              description: 'Opacity of the card when it fades out.',
            },
          },
        ],
      },

      // ── Granular Timing Inputs (Visible only when Custom Timing is selected) ────
      {
        type: 'row',
        admin: {
          condition: (_, siblingData) => siblingData?.speedPreset === 'custom',
        },
        fields: [
          {
            name: 'fadeDuration',
            type: 'number',
            label: 'Fade Transition Duration (ms)',
            defaultValue: 3500,
            min: 200,
            max: 20000,
            admin: {
              width: '33.33%',
              description:
                'Duration of the fade transition in ms (Default: 3500ms = 3.5s). Lower = faster fade, Higher = slower fade.',
            },
          },
          {
            name: 'visibleDelayMin',
            type: 'number',
            label: 'Min Visible Duration (ms)',
            defaultValue: 6000,
            min: 500,
            max: 60000,
            admin: {
              width: '33.33%',
              description:
                'Minimum time a card remains visible before fading out (Default: 6000ms = 6s).',
            },
          },
          {
            name: 'visibleDelayMax',
            type: 'number',
            label: 'Max Visible Duration (ms)',
            defaultValue: 12000,
            min: 500,
            max: 60000,
            admin: {
              width: '33.33%',
              description:
                'Maximum time a card remains visible before fading out (Default: 12000ms = 12s).',
            },
          },
        ],
      },
      {
        type: 'row',
        admin: {
          condition: (_, siblingData) => siblingData?.speedPreset === 'custom',
        },
        fields: [
          {
            name: 'hiddenDelayMin',
            type: 'number',
            label: 'Min Faded-Out Duration (ms)',
            defaultValue: 2500,
            min: 200,
            max: 60000,
            admin: {
              width: '33.33%',
              description:
                'Minimum time a card stays faded out before fading back in (Default: 2500ms = 2.5s).',
            },
          },
          {
            name: 'hiddenDelayMax',
            type: 'number',
            label: 'Max Faded-Out Duration (ms)',
            defaultValue: 4500,
            min: 200,
            max: 60000,
            admin: {
              width: '33.33%',
              description:
                'Maximum time a card stays faded out before fading back in (Default: 4500ms = 4.5s).',
            },
          },
          {
            name: 'initialStaggerMax',
            type: 'number',
            label: 'Initial Stagger Spread (ms)',
            defaultValue: 8000,
            min: 500,
            max: 30000,
            admin: {
              width: '33.33%',
              description:
                'Max initial random delay so cards desynchronize naturally (Default: 8000ms = 8s).',
            },
          },
        ],
      },
    ],
  },

  // ─── 6. Small Cards Array (PNG Image Cards) ──────────────────────────────
  {
    name: 'cards',
      type: 'array',
      label: 'Small Card Items (Up to 24 Items)',
      minRows: 0,
      maxRows: 24,
      admin: {
        description:
          'Add items with PNG/SVG images. Select which card slot each image belongs to, or leave as Auto.',
      },
      fields: [
        {
          name: 'slotNumber',
          type: 'select',
          label: 'Card Position / Slot Number',
          defaultValue: 'auto',
          validate: allowAnySelect,
          admin: {
            description:
              'Choose which card slot this image displays on (Card 1 to Card 24). Leave as Auto to fill sequentially.',
          },
          options: [
            { label: 'Auto (Next available slot)', value: 'auto' },
            { label: 'Card 1 — Left Wing (Row 1, Col 1) • Mobile: Row 1, Col 1', value: '1' },
            { label: 'Card 2 — Left Wing (Row 1, Col 2) • Mobile: Row 1, Col 2', value: '2' },
            { label: 'Card 3 — Left Wing (Row 2, Col 1) • Mobile: Row 1, Col 3', value: '3' },
            { label: 'Card 4 — Left Wing (Row 2, Col 2) • Mobile: Row 1, Col 4', value: '4' },
            { label: 'Card 5 — Left Wing (Row 3, Col 1) • Mobile: Row 1, Col 5', value: '5' },
            { label: 'Card 6 — Left Wing (Row 3, Col 2) • Mobile: Row 1, Col 6', value: '6' },
            { label: 'Card 7 — Left Wing (Row 4, Col 1) • Mobile: Row 2, Col 1', value: '7' },
            { label: 'Card 8 — Left Wing (Row 4, Col 2) • Mobile: Row 2, Col 2 (Behind Text)', value: '8' },
            { label: 'Card 9 — Top Center (Row 1, Col 3) • Mobile: Row 2, Col 3 (Behind Text)', value: '9' },
            { label: 'Card 10 — Top Center (Row 1, Col 4) • Mobile: Row 2, Col 4 (Behind Text)', value: '10' },
            { label: 'Card 11 — Top Center (Row 1, Col 5) • Mobile: Row 2, Col 5 (Behind Text)', value: '11' },
            { label: 'Card 12 — Top Center (Row 1, Col 6) • Mobile: Row 2, Col 6', value: '12' },
            { label: 'Card 13 — Top Center (Row 1, Col 7) • Mobile: Row 3, Col 1', value: '13' },
            { label: 'Card 14 — Right Wing (Row 1, Col 8) • Mobile: Row 3, Col 2 (Behind Button)', value: '14' },
            { label: 'Card 15 — Right Wing (Row 1, Col 9) • Mobile: Row 3, Col 3 (Behind Button)', value: '15' },
            { label: 'Card 16 — Right Wing (Row 2, Col 8) • Mobile: Row 3, Col 4 (Behind Button)', value: '16' },
            { label: 'Card 17 — Right Wing (Row 2, Col 9) • Mobile: Row 3, Col 5 (Behind Button)', value: '17' },
            { label: 'Card 18 — Right Wing (Row 3, Col 8) • Mobile: Row 3, Col 6', value: '18' },
            { label: 'Card 19 — Right Wing (Row 3, Col 9) • Mobile: Row 4, Col 1', value: '19' },
            { label: 'Card 20 — Right Wing (Row 4, Col 8) • Mobile: Row 4, Col 2', value: '20' },
            { label: 'Card 21 — Right Wing (Row 4, Col 9) • Mobile: Row 4, Col 3', value: '21' },
            { label: 'Card 22 — Mobile: Row 4, Col 4', value: '22' },
            { label: 'Card 23 — Mobile: Row 4, Col 5', value: '23' },
            { label: 'Card 24 — Mobile: Row 4, Col 6', value: '24' },
          ],
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          label: 'Card Icon / Logo Image (PNG/SVG)',
          required: false,
        },
        {
          name: 'altText',
          type: 'text',
          label: 'Alt / Brand Label',
          required: false,
        },
        {
          name: 'cardBgColor',
          type: 'text',
          label: 'Custom Card Background (optional)',
          admin: {
            description: 'Leave blank for default frosted white card.',
          },
        },
      ],
    },
  ]

export const AnimatedIconsGrid: Block = {
  slug: 'animatedIconsGrid',
  labels: {
    singular: 'Animated Icons Grid',
    plural: 'Animated Icons Grid Blocks',
  },
  fields: animatedIconsGridFields,
}

