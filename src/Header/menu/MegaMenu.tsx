'use client'
import React, { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { Menu, X, ArrowLeft, ArrowRight } from 'lucide-react'
import { MenuItem } from './MenuItem'
import { MegaMenuContent } from './MegaMenuContent'
import type { Link as LinkType } from './types'
import { cn } from '@/utilities/cn'
import { Header } from '@/payload-types'
import { Logo } from '@/components/Logo/Logo'
import { LogoDark } from '@/components/Logo/LogoDark'
import Link from 'next/link'

export const MegaMenu = ({
  className,
  header,
  theme,
  pillMode = false,
  heroOverlay = false,
}: {
  className: string
  header: Header
  theme: string | null
  pillMode?: boolean
  heroOverlay?: boolean
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [activeSection, setActiveSection] = useState<string | null>(null)
  const [isMobile, setIsMobile] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])
  useEffect(() => {
    // Set initial value and listen for changes
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }

    handleResize() // Check initial viewport size
    window.addEventListener('resize', handleResize)

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const handleToggle = () => {
    setIsOpen(!isOpen)
    setActiveSection(null)
  }

  const handleBack = () => {
    setActiveSection(null)
  }

  const getHref = (link?: LinkType): string => {
    if (!link) {
      console.warn('No link provided to getHref.')
      return '#'
    }

    if (link.type === 'custom') {
      return link.url || '#'
    }

    if (link.type === 'reference') {
      if (link.reference?.relationTo === 'pages' && typeof link.reference.value !== 'string') {
        return `/${link.reference.value.slug}`
      } else if (
        link.reference?.relationTo === 'posts' &&
        typeof link.reference.value !== 'string'
      ) {
        return `/posts/${link.reference.value.slug}`
      } else if (
        link.reference?.relationTo === 'brands' &&
        typeof link.reference.value !== 'string'
      ) {
        return `/brands/${link.reference.value.slug}`
      } else if (
        link.reference?.relationTo === 'case-studies' &&
        typeof link.reference.value !== 'string'
      ) {
        return `/case-studies/${link.reference.value.slug}`
      } else if (
        link.reference?.relationTo === 'ebooks-and-guides' &&
        typeof link.reference.value !== 'string'
      ) {
        return `/ebooks-and-guides/${link.reference.value.slug}`
      }
    }

    return '#'
  }

  const getMegaMenuItems = (title: string) => {
    if (!header.navItems) return []
    return (
      header.navItems.find(
        (item) => (item.title || item.link?.label) === title,
      )?.megaMenuItems || []
    )
  }

  return (
    <div className={cn('relative', className)}>
      {/* Mobile Menu Button */}
      <button
        onClick={handleToggle}
        className={cn(
          'lg:hidden p-2 rounded-md transition-colors',
          pillMode || heroOverlay
            ? 'text-white hover:bg-white/20'
            : 'hover:bg-gray-100',
        )}
        aria-label="Toggle menu"
      >
        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>

      {/* Desktop Navigation */}
      <nav className="hidden lg:flex items-center space-x-6">
        {header.navItems?.map((section, index) => {
          // Detect if this is the last item and labelled "Contact" (or only item with no mega menu)
          const isContact =
            !section.hasMegaMenu &&
            (section.link?.label?.toLowerCase() === 'contact' ||
              section.title?.toLowerCase() === 'contact')
          if (pillMode && isContact) {
            return (
              <Link
                key={index}
                href={getHref(section.link)}
                className="flex items-center gap-1.5 bg-gray-900 hover:bg-gray-800 text-white text-sm font-semibold px-4 py-2 rounded-full transition-colors duration-200"
              >
                {section.link?.label || section.title}
                <ArrowRight className="h-4 w-4" />
              </Link>
            )
          }
          const sectionTitle =
            (section.hasMegaMenu
              ? section.title
              : section.title || section.link?.label) || ''
          return (
            <MenuItem
              className={cn(
                'font-normal justify-start text-sm',
                pillMode ? 'text-white/90 hover:text-white' : 'text-xl',
              )}
              isMobile={isMobile}
              key={index}
              title={sectionTitle}
              href={section.hasMegaMenu ? undefined : getHref(section.link)}
              hasMegaMenu={Boolean(section.hasMegaMenu)}
              isActive={Boolean(activeSection && activeSection === sectionTitle)}
              onClick={() => {
                if (section.hasMegaMenu) {
                  setActiveSection(activeSection === sectionTitle ? null : sectionTitle)
                }
              }}
            />
          )
        })}
      </nav>

      {/* Portalled Drawer and Overlay so they are never trapped by backdrop-blur or container overflow */}
      {mounted &&
        createPortal(
          <>
            {/* Overlay */}
            {(isOpen || activeSection) && (
              <div
                className={cn(
                  'fixed inset-0 bg-black/30 backdrop-blur-sm z-40 transition-opacity duration-300',
                  {
                    'opacity-100': isOpen || activeSection,
                    'opacity-0': !isOpen && !activeSection,
                  },
                )}
                onClick={() => {
                  setIsOpen(false)
                  setActiveSection(null)
                }}
              />
            )}

            {/* Desktop Mega Menu */}
            <div
              className={cn(
                'hidden lg:block fixed top-0 right-0 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 shadow-xl z-50 pl-8',
                'rounded-l-2xl',
                'animate-in slide-in-from-top',
                {
                  'translate-y-0 opacity-100 transition-all duration-300 ease-in-out': activeSection,
                  '-translate-y-4 opacity-0 pointer-events-none': !activeSection,
                },
              )}
              style={{
                height: '100vh',
                width: 'max(55%, 900px)',
                visibility: activeSection ? 'visible' : 'hidden',
              }}
            >
              <div className="p-8">
                {/* Header with Menu Items at Top and Close Button */}
                <div className="flex items-center justify-between mb-8 pb-4">
                  <div className="flex gap-6 justify-start items-center">
                    {header.navItems?.map((section, index) => {
                      const sectionTitle =
                        (section.hasMegaMenu
                          ? section.title
                          : section.title || section.link?.label) || ''
                      return (
                        <MenuItem
                          className={cn('font-normal justify-start text-xl text-gray-900 dark:text-gray-100')}
                          isMobile={isMobile}
                          key={index}
                          href={section.hasMegaMenu ? undefined : getHref(section.link)}
                          title={sectionTitle}
                          hasMegaMenu={Boolean(section.hasMegaMenu)}
                          isActive={Boolean(activeSection && activeSection === sectionTitle)}
                          onClick={() => {
                            if (section.hasMegaMenu !== true) {
                              setIsOpen(false)
                              setActiveSection(null)
                            } else {
                              setActiveSection(activeSection === sectionTitle ? null : sectionTitle)
                            }
                          }}
                        />
                      )
                    })}
                  </div>
                  <button
                    onClick={() => {
                      setIsOpen(false)
                      setActiveSection(null)
                    }}
                    className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-gray-700 dark:text-gray-300"
                    aria-label="Close menu"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>

                {/* Active Section Content */}
                {activeSection !== null && (
                  <MegaMenuContent
                    setActiveSection={setActiveSection}
                    setIsOpen={setIsOpen}
                    items={getMegaMenuItems(activeSection)}
                  />
                )}
              </div>
            </div>

            {/* Mobile Menu */}
            <div
              className={cn(
                'fixed inset-0 top-0 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 z-50 transition-all duration-300 ease-in-out overflow-auto lg:hidden p-4',
                {
                  'translate-y-0': isOpen,
                  'translate-y-full': !isOpen,
                },
              )}
            >
              <div className="flex items-center justify-between px-1 pb-16 pt-4">
                <Link href="/">
                  {theme && theme === 'light' ? (
                    <Logo loading="eager" priority="high" />
                  ) : (
                    <LogoDark loading="eager" priority="high" />
                  )}
                </Link>
                <button
                  onClick={handleToggle}
                  className="lg:hidden hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-colors text-gray-900 dark:text-gray-100"
                  aria-label="Toggle menu"
                >
                  {isOpen ? <X className="h-8 w-8" /> : <Menu className="h-8 w-8" />}
                </button>
              </div>
              {activeSection ? (
                <div
                  className={cn('transition-all duration-300 ease-in-out', {
                    'animate-in-left': activeSection,
                    'animate-out-left': !activeSection,
                  })}
                >
                  <button
                    onClick={handleBack}
                    className="flex items-center text-gray-600 hover:text-gray-900 py-4 px-1 w-[100%]"
                  >
                    <ArrowLeft className="h-6 w-6 mr-2 text-gray-900 dark:text-gray-100" />
                    {/* Back to Menu */}
                  </button>
                  <div className="p-1">
                    <MegaMenuContent
                      setActiveSection={setActiveSection}
                      setIsOpen={setIsOpen}
                      items={getMegaMenuItems(activeSection)}
                    />
                  </div>
                </div>
              ) : (
                <div className="p-1 space-y-8">
                  {header.navItems?.map((section, index) => {
                    const sectionTitle =
                      (section.hasMegaMenu
                        ? section.title
                        : section.title || section.link?.label) || ''
                    return (
                      <MenuItem
                        className={cn('font-normal text-2xl justify-between w-[100%] text-gray-900 dark:text-gray-100')}
                        key={section.title || index}
                        title={sectionTitle}
                        hasMegaMenu={Boolean(section.hasMegaMenu)}
                        isActive={false}
                        href={section.hasMegaMenu ? undefined : getHref(section.link)}
                        onClick={() => {
                          if (section.hasMegaMenu !== true) {
                            setIsOpen(false)
                            setActiveSection(null)
                          } else {
                            setActiveSection(activeSection === sectionTitle ? null : sectionTitle)
                          }
                        }}
                        isMobile={isMobile}
                      />
                    )
                  })}
                </div>
              )}
            </div>
          </>,
          document.body,
        )}
    </div>
  )
}
