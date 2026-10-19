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
      label: 'Small Card Items (Up to 21 on Desktop)',
      minRows: 0,
      maxRows: 21,
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
              'Choose which card slot this image displays on (Card 1 to Card 21). Leave as Auto to fill sequentially.',
          },
          options: [
            { label: 'Auto (Next available slot)', value: 'auto' },
            { label: 'Card 1 — Left Wing (Row 1, Col 1) • Mobile: Top Row, Col 1', value: '1' },
            { label: 'Card 2 — Left Wing (Row 1, Col 2) • Mobile: Left Wing, Row 2', value: '2' },
            { label: 'Card 3 — Left Wing (Row 2, Col 1) • Mobile: Left Wing, Row 3', value: '3' },
            { label: 'Card 4 — Left Wing (Row 2, Col 2) • Mobile: Left Wing, Row 4', value: '4' },
            { label: 'Card 5 — Left Wing (Row 3, Col 1) • Desktop Only', value: '5' },
            { label: 'Card 6 — Left Wing (Row 3, Col 2) • Desktop Only', value: '6' },
            { label: 'Card 7 — Left Wing (Row 4, Col 1) • Desktop Only', value: '7' },
            { label: 'Card 8 — Left Wing (Row 4, Col 2) • Desktop Only', value: '8' },
            { label: 'Card 9 — Top Center (Row 1, Col 3) • Mobile: Top Row, Col 2', value: '9' },
            { label: 'Card 10 — Top Center (Row 1, Col 4) • Mobile: Top Row, Col 3', value: '10' },
            { label: 'Card 11 — Top Center (Row 1, Col 5) • Mobile: Top Row, Col 4', value: '11' },
            { label: 'Card 12 — Top Center (Row 1, Col 6) • Mobile: Top Row, Col 5', value: '12' },
            { label: 'Card 13 — Top Center (Row 1, Col 7) • Mobile: Top Row, Col 6', value: '13' },
            { label: 'Card 14 — Right Wing (Row 1, Col 8) • Mobile: Top Row, Col 7', value: '14' },
            { label: 'Card 15 — Right Wing (Row 1, Col 9) • Mobile: Right Wing, Row 2', value: '15' },
            { label: 'Card 16 — Right Wing (Row 2, Col 8) • Mobile: Right Wing, Row 3', value: '16' },
            { label: 'Card 17 — Right Wing (Row 2, Col 9) • Mobile: Right Wing, Row 4', value: '17' },
            { label: 'Card 18 — Right Wing (Row 3, Col 8) • Desktop Only', value: '18' },
            { label: 'Card 19 — Right Wing (Row 3, Col 9) • Desktop Only', value: '19' },
            { label: 'Card 20 — Right Wing (Row 4, Col 8) • Desktop Only', value: '20' },
            { label: 'Card 21 — Right Wing (Row 4, Col 9) • Desktop Only', value: '21' },
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

