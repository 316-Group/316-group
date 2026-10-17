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

export const featureCardsFields: Field[] = [
  // ─── 1. Section Spacing & Background ─────────────────────────────────────
  {
    type: 'row',
    fields: [
      bgColorPickerAll({
        overrides: {
          name: 'sectionBgColor',
          label: 'Section Background Color',
          defaultValue: 'bg-transparent',
          validate: allowAnySelect,
          admin: { width: '33.33%' },
        },
      }),
      {
        name: 'paddingTop',
        type: 'select',
        label: 'Padding Top',
        defaultValue: 'pt-16',
        validate: allowAnySelect,
        admin: { width: '33.33%' },
        options: [
          { label: 'None (0)', value: 'pt-0' },
          { label: 'Small (pt-12)', value: 'pt-12' },
          { label: 'Medium (pt-16 - Default)', value: 'pt-16' },
          { label: 'Large (pt-20)', value: 'pt-20' },
          { label: 'Extra Large (pt-28)', value: 'pt-28' },
        ],
      },
      {
        name: 'paddingBottom',
        type: 'select',
        label: 'Padding Bottom',
        defaultValue: 'pb-16',
        validate: allowAnySelect,
        admin: { width: '33.33%' },
        options: [
          { label: 'None (0)', value: 'pb-0' },
          { label: 'Small (pb-12)', value: 'pb-12' },
          { label: 'Medium (pb-16 - Default)', value: 'pb-16' },
          { label: 'Large (pb-20)', value: 'pb-20' },
          { label: 'Extra Large (pb-28)', value: 'pb-28' },
        ],
      },
    ],
  },

  // ─── 2. Cards Array (Max 3 Per Row) ──────────────────────────────────────
  {
    name: 'cards',
    type: 'array',
    label: 'Feature Cards (Max 3 Per Row)',
    minRows: 1,
    defaultValue: [
      {
        headingGroup: {
          heading: 'AES-256 Encryption',
          headingColor: 'text-gray-950',
          headingFontSize: 'text-2xl md:text-[1.65rem]',
          headingFontWeight: 'font-bold',
          headingAlignment: 'left',
        },
        descriptionGroup: {
          description:
            'All data at rest is encrypted with AES-256. All data in transit is protected with TLS 1.3. Cryptographic keys are managed via HSM with automatic rotation.',
          descriptionColor: 'text-gray-600',
          descriptionFontSize: 'text-sm md:text-base',
          descriptionFontWeight: 'font-normal',
          descriptionAlignment: 'left',
        },
        iconGroup: {
          iconCardBgColor: 'bg-[#EFF2FE]',
          iconAlignment: 'left',
        },
        cardBgColor: 'bg-white',
      },
      {
        headingGroup: {
          heading: 'MPC Crypto Custody',
          headingColor: 'text-gray-950',
          headingFontSize: 'text-2xl md:text-[1.65rem]',
          headingFontWeight: 'font-bold',
          headingAlignment: 'left',
        },
        descriptionGroup: {
          description:
            'Digital assets are secured with Multi-Party Computation (MPC) technology. No single point of key compromise. Hot/cold storage tiering with institutional-grade custody controls.',
          descriptionColor: 'text-gray-600',
          descriptionFontSize: 'text-sm md:text-base',
          descriptionFontWeight: 'font-normal',
          descriptionAlignment: 'left',
        },
        iconGroup: {
          iconCardBgColor: 'bg-[#EFF2FE]',
          iconAlignment: 'left',
        },
        cardBgColor: 'bg-white',
      },
      {
        headingGroup: {
          heading: 'Banking Rails',
          headingColor: 'text-gray-950',
          headingFontSize: 'text-2xl md:text-[1.65rem]',
          headingFontWeight: 'font-bold',
          headingAlignment: 'left',
        },
        descriptionGroup: {
          description:
            'Continuous SIEM monitoring, automated vulnerability scanning, and a dedicated security operations centre (SOC) watching your platform around the clock.',
          descriptionColor: 'text-gray-600',
          descriptionFontSize: 'text-sm md:text-base',
          descriptionFontWeight: 'font-normal',
          descriptionAlignment: 'left',
        },
        iconGroup: {
          iconCardBgColor: 'bg-[#EFF2FE]',
          iconAlignment: 'left',
        },
        cardBgColor: 'bg-white',
      },
    ],
    fields: [
      // ── Card Container Style ──
      bgColorPickerAll({
        overrides: {
          name: 'cardBgColor',
          label: 'Card Background Color',
          defaultValue: 'bg-white',
          validate: allowAnySelect,
        },
      }),

      // ── Icon Area Settings ──
      {
        name: 'iconGroup',
        type: 'group',
        label: 'Icon Area Settings',
        fields: [
          {
            name: 'icon',
            type: 'upload',
            relationTo: 'media',
            label: 'Upload Icon Image (SVG / PNG)',
          },
          {
            type: 'row',
            fields: [
              bgColorPickerAll({
                overrides: {
                  name: 'iconCardBgColor',
                  label: 'Icon Badge Background',
                  defaultValue: 'bg-[#EFF2FE]',
                  validate: allowAnySelect,
                  admin: { width: '50%' },
                },
              }),
              {
                name: 'iconAlignment',
                type: 'select',
                label: 'Icon Badge Alignment',
                defaultValue: 'left',
                validate: allowAnySelect,
                options: alignmentOptions,
                admin: { width: '50%' },
              },
            ],
          },
        ],
      },

      // ── Heading Settings ──
      {
        name: 'headingGroup',
        type: 'group',
        label: 'Heading Settings',
        fields: [
          {
            name: 'heading',
            type: 'text',
            label: 'Heading Text',
            required: true,
            defaultValue: 'Feature Title',
            admin: {
              description:
                'Supports inline styling like <style="color:#0256FF">highlighted text</style>.',
            },
          },
          {
            type: 'row',
            fields: [
              textColorPickerAll({
                overrides: {
                  name: 'headingColor',
                  label: 'Heading Color',
                  defaultValue: 'text-gray-950',
                  validate: allowAnySelect,
                  admin: { width: '25%' },
                },
              }),
              {
                name: 'headingFontSize',
                type: 'select',
                label: 'Font Size',
                defaultValue: 'text-2xl md:text-[1.65rem]',
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
                defaultValue: 'left',
                validate: allowAnySelect,
                options: alignmentOptions,
                admin: { width: '25%' },
              },
            ],
          },
        ],
      },

      // ── Description Settings ──
      {
        name: 'descriptionGroup',
        type: 'group',
        label: 'Description Settings',
        fields: [
          {
            name: 'description',
            type: 'textarea',
            label: 'Description Text',
          },
          {
            type: 'row',
            fields: [
              textColorPickerAll({
                overrides: {
                  name: 'descriptionColor',
                  label: 'Description Color',
                  defaultValue: 'text-gray-600',
                  validate: allowAnySelect,
                  admin: { width: '25%' },
                },
              }),
              {
                name: 'descriptionFontSize',
                type: 'select',
                label: 'Font Size',
                defaultValue: 'text-sm md:text-base',
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
                defaultValue: 'left',
                validate: allowAnySelect,
                options: alignmentOptions,
                admin: { width: '25%' },
              },
            ],
          },
        ],
      },
    ],
  },
]

export const FeatureCards: Block = {
  slug: 'featureCards',
  labels: {
    singular: 'Feature Cards',
    plural: 'Feature Cards Blocks',
  },
  fields: featureCardsFields,
}
