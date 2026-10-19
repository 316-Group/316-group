import { Block, Field } from 'payload'
import { bgColorPickerAll } from '@/fields/bgColorPicker'
import { textColorPickerAll } from '@/fields/textColorPicker'
import { link } from '@/fields/link'
import { fontSizeOptions, fontWeightOptions } from '../CenteredContent/config'

const alignmentOptions = [
  { label: 'Left (Default)', value: 'left' },
  { label: 'Center', value: 'center' },
  { label: 'Right', value: 'right' },
]

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

const allowAnySelect = (() => true as const) as any

export const clickExpandFields: Field[] = [
  // ─── Section Background & Spacing ──────────────────────────────────────────
  {
    type: 'row',
    fields: [
      bgColorPickerAll({
        overrides: {
          name: 'sectionBgColor',
          label: 'Section Background Color',
          defaultValue: 'bg-transparent',
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
        validate: allowAnySelect,
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
        validate: allowAnySelect,
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
          { label: 'Default Padding (Matches Standard Container Margins)', value: 'default' },
          { label: 'No Padding / Full Column Width (0px)', value: 'none' },
          { label: 'Custom Horizontal Padding', value: 'custom' },
        ],
        admin: {
          width: '33.33%',
          description: 'Set to "No Padding" to let cards fill the 100% full width of the column.',
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

  // ─── Height & Scroll Behavior ──────────────────────────────────────────────
  {
    type: 'row',
    fields: [
      {
        name: 'cardHeight',
        type: 'select',
        label: 'Cards Height',
        defaultValue: 'h-[580px] md:h-[680px] lg:h-[720px]',
        validate: allowAnySelect,
        options: [
          { label: 'Standard (h-720px - Default)', value: 'h-[580px] md:h-[680px] lg:h-[720px]' },
          { label: 'Compact (h-520px)', value: 'h-[480px] md:h-[520px]' },
          { label: 'Medium (h-620px)', value: 'h-[520px] md:h-[620px]' },
          { label: 'Large (h-780px)', value: 'h-[620px] md:h-[720px] lg:h-[780px]' },
          { label: 'Viewport Height (85vh)', value: 'h-[75vh] md:h-[85vh]' },
          // Legacy options from previous versions of this block
          { label: 'Standard (Legacy 660px)', value: 'h-[520px] md:h-[620px] lg:h-[660px]' },
          { label: 'Compact (Legacy 500px)', value: 'h-[460px] md:h-[500px]' },
          { label: 'Medium (Legacy 580px)', value: 'h-[480px] md:h-[580px]' },
          { label: 'Large (Legacy 740px)', value: 'h-[560px] md:h-[680px] lg:h-[740px]' },
          { label: 'Viewport Height (Legacy 80vh)', value: 'h-[70vh] md:h-[80vh]' },
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
        validate: allowAnySelect,
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
    validate: allowAnySelect,
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
        required: false,
      },
      {
        type: 'row',
        fields: [
          {
            name: 'overlayStyle',
            type: 'select',
            label: 'Image Dark Overlay Style',
            defaultValue: 'vignette',
            validate: allowAnySelect,
            options: [
              { label: 'Vignette Dark Gradient (Recommended)', value: 'vignette' },
              { label: 'Subtle Dark Overlay', value: 'subtle' },
              { label: 'Medium Dark Overlay', value: 'medium' },
              { label: 'Heavy Dark Overlay', value: 'heavy' },
              { label: 'None (Pure Image)', value: 'none' },
            ],
            admin: {
              width: '50%',
            },
          },
          {
            name: 'activeBlur',
            type: 'select',
            label: 'Active Card Background Blur Effect',
            defaultValue: 'blur-[2px]',
            validate: allowAnySelect,
            options: [
              { label: 'Subtle Blur (Default - 2px)', value: 'blur-[2px]' },
              { label: 'Medium Blur (blur-sm - 4px)', value: 'blur-sm' },
              { label: 'Strong Blur (blur-md - 8px)', value: 'blur-md' },
              { label: 'No Blur (Crisp Image)', value: 'blur-none' },
            ],
            admin: {
              width: '50%',
              description: 'Applied when this card is active. Collapsed cards stay crisp with no blur.',
            },
          },
        ],
      },

      // ─── Small Top Kicker Heading (e.g. Fintech & Payments) ─────────────────
      {
        name: 'kickerGroup',
        type: 'group',
        label: 'Small Top Kicker Heading (e.g. Fintech & Payments)',
        fields: [
          {
            name: 'text',
            type: 'text',
            label: 'Kicker Text',
            defaultValue: 'Fintech & Payments',
          },
          {
            type: 'row',
            fields: [
              textColorPickerAll({
                overrides: {
                  name: 'color',
                  label: 'Kicker Color',
                  defaultValue: 'text-[#52B5D8]',
                  validate: allowAnySelect,
                  admin: {
                    width: '33.33%',
                  },
                },
              }),
              {
                name: 'fontSize',
                type: 'select',
                label: 'Kicker Font Size',
                defaultValue: 'text-base md:text-lg',
                validate: allowAnySelect,
                options: fontSizeOptions,
                admin: {
                  width: '33.33%',
                },
              },
              {
                name: 'fontWeight',
                type: 'select',
                label: 'Kicker Font Weight',
                defaultValue: 'font-semibold',
                validate: allowAnySelect,
                options: fontWeightOptions,
                admin: {
                  width: '33.33%',
                },
              },
            ],
          },
        ],
      },

      // ─── Main Heading (e.g. Making everyday finance more connected.) ─────────
      {
        name: 'headingGroup',
        type: 'group',
        label: 'Main Heading',
        fields: [
          {
            name: 'heading',
            type: 'text',
            label: 'Heading Text (supports inline HTML like <strong>, <style="color:red">, <span>)',
            defaultValue: 'Making everyday finance more connected.',
            required: false,
          },
          {
            type: 'row',
            fields: [
              textColorPickerAll({
                overrides: {
                  name: 'headingColor',
                  label: 'Heading Color',
                  defaultValue: 'text-white',
                  validate: allowAnySelect,
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
                validate: allowAnySelect,
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
                validate: allowAnySelect,
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
                validate: allowAnySelect,
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
            label: 'Description Text (supports inline HTML)',
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
                  validate: allowAnySelect,
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
                validate: allowAnySelect,
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
                validate: allowAnySelect,
                options: fontWeightOptions,
                admin: {
                  width: '33.33%',
                },
              },
            ],
          },
        ],
      },

      // ─── Floating Sub-Cards (Up to 3 cards) ────────────────────────────────
      {
        name: 'subCardsGroup',
        type: 'group',
        label: 'Floating Glass Sub-Cards (Up to 3 cards)',
        fields: [
          {
            name: 'enableSubCards',
            type: 'checkbox',
            label: 'Enable Floating Glass Cards',
            defaultValue: true,
          },
          {
            type: 'row',
            admin: {
              condition: (_, siblingData) => siblingData?.enableSubCards !== false,
            },
            fields: [
              {
                name: 'subCardsBgColor',
                type: 'select',
                label: 'Cards Transparent Overlay Background',
                defaultValue: 'bg-white/15 backdrop-blur-md',
                validate: allowAnySelect,
                options: [
                  { label: 'Transparent White 15% with Blur (Default)', value: 'bg-white/15 backdrop-blur-md' },
                  { label: 'Transparent White 10% with Blur', value: 'bg-white/10 backdrop-blur-md' },
                  { label: 'Transparent White 20% with Blur', value: 'bg-white/20 backdrop-blur-md' },
                  { label: 'Transparent White 25% with Blur', value: 'bg-white/25 backdrop-blur-md' },
                  { label: 'Transparent Dark 20% with Blur', value: 'bg-black/20 backdrop-blur-md' },
                  { label: 'Transparent Dark 30% with Blur', value: 'bg-black/30 backdrop-blur-md' },
                  { label: 'Subtle Glass (bg-white/5 backdrop-blur-sm)', value: 'bg-white/5 backdrop-blur-sm' },
                ],
                admin: {
                  width: '33.33%',
                },
              },
              {
                name: 'subCardsRounded',
                type: 'select',
                label: 'Cards Border Radius',
                defaultValue: 'rounded-2xl',
                validate: allowAnySelect,
                options: [
                  { label: 'Rounded 2XL (24px - Default)', value: 'rounded-2xl' },
                  { label: 'Rounded 3XL (32px)', value: 'rounded-3xl' },
                  { label: 'Rounded XL (16px)', value: 'rounded-xl' },
                  { label: 'Rounded LG (12px)', value: 'rounded-lg' },
                  { label: 'None', value: 'rounded-none' },
                ],
                admin: {
                  width: '33.33%',
                },
              },
              {
                name: 'subCardsBorder',
                type: 'select',
                label: 'Cards Border',
                defaultValue: 'border border-white/20',
                validate: allowAnySelect,
                options: [
                  { label: 'Subtle Glass Border (Default)', value: 'border border-white/20' },
                  { label: 'Soft Border (border-white/10)', value: 'border border-white/10' },
                  { label: 'Strong Border (border-white/30)', value: 'border border-white/30' },
                  { label: 'No Border', value: 'border-0' },
                ],
                admin: {
                  width: '33.33%',
                },
              },
            ],
          },
          {
            name: 'items',
            type: 'array',
            label: 'Sub-Card Items (Maximum 3)',
            maxRows: 3,
            minRows: 0,
            admin: {
              condition: (_, siblingData) => siblingData?.enableSubCards !== false,
            },
            fields: [
              {
                name: 'title',
                type: 'text',
                label: 'Card Heading (e.g. Multi-currency wallets)',
                required: false,
                defaultValue: 'Multi-currency wallets',
              },
              {
                type: 'row',
                fields: [
                  textColorPickerAll({
                    overrides: {
                      name: 'titleColor',
                      label: 'Heading Color',
                      defaultValue: 'text-white',
                      validate: allowAnySelect,
                      admin: {
                        width: '25%',
                      },
                    },
                  }),
                  {
                    name: 'titleFontSize',
                    type: 'select',
                    label: 'Font Size',
                    defaultValue: 'text-lg md:text-xl',
                    validate: allowAnySelect,
                    options: fontSizeOptions,
                    admin: {
                      width: '25%',
                    },
                  },
                  {
                    name: 'titleFontWeight',
                    type: 'select',
                    label: 'Font Weight',
                    defaultValue: 'font-bold',
                    validate: allowAnySelect,
                    options: fontWeightOptions,
                    admin: {
                      width: '25%',
                    },
                  },
                  {
                    name: 'titleAlignment',
                    type: 'select',
                    label: 'Heading Alignment',
                    defaultValue: 'left',
                    validate: allowAnySelect,
                    options: alignmentOptions,
                    admin: {
                      width: '25%',
                    },
                  },
                ],
              },
              {
                name: 'description',
                type: 'textarea',
                label: 'Card Description',
                defaultValue: 'Hold and manage supported currency balances.',
              },
              {
                type: 'row',
                fields: [
                  textColorPickerAll({
                    overrides: {
                      name: 'descriptionColor',
                      label: 'Description Color',
                      defaultValue: 'text-white/80',
                      validate: allowAnySelect,
                      admin: {
                        width: '25%',
                      },
                    },
                  }),
                  {
                    name: 'descriptionFontSize',
                    type: 'select',
                    label: 'Font Size',
                    defaultValue: 'text-xs md:text-sm',
                    validate: allowAnySelect,
                    options: fontSizeOptions,
                    admin: {
                      width: '25%',
                    },
                  },
                  {
                    name: 'descriptionFontWeight',
                    type: 'select',
                    label: 'Font Weight',
                    defaultValue: 'font-normal',
                    validate: allowAnySelect,
                    options: fontWeightOptions,
                    admin: {
                      width: '25%',
                    },
                  },
                  {
                    name: 'descriptionAlignment',
                    type: 'select',
                    label: 'Description Alignment',
                    defaultValue: 'left',
                    validate: allowAnySelect,
                    options: alignmentOptions,
                    admin: {
                      width: '25%',
                    },
                  },
                ],
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
                validate: allowAnySelect,
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
                  validate: allowAnySelect,
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
                validate: allowAnySelect,
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
                validate: allowAnySelect,
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
                  validate: allowAnySelect,
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
                  validate: allowAnySelect,
                  admin: {
                    width: '33.33%',
                  },
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
