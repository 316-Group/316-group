'use client'

import React, { useEffect, useRef } from 'react'
import { cn } from '@/utilities/cn'

export type AnimationType =
  | 'fade-up'
  | 'fade-down'
  | 'fade-left'
  | 'fade-right'
  | 'fade-in'
  | 'zoom-in'
  | 'slide-up'
  | 'none'

export type AnimationSpeed = 'fast' | 'normal' | 'slow'

export type AnimationDelay =
  | '0'
  | '100'
  | '150'
  | '200'
  | '300'
  | '400'
  | '500'
  | '600'
  | '800'

interface AnimateInProps {
  children: React.ReactNode
  className?: string
  /** Animation variant — default 'fade-up' */
  animation?: AnimationType
  /** Transition speed — default 'normal' */
  speed?: AnimationSpeed
  /** Delay in ms before the transition starts — default '0' */
  delay?: AnimationDelay
  /**
   * 'scroll'  → trigger when element enters viewport (IntersectionObserver)
   * 'load'    → trigger immediately on mount (page-load entrance)
   * default: 'scroll'
   */
  trigger?: 'scroll' | 'load'
  /** Intersection threshold 0–1 — default 0.15 */
  threshold?: number
  /** If true, once visible it stays visible (don't re-animate on scroll back) */
  once?: boolean
  /** HTML tag to render — default 'div' */
  as?: React.ElementType
}

/**
 * AnimateIn — wraps any content and applies a CSS entrance animation.
 *
 * Uses data-animate / data-visible attributes driven by CSS in globals.css.
 * No JS-injected inline styles — the browser handles all transitions natively.
 */
export const AnimateIn: React.FC<AnimateInProps> = ({
  children,
  className,
  animation = 'fade-up',
  speed = 'normal',
  delay = '0',
  trigger = 'scroll',
  threshold = 0.15,
  once = true,
  as: Tag = 'div',
}) => {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    if (animation === 'none') return

    const el = ref.current
    if (!el) return

    if (trigger === 'load') {
      // Small rAF so the browser has painted the initial hidden state first
      const raf = requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          el.setAttribute('data-visible', 'true')
        })
      })
      return () => cancelAnimationFrame(raf)
    }

    // Scroll trigger — IntersectionObserver
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            el.setAttribute('data-visible', 'true')
            if (once) observer.unobserve(el)
          } else if (!once) {
            el.setAttribute('data-visible', 'false')
          }
        })
      },
      { threshold },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [animation, trigger, threshold, once])

  if (animation === 'none') {
    return (
      <Tag className={className}>{children}</Tag>
    )
  }

  return (
    <Tag
      ref={ref}
      className={cn(className)}
      data-animate={animation}
      data-visible="false"
      data-speed={speed}
      data-delay={delay}
    >
      {children}
    </Tag>
  )
}
