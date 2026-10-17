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

export const gridColFields: Field[] = [
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

  // ─── Column Layout Toggle ──────────────────────────────────────────────────
  {
    name: 'reverseLayout',
    type: 'checkbox',
    label: 'Reverse Columns (Switch Image to Left Column, Content to Right Column)',
    defaultValue: false,
    admin: {
      description: 'By default, the content is on the left and image is on the right. Check to swap positions.',
    },
  },

  // ─── Top Badge ─────────────────────────────────────────────────────────────
  {
    name: 'badgeGroup',
    type: 'group',
    label: 'Top Badge / Tag',
    fields: [
      {
        name: 'enableBadge',
        type: 'checkbox',
        label: 'Enable Badge',
        defaultValue: true,
      },
      {
        name: 'badgeText',
        type: 'text',
        label: 'Badge Text',
        defaultValue: 'Financial Technology',
        admin: {
          condition: (_, siblingData) => siblingData?.enableBadge !== false,
        },
      },
      {
        type: 'row',
        admin: {
          condition: (_, siblingData) => siblingData?.enableBadge !== false,
        },
        fields: [
          bgColorPickerAll({
            overrides: {
              name: 'badgeBgColor',
              label: 'Badge Background Color',
              defaultValue: 'bg-[#EFF1F8]',
              admin: {
                width: '33.33%',
              },
            },
          }),
          textColorPickerAll({
            overrides: {
              name: 'badgeTextColor',
              label: 'Badge Text Color',
              defaultValue: 'text-[#3F5AC9]',
              admin: {
                width: '33.33%',
              },
            },
          }),
          {
            name: 'badgeAlignment',
            type: 'select',
            label: 'Badge Alignment',
            defaultValue: 'left',
            options: alignmentOptions,
            admin: {
              width: '33.33%',
            },
          },
        ],
      },
      {
        type: 'row',
        admin: {
          condition: (_, siblingData) => siblingData?.enableBadge !== false,
        },
        fields: [
          {
            name: 'badgeFontSize',
            type: 'select',
            label: 'Badge Font Size',
            defaultValue: 'text-sm',
            options: fontSizeOptions,
            admin: {
              width: '50%',
            },
          },
          {
            name: 'badgeFontWeight',
            type: 'select',
            label: 'Badge Font Weight',
            defaultValue: 'font-medium',
            options: fontWeightOptions,
            admin: {
              width: '50%',
            },
          },
        ],
      },
    ],
  },

  // ─── Top Main Heading ──────────────────────────────────────────────────────
  {
    name: 'mainHeadingGroup',
    type: 'group',
    label: 'Top Main Heading',
    fields: [
      {
        name: 'headingText',
        type: 'text',
        label: 'Heading Text (supports inline HTML like <strong>, <style="color:red">, <span>, <br />)',
        defaultValue: 'More <strong>connected ways</strong> to manage and move money.',
      },
      {
        type: 'row',
        fields: [
          textColorPickerAll({
            overrides: {
              name: 'headingColor',
              label: 'Heading Color',
              defaultValue: 'text-gray-900',
              admin: {
                width: '25%',
              },
            },
          }),
          {
            name: 'headingFontSize',
            type: 'select',
            label: 'Heading Font Size',
            defaultValue: 'text-4xl md:text-5xl lg:text-6xl',
            options: fontSizeOptions,
            admin: {
              width: '25%',
            },
          },
          {
            name: 'headingFontWeight',
            type: 'select',
            label: 'Heading Font Weight',
            defaultValue: 'font-normal',
            options: fontWeightOptions,
            admin: {
              width: '25%',
            },
          },
          {
            name: 'headingAlignment',
            type: 'select',
            label: 'Heading Alignment',
            defaultValue: 'left',
            options: alignmentOptions,
            admin: {
              width: '25%',
            },
          },
        ],
      },
      {
        name: 'headingTag',
        type: 'select',
        label: 'Heading HTML Tag',
        defaultValue: 'h2',
        options: [
          { label: 'H1', value: 'h1' },
          { label: 'H2 (Default)', value: 'h2' },
          { label: 'H3', value: 'h3' },
          { label: 'Div', value: 'div' },
        ],
      },
    ],
  },

  // ─── Left Content Column ───────────────────────────────────────────────────
  {
    name: 'contentColumn',
    type: 'group',
    label: 'Content Column Details',
    fields: [
      // Subheader / Kicker
      {
        name: 'kickerGroup',
        type: 'group',
        label: 'Small Subheader (e.g. 316 Money)',
        fields: [
          {
            name: 'text',
            type: 'text',
            label: 'Subheader Text',
            defaultValue: '316 Money',
          },
          {
            type: 'row',
            fields: [
              textColorPickerAll({
                overrides: {
                  name: 'color',
                  label: 'Subheader Color',
                  defaultValue: 'text-gray-900',
                  admin: {
                    width: '25%',
                  },
                },
              }),
              {
                name: 'fontSize',
                type: 'select',
                label: 'Font Size',
                defaultValue: 'text-base md:text-lg',
                options: fontSizeOptions,
                admin: {
                  width: '25%',
                },
              },
              {
                name: 'fontWeight',
                type: 'select',
                label: 'Font Weight',
                defaultValue: 'font-normal',
                options: fontWeightOptions,
                admin: {
                  width: '25%',
                },
              },
              {
                name: 'alignment',
                type: 'select',
                label: 'Alignment',
                defaultValue: 'left',
                options: alignmentOptions,
                admin: {
                  width: '25%',
                },
              },
            ],
          },
        ],
      },

      // Big Bold Heading
      {
        name: 'headingGroup',
        type: 'group',
        label: 'Section Big Heading (e.g. One account for the world)',
        fields: [
          {
            name: 'text',
            type: 'text',
            label: 'Heading Text (supports inline HTML)',
            defaultValue: 'One account for the world',
          },
          {
            type: 'row',
            fields: [
              textColorPickerAll({
                overrides: {
                  name: 'color',
                  label: 'Color',
                  defaultValue: 'text-gray-900',
                  admin: {
                    width: '25%',
                  },
                },
              }),
              {
                name: 'fontSize',
                type: 'select',
                label: 'Font Size',
                defaultValue: 'text-3xl md:text-4xl lg:text-5xl',
                options: fontSizeOptions,
                admin: {
                  width: '25%',
                },
              },
              {
                name: 'fontWeight',
                type: 'select',
                label: 'Font Weight',
                defaultValue: 'font-bold',
                options: fontWeightOptions,
                admin: {
                  width: '25%',
                },
              },
              {
                name: 'alignment',
                type: 'select',
                label: 'Alignment',
                defaultValue: 'left',
                options: alignmentOptions,
                admin: {
                  width: '25%',
                },
              },
            ],
          },
        ],
      },

      // Description
      {
        name: 'descriptionGroup',
        type: 'group',
        label: 'Description',
        fields: [
          {
            name: 'text',
            type: 'textarea',
            label: 'Description Text (supports inline HTML)',
            defaultValue:
              'Experience a simpler way to manage everyday finances with 316 Money. From multi-currency wallets and seamless transfers to requesting funds, virtual cards and sending money across borders, our digital financial experience brings the tools you need together in one convenient place.',
          },
          {
            type: 'row',
            fields: [
              textColorPickerAll({
                overrides: {
                  name: 'color',
                  label: 'Color',
                  defaultValue: 'text-gray-700',
                  admin: {
                    width: '25%',
                  },
                },
              }),
              {
                name: 'fontSize',
                type: 'select',
                label: 'Font Size',
                defaultValue: 'text-base md:text-lg',
                options: fontSizeOptions,
                admin: {
                  width: '25%',
                },
              },
              {
                name: 'fontWeight',
                type: 'select',
                label: 'Font Weight',
                defaultValue: 'font-normal',
                options: fontWeightOptions,
                admin: {
                  width: '25%',
                },
              },
              {
                name: 'alignment',
                type: 'select',
                label: 'Alignment',
                defaultValue: 'left',
                options: alignmentOptions,
                admin: {
                  width: '25%',
                },
              },
            ],
          },
        ],
      },

      // "What's inside" section
      {
        name: 'featuresSection',
        type: 'group',
        label: "Feature List Section (e.g. What's inside)",
        fields: [
          {
            name: 'title',
            type: 'text',
            label: 'Section Title',
            defaultValue: "What's inside",
          },
          {
            type: 'row',
            fields: [
              textColorPickerAll({
                overrides: {
                  name: 'titleColor',
                  label: 'Title Color',
                  defaultValue: 'text-gray-900',
                  admin: {
                    width: '25%',
                  },
                },
              }),
              {
                name: 'titleFontSize',
                type: 'select',
                label: 'Title Font Size',
                defaultValue: 'text-lg md:text-xl',
                options: fontSizeOptions,
                admin: {
                  width: '25%',
                },
              },
              {
                name: 'titleFontWeight',
                type: 'select',
                label: 'Title Font Weight',
                defaultValue: 'font-semibold',
                options: fontWeightOptions,
                admin: {
                  width: '25%',
                },
              },
              {
                name: 'titleAlignment',
                type: 'select',
                label: 'Title Alignment',
                defaultValue: 'left',
                options: alignmentOptions,
                admin: {
                  width: '25%',
                },
              },
            ],
          },
          // Feature items array
          {
            name: 'items',
            type: 'array',
            label: 'Feature Items (each with hr divider & clickable link)',
            admin: {
              initCollapsed: false,
              components: {
                RowLabel: '/blocks/GridCol/RowLabel#RowLabel',
              },
            },
            fields: [
              {
                name: 'text',
                type: 'text',
                label: 'Item Text',
                required: false,
                defaultValue: '316 Money - digital accounts and multi-currency tools',
              },
              {
                type: 'row',
                fields: [
                  textColorPickerAll({
                    overrides: {
                      name: 'textColor',
                      label: 'Text Color',
                      defaultValue: 'text-gray-900',
                      admin: {
                        width: '33.33%',
                      },
                    },
                  }),
                  {
                    name: 'fontSize',
                    type: 'select',
                    label: 'Font Size',
                    defaultValue: 'text-base md:text-lg',
                    options: fontSizeOptions,
                    admin: {
                      width: '33.33%',
                    },
                  },
                  {
                    name: 'fontWeight',
                    type: 'select',
                    label: 'Font Weight',
                    defaultValue: 'font-normal',
                    options: fontWeightOptions,
                    admin: {
                      width: '33.33%',
                    },
                  },
                ],
              },
              link({
                appearances: false,
                disableLabel: true,
                required: false,
                overrides: {
                  name: 'itemLink',
                  label: 'Item Link (URL or Page reference)',
                },
              }),
            ],
          },
        ],
      },

      // Action Button ("Learn more" + circle icon)
      {
        name: 'buttonGroup',
        type: 'group',
        label: 'Action Button (e.g. Learn more with circled icon)',
        fields: [
          {
            name: 'showButton',
            type: 'checkbox',
            label: 'Show Button',
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
                  defaultValue: 'text-gray-900',
                  admin: {
                    width: '25%',
                  },
                },
              }),
              {
                name: 'fontSize',
                type: 'select',
                label: 'Font Size',
                defaultValue: 'text-lg',
                options: fontSizeOptions,
                admin: {
                  width: '25%',
                },
              },
              {
                name: 'fontWeight',
                type: 'select',
                label: 'Font Weight',
                defaultValue: 'font-semibold',
                options: fontWeightOptions,
                admin: {
                  width: '25%',
                },
              },
              {
                name: 'alignment',
                type: 'select',
                label: 'Alignment',
                defaultValue: 'left',
                options: alignmentOptions,
                admin: {
                  width: '25%',
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
              bgColorPickerAll({
                overrides: {
                  name: 'iconBgColor',
                  label: 'Circled Icon Background Color',
                  defaultValue: 'bg-blue-custom',
                  admin: {
                    width: '50%',
                  },
                },
              }),
              textColorPickerAll({
                overrides: {
                  name: 'iconColor',
                  label: 'Circled Icon Arrow Color',
                  defaultValue: 'text-white',
                  admin: {
                    width: '50%',
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
              name: 'link',
              label: 'Button Link',
            },
          }),
        ],
      },
    ],
  },

  // ─── Right Image Column ───────────────────────────────────────────────────
  {
    name: 'imageColumn',
    type: 'group',
    label: 'Image Column Details',
    fields: [
      {
        name: 'image',
        type: 'upload',
        relationTo: 'media',
        label: 'Feature Image',
        required: false,
      },
      {
        type: 'row',
        fields: [
          {
            name: 'imageRounded',
            type: 'select',
            label: 'Image Rounded Corners',
            defaultValue: 'rounded-[36px]',
            options: [
              { label: '36px (Mockup Style - Default)', value: 'rounded-[36px]' },
              { label: '40px (Extra Rounded)', value: 'rounded-[40px]' },
              { label: '32px (rounded-3xl)', value: 'rounded-[32px]' },
              { label: '24px (rounded-2xl)', value: 'rounded-2xl' },
              { label: '16px (rounded-xl)', value: 'rounded-xl' },
              { label: 'None (rounded-none)', value: 'rounded-none' },
            ],
            admin: {
              width: '50%',
            },
          },
          {
            name: 'imageHeight',
            type: 'select',
            label: 'Image Height',
            defaultValue: 'h-[500px] md:h-[620px] lg:h-[700px]',
            options: [
              { label: 'Standard (h-620px to 700px - Default)', value: 'h-[500px] md:h-[620px] lg:h-[700px]' },
              { label: 'Medium (h-520px to 600px)', value: 'h-[420px] md:h-[520px] lg:h-[600px]' },
              { label: 'Compact (h-450px to 500px)', value: 'h-[360px] md:h-[450px] lg:h-[500px]' },
              { label: 'Natural Aspect Ratio', value: 'h-auto aspect-[4/5]' },
            ],
            admin: {
              width: '50%',
            },
          },
        ],
      },
    ],
  },
]

export const GridCol: Block = {
  slug: 'gridCol',
  interfaceName: 'GridColBlock',
  labels: {
    singular: 'Grid Col Feature',
    plural: 'Grid Col Features',
  },
  fields: gridColFields,
}
