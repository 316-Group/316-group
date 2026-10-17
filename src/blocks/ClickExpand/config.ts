import { Block, Field } from 'payload'
import { bgColorPickerAll } from '@/fields/bgColorPicker'
import { textColorPickerAll } from '@/fields/textColorPicker'
import { link } from '@/fields/link'
import { fontSizeOptions, fontWeightOptions } from '../CenteredContent/config'

export const buttonBgOptions = [
  { label: 'Semi-Transparent White (bg-white/20 - Default)', value: 'bg-white/20' },
  { label: 'Light Transparent White (bg-white/10)', value: 'bg-white/10' },
  { label: 'Frosted White (bg-white/30)', value: 'bg-white/30' },
  { label: 'Solid White (bg-white)', value: 'bg-white' },
  { label: 'Semi-Transparent Dark (bg-black/30)', value: 'bg-black/30' },
  { label: 'Solid Black (bg-black)', value: 'bg-black' },
  { label: 'Accent Indigo (#3F5AC9)', value: 'bg-[#3F5AC9]' },
  { label: 'Custom Blue (#0256FF)', value: 'bg-blue-custom' },
  { label: 'Slate 800 (bg-slate-800)', value: 'bg-slate-800' },
  { label: 'Glass with Border (bg-white/15 border border-white/30)', value: 'bg-white/15 border border-white/30' },
]

export const clickExpandFields: Field[] = [
  // ─── Section Background & Spacing ──────────────────────────────────────────
  {
    type: 'row',
    fields: [
      bgColorPickerAll({
        overrides: {
          name: 'sectionBgColor',
          label: 'Section Background Color',
          defaultValue: 'bg-white',
          admin: {
            width: '33.33%',
          },
        },
      }),
      {
        name: 'paddingTop',
        type: 'select',
        label: 'Padding Top',
        defaultValue: 'pt-16',
        options: [
          { label: 'None (0)', value: 'pt-0' },
          { label: 'Extra Small (pt-4)', value: 'pt-4' },
          { label: 'Small (pt-8)', value: 'pt-8' },
          { label: 'Medium (pt-12)', value: 'pt-12' },
          { label: 'Standard (pt-16 - Default)', value: 'pt-16' },
          { label: 'Large (pt-20)', value: 'pt-20' },
          { label: 'Extra Large (pt-24)', value: 'pt-24' },
          { label: '2X Large (pt-32)', value: 'pt-32' },
        ],
        admin: {
          width: '33.33%',
        },
      },
      {
        name: 'paddingBottom',
        type: 'select',
        label: 'Padding Bottom',
        defaultValue: 'pb-16',
        options: [
          { label: 'None (0)', value: 'pb-0' },
          { label: 'Extra Small (pb-4)', value: 'pb-4' },
          { label: 'Small (pb-8)', value: 'pb-8' },
          { label: 'Medium (pb-12)', value: 'pb-12' },
          { label: 'Standard (pb-16 - Default)', value: 'pb-16' },
          { label: 'Large (pb-20)', value: 'pb-20' },
          { label: 'Extra Large (pb-24)', value: 'pb-24' },
          { label: '2X Large (pb-32)', value: 'pb-32' },
        ],
        admin: {
          width: '33.33%',
        },
      },
    ],
  },

  // ─── Height & Scroll Behavior ──────────────────────────────────────────────
  {
    type: 'row',
    fields: [
      {
        name: 'cardHeight',
        type: 'select',
        label: 'Cards Height',
        defaultValue: 'h-[520px] md:h-[620px] lg:h-[660px]',
        options: [
          { label: 'Compact (h-500px)', value: 'h-[460px] md:h-[500px]' },
          { label: 'Medium (h-580px)', value: 'h-[480px] md:h-[580px]' },
          { label: 'Standard (h-660px - Default)', value: 'h-[520px] md:h-[620px] lg:h-[660px]' },
          { label: 'Large (h-740px)', value: 'h-[560px] md:h-[680px] lg:h-[740px]' },
          { label: 'Viewport Height (80vh)', value: 'h-[70vh] md:h-[80vh]' },
        ],
        admin: {
          width: '50%',
        },
      },
      {
        name: 'scrollBehavior',
        type: 'select',
        label: 'Mouse Scroll Interaction',
        defaultValue: 'sticky',
        options: [
          {
            label: 'Pinned Sticky Scroll (Locks section on screen while scrolling mouse through cards, page continues only after last item)',
            value: 'sticky',
          },
          {
            label: 'Mouse Wheel Step on Hover (Advances card on wheel, then releases scroll)',
            value: 'wheel',
          },
          {
            label: 'Click Only (No scroll locking)',
            value: 'clickOnly',
          },
        ],
        admin: {
          width: '50%',
          description: 'Control how mouse wheel scroll interacts with the cards.',
        },
      },
    ],
  },

  {
    name: 'showIndicators',
    type: 'checkbox',
    label: 'Show Bottom Position Indicators / Pill Dots',
    defaultValue: true,
  },

  // ─── Expandable Cards Array ────────────────────────────────────────────────
  {
    name: 'cards',
    type: 'array',
    label: 'Expandable Card Items',
    minRows: 1,
    admin: {
      initCollapsed: false,
      components: {
        RowLabel: '/blocks/ClickExpand/RowLabel#RowLabel',
      },
    },
    fields: [
      // Background Image
      {
        name: 'image',
        type: 'upload',
        relationTo: 'media',
        label: 'Card Background Image',
        required: true,
      },
      {
        name: 'overlayStyle',
        type: 'select',
        label: 'Image Dark Overlay Style',
        defaultValue: 'vignette',
        options: [
          { label: 'Vignette Dark Gradient (Recommended)', value: 'vignette' },
          { label: 'Subtle Dark Overlay', value: 'subtle' },
          { label: 'Medium Dark Overlay', value: 'medium' },
          { label: 'Heavy Dark Overlay', value: 'heavy' },
          { label: 'None (Pure Image)', value: 'none' },
        ],
      },

      // ─── Heading ───────────────────────────────────────────────────────────
      {
        name: 'headingGroup',
        type: 'group',
        label: 'Heading',
        fields: [
          {
            name: 'heading',
            type: 'text',
            label: 'Heading Text (supports inline HTML like <style="color:red">, <span>, <strong>, <br />)',
            defaultValue: 'Fintech & Payments',
            required: true,
          },
          {
            type: 'row',
            fields: [
              textColorPickerAll({
                overrides: {
                  name: 'headingColor',
                  label: 'Heading Color',
                  defaultValue: 'text-white',
                  admin: {
                    width: '25%',
                  },
                },
              }),
              {
                name: 'headingFontSize',
                type: 'select',
                label: 'Active Heading Size',
                defaultValue: 'text-3xl md:text-4xl lg:text-5xl',
                options: fontSizeOptions,
                admin: {
                  width: '25%',
                },
              },
              {
                name: 'headingFontWeight',
                type: 'select',
                label: 'Heading Font Weight',
                defaultValue: 'font-bold',
                options: fontWeightOptions,
                admin: {
                  width: '25%',
                },
              },
              {
                name: 'collapsedFontSize',
                type: 'select',
                label: 'Collapsed Bottom Font Size',
                defaultValue: 'text-xl md:text-2xl',
                options: fontSizeOptions,
                admin: {
                  width: '25%',
                  description: 'Font size when this card is collapsed/inactive at the bottom.',
                },
              },
            ],
          },
        ],
      },

      // ─── Description ───────────────────────────────────────────────────────
      {
        name: 'descriptionGroup',
        type: 'group',
        label: 'Description',
        fields: [
          {
            name: 'description',
            type: 'textarea',
            label: 'Description Text (supports inline HTML like <style="color:red"> or <span style="...">)',
            defaultValue:
              'Digital wallets, multi-currency accounts, international transfers, remittance, virtual cards and everyday financial services for individuals and businesses across borders.',
          },
          {
            type: 'row',
            fields: [
              textColorPickerAll({
                overrides: {
                  name: 'descriptionColor',
                  label: 'Description Color',
                  defaultValue: 'text-white/90',
                  admin: {
                    width: '33.33%',
                  },
                },
              }),
              {
                name: 'descriptionFontSize',
                type: 'select',
                label: 'Description Font Size',
                defaultValue: 'text-base md:text-lg',
                options: fontSizeOptions,
                admin: {
                  width: '33.33%',
                },
              },
              {
                name: 'descriptionFontWeight',
                type: 'select',
                label: 'Description Font Weight',
                defaultValue: 'font-normal',
                options: fontWeightOptions,
                admin: {
                  width: '33.33%',
                },
              },
            ],
          },
        ],
      },

      // ─── Button / Action ───────────────────────────────────────────────────
      {
        name: 'buttonGroup',
        type: 'group',
        label: 'Action Button',
        fields: [
          {
            name: 'showButton',
            type: 'checkbox',
            label: 'Show Button',
            defaultValue: true,
          },
          {
            name: 'buttonText',
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
              {
                name: 'buttonBgColor',
                type: 'select',
                label: 'Button Background Style',
                defaultValue: 'bg-white/20',
                options: buttonBgOptions,
                admin: {
                  width: '33.33%',
                },
              },
              textColorPickerAll({
                overrides: {
                  name: 'buttonTextColor',
                  label: 'Button Text Color',
                  defaultValue: 'text-white',
                  admin: {
                    width: '33.33%',
                  },
                },
              }),
              {
                name: 'buttonFontSize',
                type: 'select',
                label: 'Button Font Size',
                defaultValue: 'text-base',
                options: fontSizeOptions,
                admin: {
                  width: '33.33%',
                },
              },
            ],
          },
          {
            type: 'row',
            admin: {
              condition: (_, siblingData) => siblingData?.showButton !== false,
            },
            fields: [
              {
                name: 'buttonFontWeight',
                type: 'select',
                label: 'Button Font Weight',
                defaultValue: 'font-medium',
                options: fontWeightOptions,
                admin: {
                  width: '33.33%',
                },
              },
              bgColorPickerAll({
                overrides: {
                  name: 'iconBgColor',
                  label: 'Circled Icon Background',
                  defaultValue: 'bg-white',
                  admin: {
                    width: '33.33%',
                  },
                },
              }),
              textColorPickerAll({
                overrides: {
                  name: 'iconColor',
                  label: 'Circled Icon Arrow Color',
                  defaultValue: 'text-slate-900',
                  admin: {
                    width: '33.33%',
                  },
                },
              }),
            ],
          },
          link({
            appearances: false,
            required: false,
            condition: (_, siblingData) => siblingData?.showButton !== false,
            overrides: {
              name: 'buttonLink',
              label: 'Button Link',
            },
          }),
        ],
      },
    ],
  },
]

export const ClickExpand: Block = {
  slug: 'clickExpand',
  interfaceName: 'ClickExpandBlock',
  labels: {
    singular: 'Click Expand Cards',
    plural: 'Click Expand Cards',
  },
  fields: clickExpandFields,
}
