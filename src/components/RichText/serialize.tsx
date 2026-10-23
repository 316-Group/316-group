import { BannerBlock } from '@/blocks/Banner/Component'
import { CallToActionBlock } from '@/blocks/CallToAction/Component'
import { CodeBlock, CodeBlockProps } from '@/blocks/Code/Component'
import { MediaBlock } from '@/blocks/MediaBlock/Component'
import React, { Fragment, JSX } from 'react'
import { CMSLink } from '@/components/Link'
import { DefaultNodeTypes, SerializedBlockNode } from '@payloadcms/richtext-lexical'
import type { BannerBlock as BannerBlockProps } from '@/payload-types'

import {
  IS_BOLD,
  IS_CODE,
  IS_ITALIC,
  IS_STRIKETHROUGH,
  IS_SUBSCRIPT,
  IS_SUPERSCRIPT,
  IS_UNDERLINE,
} from './nodeFormat'
import type {
  CallToActionBlock as CTABlockProps,
  MediaBlock as MediaBlockProps,
} from '@/payload-types'

export type NodeTypes =
  | DefaultNodeTypes
  | SerializedBlockNode<CTABlockProps | MediaBlockProps | BannerBlockProps | CodeBlockProps>

type Props = {
  nodes: NodeTypes[]
}

/**
 * Converts a CSS string (e.g. "color: red; font-size: 14px") into a React
 * CSSProperties object so it can be spread onto a JSX element.
 */
function parseInlineStyle(styleStr: string): React.CSSProperties {
  const result: Record<string, string> = {}
  if (!styleStr) return result
  styleStr.split(';').forEach((declaration) => {
    const [rawProp, ...valueParts] = declaration.split(':')
    if (!rawProp) return
    const prop = rawProp.trim()
    const value = valueParts.join(':').trim()
    if (!prop || !value) return
    // Convert kebab-case to camelCase for React
    const camelProp = prop.replace(/-([a-z])/g, (_, letter) => letter.toUpperCase())
    result[camelProp] = value
  })
  return result as React.CSSProperties
}

function parseAttributes(attrString: string): Record<string, string> {
  const attrs: Record<string, string> = {}
  if (!attrString) return attrs
  const attrRegex = /([a-zA-Z0-9_-]+)\s*=\s*(?:["']([^"']*)["']|([^\s>]+))/g
  let match: RegExpExecArray | null
  while ((match = attrRegex.exec(attrString)) !== null) {
    const name = match[1].toLowerCase()
    const value = match[2] !== undefined ? match[2] : match[3]
    attrs[name] = value
  }
  return attrs
}

/**
 * Parses user-entered inline style tags and line breaks like:
 * - <br/>, <br>, <br /> -> <br />
 * - <style="color:red">text</style> -> <span style="...">text</span>
 * - <span style="color:red">text</span> -> <span style="...">text</span>
 * - <span class="text-blue-600">text</span> -> <span className="...">text</span>
 * - <span class="text-cyan-400" style="color: red">text</span> -> with both class and style
 * Strictly preserves leading, trailing, and inter-token whitespace so words never collapse together.
 */
export function parseInlineCustomStyles(rawText: string, baseKey: string | number): React.ReactNode {
  if (!rawText) {
    return rawText
  }

  // Normalize non-breaking spaces
  const normalized = rawText.replace(/&nbsp;/gi, '\u00A0')

  if (!normalized.includes('<')) {
    return normalized
  }

  // Matches <br>, legacy <style="...">(.*?)</style>, or inline tags: span, strong, b, em, i, u, mark
  const inlineTagRegex =
    /<br\s*\/?>|<(?:style\s*=|span\s+style=)(["'])(.*?)\1>(.*?)<\/(?:style|span)>|<(span|strong|b|em|i|u|mark)\b([^>]*)>(.*?)<\/\4>/gis

  const elements: React.ReactNode[] = []
  let lastIndex = 0
  let match: RegExpExecArray | null

  while ((match = inlineTagRegex.exec(normalized)) !== null) {
    if (match.index > lastIndex) {
      let between = normalized.substring(lastIndex, match.index)
      // Normalize standalone newlines between tags to single spaces so adjacent tags never touch
      between = between.replace(/\r?\n\s*/g, ' ')
      elements.push(between)
    }

    const fullMatch = match[0]
    const key = `${baseKey}-inline-${match.index}`

    if (/^<br\s*\/?>$/i.test(fullMatch)) {
      elements.push(<br key={key} />)
    } else if (match[1] !== undefined) {
      // Shorthand <style="style">innerText</style> or <span style="style">innerText</span>
      const styleString = match[2]
      const innerText = match[3]
      const hasLeading = /^\s/.test(innerText)
      const hasTrailing = /\s$/.test(innerText)
      const coreText = innerText.trim()

      if (hasLeading) elements.push(' ')
      elements.push(
        <span key={key} style={parseInlineStyle(styleString)}>
          {parseInlineCustomStyles(coreText, `${key}-inner`)}
        </span>,
      )
      if (hasTrailing) elements.push(' ')
    } else if (match[4] !== undefined) {
      // Standard inline HTML tag (span, strong, em, etc.) with arbitrary attributes
      const tagName = match[4].toLowerCase()
      const rawAttrs = match[5]
      const innerText = match[6]
      const attrs = parseAttributes(rawAttrs)

      const hasLeading = /^\s/.test(innerText)
      const hasTrailing = /\s$/.test(innerText)
      const coreText = innerText.trim()

      const className = attrs['class'] || attrs['classname']
      const styleObj = attrs['style'] ? parseInlineStyle(attrs['style']) : undefined

      const Tag = tagName as any

      if (hasLeading) elements.push(' ')
      elements.push(
        <Tag
          key={key}
          {...(className ? { className } : {})}
          {...(styleObj ? { style: styleObj } : {})}
        >
          {parseInlineCustomStyles(coreText, `${key}-inner`)}
        </Tag>,
      )
      if (hasTrailing) elements.push(' ')
    }

    lastIndex = inlineTagRegex.lastIndex
  }

  if (lastIndex < normalized.length) {
    elements.push(normalized.substring(lastIndex))
  }

  if (elements.length === 0) return normalized
  if (elements.length === 1 && typeof elements[0] === 'string') return elements[0]
  return elements
}

export function serializeLexical({ nodes }: Props): JSX.Element {
  return (
    <Fragment>
      {nodes?.map((node, index): JSX.Element | null => {
        if (node == null) {
          return null
        }

        if (node.type === 'text') {
          const rawText = node.text
          if (!rawText) return null

          // Separate boundary whitespace so wrapping inline tags (strong, span, code)
          // never cause browser whitespace collapsing when adjacent to other inline nodes
          const hasLeading = /^\s/.test(rawText) && rawText.trim().length > 0
          const hasTrailing = /\s$/.test(rawText) && rawText.trim().length > 0
          const coreText = hasLeading || hasTrailing ? rawText.trim() : rawText

          const content = parseInlineCustomStyles(coreText, index)
          let text = <React.Fragment key={index}>{content}</React.Fragment>

          if (node.format & IS_BOLD) {
            text = <strong key={index}>{text}</strong>
          }
          if (node.format & IS_ITALIC) {
            text = <em key={index}>{text}</em>
          }
          if (node.format & IS_STRIKETHROUGH) {
            text = (
              <span key={index} style={{ textDecoration: 'line-through' }}>
                {text}
              </span>
            )
          }
          if (node.format & IS_UNDERLINE) {
            text = (
              <span key={index} style={{ textDecoration: 'underline' }}>
                {text}
              </span>
            )
          }
          if (node.format & IS_CODE) {
            text = <code key={index}>{coreText}</code>
          }
          if (node.format & IS_SUBSCRIPT) {
            text = <sub key={index}>{text}</sub>
          }
          if (node.format & IS_SUPERSCRIPT) {
            text = <sup key={index}>{text}</sup>
          }

          // Apply any inline CSS styles set via the Lexical editor (e.g. font color)
          const nodeStyle = (node as any).style
          if (nodeStyle) {
            text = (
              <span key={index} style={parseInlineStyle(nodeStyle)}>
                {text}
              </span>
            )
          }

          if (hasLeading || hasTrailing) {
            return (
              <React.Fragment key={index}>
                {hasLeading && ' '}
                {text}
                {hasTrailing && ' '}
              </React.Fragment>
            )
          }

          return text
        }


        // NOTE: Hacky fix for
        // https://github.com/facebook/lexical/blob/d10c4e6e55261b2fdd7d1845aed46151d0f06a8c/packages/lexical-list/src/LexicalListItemNode.ts#L133
        // which does not return checked: false (only true - i.e. there is no prop for false)
        const serializedChildrenFn = (node: NodeTypes): JSX.Element | null => {
          if (node == null || !('children' in node) || node.children == null) {
            return null
          } else {
            if (node?.type === 'list' && node?.listType === 'check') {
              for (const item of node.children) {
                if ('checked' in item) {
                  if (!item?.checked) {
                    item.checked = false
                  }
                }
              }
            }
            return serializeLexical({ nodes: node.children as NodeTypes[] })
          }
        }

        const serializedChildren = 'children' in node ? serializedChildrenFn(node) : ''

        if (node.type === 'block') {
          const block = node.fields

          const blockType = block?.blockType

          if (!block || !blockType) {
            return null
          }

          switch (blockType) {
            case 'cta':
              return <CallToActionBlock key={index} {...block} />
            case 'mediaBlock':
              return (
                <MediaBlock
                  className="col-start-1 col-span-3"
                  imgClassName="m-0"
                  key={index}
                  {...block}
                  captionClassName="mx-auto max-w-[48rem]"
                  enableGutter={false}
                  disableInnerContainer={true}
                />
              )
            case 'banner':
              return <BannerBlock className="col-start-2 mb-4" key={index} {...block} />
            case 'code':
              return <CodeBlock className="col-start-2" key={index} {...block} />
            default:
              return null
          }
        } else {
          switch (node.type) {
            case 'linebreak': {
              return <br className="col-start-2" key={index} />
            }
            case 'horizontalrule': {
              return <hr className="col-start-2 my-6 border-t border-slate-300 w-full" key={index} />
            }
            case 'paragraph': {
              const alignmentClass =
                node.format === 'center'
                  ? 'text-center'
                  : node.format === 'right'
                    ? 'text-right'
                    : node.format === 'justify'
                      ? 'text-justify'
                      : ''
              // Pass through any inline styles set via the Lexical editor
              const inlineStyle = (node as any).style
              const isEmpty = !serializedChildren

              return (
                <p
                  className={`col-start-2 mb-6 leading-relaxed last:mb-0 ${alignmentClass}`}
                  key={index}
                  {...(inlineStyle ? { style: parseInlineStyle(inlineStyle) } : {})}
                >
                  {isEmpty ? <br /> : serializedChildren}
                </p>
              )
            }
            case 'heading': {
              const Tag = node?.tag
              const alignmentClass =
                node.format === 'center'
                  ? 'text-center'
                  : node.format === 'right'
                    ? 'text-right'
                    : node.format === 'justify'
                      ? 'text-justify'
                      : ''
              // Pass through any inline styles set via the Lexical editor (e.g. color)
              const inlineStyle = (node as any).style
              return (
                <Tag
                  className={alignmentClass}
                  key={index}
                  {...(inlineStyle ? { style: parseInlineStyle(inlineStyle) } : {})}
                >
                  {serializedChildren}
                </Tag>
              )
            }
            case 'list': {
              const Tag = node?.tag
              return (
                <Tag className="list col-start-2" key={index}>
                  {serializedChildren}
                </Tag>
              )
            }
            case 'listitem': {
              if (node?.checked != null) {
                return (
                  <li
                    aria-checked={node.checked ? 'true' : 'false'}
                    className={` ${node.checked ? '' : ''}`}
                    key={index}
                    // eslint-disable-next-line jsx-a11y/no-noninteractive-element-to-interactive-role
                    role="checkbox"
                    tabIndex={-1}
                    value={node?.value}
                  >
                    {serializedChildren}
                  </li>
                )
              } else {
                return (
                  <li key={index} value={node?.value}>
                    {serializedChildren}
                  </li>
                )
              }
            }
            case 'quote': {
              return (
                <blockquote className="col-start-2" key={index}>
                  {serializedChildren}
                </blockquote>
              )
            }
            case 'link': {
              const fields = node.fields

              return (
                <CMSLink
                  key={index}
                  newTab={Boolean(fields?.newTab)}
                  reference={fields.doc as any}
                  type={fields.linkType === 'internal' ? 'reference' : 'custom'}
                  url={fields.url}
                  className="inline-flex"
                >
                  {serializedChildren}
                </CMSLink>
              )
            }

            default:
              return null
          }
        }
      })}
    </Fragment>
  )
}
