'use client'

import React, { useState } from 'react'
import { cn } from '@/utilities/cn'
import { ArrowUpRight, CheckCircle2, Loader2 } from 'lucide-react'

export function formatInlineHtml(content?: string | null): string {
  if (!content) return ''
  return content
    .replace(/<style=(["'])(.*?)\1>(.*?)<\/style>/gi, '<span style="$2">$3</span>')
    .replace(/<style=(["'])(.*?)\1>/gi, '<span style="$2">')
    .replace(/\n/g, '<br />')
}

export interface StepItem {
  id?: string
  numberText?: string
  text?: string
}

export interface DropdownOption {
  id?: string
  label: string
}

export interface FieldItemConfig {
  enabled?: boolean
  isRequired?: boolean
  label?: string
  placeholder?: string
  helperText?: string
  options?: DropdownOption[]
}

export interface WebinarRecapAccessProps {
  // Top Bar
  topHeader?: {
    topHeadingText?: string
    topMetaText?: string
    leadDescriptionText?: string
  }
  topHeadingText?: string
  topMetaText?: string
  leadDescriptionText?: string

  // Left Column
  leftColumn?: {
    kickerText?: string
    headingText?: string
    descriptionText?: string
    stepsSubheadingText?: string
    steps?: StepItem[]
    showBottomIcon?: boolean
  }
  kickerText?: string
  headingText?: string
  descriptionText?: string
  stepsSubheadingText?: string
  steps?: StepItem[]
  showBottomIcon?: boolean

  // Form Fields
  formFields?: {
    firstName?: FieldItemConfig
    lastName?: FieldItemConfig
    workEmail?: FieldItemConfig
    organisation?: FieldItemConfig
    jobTitle?: FieldItemConfig
    sector?: FieldItemConfig
    discussionTopic?: FieldItemConfig
    viewingTime?: FieldItemConfig
    followUpPreference?: FieldItemConfig
    notes?: FieldItemConfig
    consent?: {
      enabled?: boolean
      consentLabel?: string
    }
    submitButtonText?: string
    requiredNoteText?: string
  }

  // Styles
  topHeaderStyles?: {
    topHeadingColor?: string
    topHeadingFontSizeDesktop?: string
    topHeadingFontSizeMobile?: string
    topHeadingFontWeightDesktop?: string
    topHeadingFontWeightMobile?: string
    topMetaColor?: string
    topMetaFontSizeDesktop?: string
    topMetaFontSizeMobile?: string
    topHeaderMarginBottomDesktop?: string
    topHeaderMarginBottomMobile?: string
  }

  topHrStyles?: {
    topHrColor?: string
    topHrHeight?: string
    topHrMarginBottomDesktop?: string
    topHrMarginBottomMobile?: string
  }

  leadDescriptionStyles?: {
    leadDescriptionColor?: string
    leadDescriptionFontSizeDesktop?: string
    leadDescriptionFontSizeMobile?: string
    leadDescriptionMarginBottomDesktop?: string
    leadDescriptionMarginBottomMobile?: string
  }

  leftColumnStyles?: {
    kickerSquareColor?: string
    kickerTextColor?: string
    headingColor?: string
    descriptionColor?: string
    columnHrColor?: string
    stepsSubheadingColor?: string
    stepNumberColor?: string
    stepTextColor?: string
    matrixColor?: string
    stepsContainerMarginBottomDesktop?: string
    stepsContainerMarginBottomMobile?: string
  }

  formCardStyles?: {
    formCardBgColor?: string
    submitButtonBgColor?: string
    submitButtonTextColor?: string
    requiredAsteriskColor?: string
    requiredNoteColor?: string
  }

  // Section Layout
  sectionBgColor?: string
  matchHeaderPillWidth?: boolean
  paddingTopDesktop?: string
  paddingTopMobile?: string
  paddingBottomDesktop?: string
  paddingBottomMobile?: string
  paddingLeftDesktop?: string
  paddingLeftMobile?: string
  paddingRightDesktop?: string
  paddingRightMobile?: string
  customSectionId?: string
}

export const WebinarRecapAccessBlock: React.FC<WebinarRecapAccessProps> = (props) => {
  // Top Bar Content
  const topHeadingText =
    props.topHeader?.topHeadingText ?? props.topHeadingText ?? 'Access the recording'
  const topMetaText = props.topHeader?.topMetaText ?? props.topMetaText ?? 'ON DEMAND'
  const leadDescriptionText =
    props.topHeader?.leadDescriptionText ??
    props.leadDescriptionText ??
    "Register below to get instant access to the full replay of our FinNext 2026 webinar. Complete your details and we'll send a direct link to your inbox."

  // Left Column Content
  const kickerText =
    props.leftColumn?.kickerText ?? props.kickerText ?? "LET'S START A CONVERSATION"
  const headingText =
    props.leftColumn?.headingText ?? props.headingText ?? 'Your next\nconnection starts\nhere.'
  const descriptionText =
    props.leftColumn?.descriptionText ??
    props.descriptionText ??
    "Tell us a little about yourself and what you'd like to discuss. We'll be in touch to explore a suitable time to meet during ESMO 2026."
  const stepsSubheadingText =
    props.leftColumn?.stepsSubheadingText ?? props.stepsSubheadingText ?? 'What happens next?'
  const steps = props.leftColumn?.steps ??
    props.steps ?? [
      { numberText: '01', text: 'Share your interests and availability.' },
      { numberText: '02', text: "We'll follow up to shape the conversation." },
      { numberText: '03', text: 'Confirm a time and place together.' },
    ]
  const showBottomIcon = props.leftColumn?.showBottomIcon ?? props.showBottomIcon ?? true

  // Form Fields Configuration
  const formFields = props.formFields
  const firstNameConfig: FieldItemConfig = {
    enabled: formFields?.firstName?.enabled ?? true,
    isRequired: formFields?.firstName?.isRequired ?? true,
    label: formFields?.firstName?.label || 'First name',
    placeholder: formFields?.firstName?.placeholder || 'Your first name',
  }

  const lastNameConfig: FieldItemConfig = {
    enabled: formFields?.lastName?.enabled ?? true,
    isRequired: formFields?.lastName?.isRequired ?? true,
    label: formFields?.lastName?.label || 'Last name',
    placeholder: formFields?.lastName?.placeholder || 'Your last name',
  }

  const workEmailConfig: FieldItemConfig = {
    enabled: formFields?.workEmail?.enabled ?? true,
    isRequired: formFields?.workEmail?.isRequired ?? true,
    label: formFields?.workEmail?.label || 'Work email',
    placeholder: formFields?.workEmail?.placeholder || 'you@organisation.com',
  }

  const orgConfig: FieldItemConfig = {
    enabled: formFields?.organisation?.enabled ?? true,
    isRequired: formFields?.organisation?.isRequired ?? true,
    label: formFields?.organisation?.label || 'Organisation',
    placeholder: formFields?.organisation?.placeholder || 'Organisation name',
  }

  const jobTitleConfig: FieldItemConfig = {
    enabled: formFields?.jobTitle?.enabled ?? true,
    isRequired: formFields?.jobTitle?.isRequired ?? false,
    label: formFields?.jobTitle?.label || 'Job title',
    placeholder: formFields?.jobTitle?.placeholder || 'Your role',
  }

  const sectorConfig: FieldItemConfig = {
    enabled: formFields?.sector?.enabled ?? true,
    isRequired: formFields?.sector?.isRequired ?? true,
    label: formFields?.sector?.label || 'Sector',
    placeholder: formFields?.sector?.placeholder || 'Select your sector',
    helperText:
      formFields?.sector?.helperText ||
      'e.g. Banking, Payments, InsurTech, RegTech, Investment, Other',
    options: formFields?.sector?.options || [
      { label: 'Banking' },
      { label: 'Payments & Processing' },
      { label: 'InsurTech' },
      { label: 'RegTech & Compliance' },
      { label: 'Investment & Wealth Management' },
      { label: 'eCommerce & Retail' },
      { label: 'Technology Advisory' },
      { label: 'Other' },
    ],
  }

  const topicConfig: FieldItemConfig = {
    enabled: formFields?.discussionTopic?.enabled ?? true,
    isRequired: formFields?.discussionTopic?.isRequired ?? true,
    label: formFields?.discussionTopic?.label || 'What topics are most relevant to you?',
    placeholder: formFields?.discussionTopic?.placeholder || 'Select a discussion topic',
    options: formFields?.discussionTopic?.options || [
      { label: 'Cross-border Payments & FX Infrastructure' },
      { label: 'Embedded Finance & Banking-as-a-Service (BaaS)' },
      { label: 'Regulatory Compliance & AML / KYC Modernization' },
      { label: 'Data & Identity Intelligence' },
      { label: 'Digital Assets, Treasury & Liquidity Management' },
      { label: 'Platform Scaling & Enterprise Architecture' },
      { label: 'General Partnership Inquiry' },
    ],
  }

  const viewingTimeConfig: FieldItemConfig = {
    enabled: formFields?.viewingTime?.enabled ?? true,
    isRequired: formFields?.viewingTime?.isRequired ?? false,
    label: formFields?.viewingTime?.label || 'Preferred viewing time',
    placeholder: formFields?.viewingTime?.placeholder || 'Select a time',
    options: formFields?.viewingTime?.options || [
      { label: 'Immediately (Instant replay access)' },
      { label: 'This morning' },
      { label: 'This afternoon' },
      { label: 'This evening / After hours' },
      { label: 'Weekend viewing' },
    ],
  }

  const followUpConfig: FieldItemConfig = {
    enabled: formFields?.followUpPreference?.enabled ?? true,
    isRequired: formFields?.followUpPreference?.isRequired ?? false,
    label: formFields?.followUpPreference?.label || 'Follow-up preference',
    placeholder: formFields?.followUpPreference?.placeholder || 'Select a preference',
    options: formFields?.followUpPreference?.options || [
      { label: 'Email recording link & recap only' },
      { label: 'Schedule a 15-minute briefing with an expert' },
      { label: 'Request an enterprise solution demo' },
      { label: 'No additional follow-up required' },
    ],
  }

  const notesConfig: FieldItemConfig = {
    enabled: formFields?.notes?.enabled ?? true,
    isRequired: formFields?.notes?.isRequired ?? false,
    label: formFields?.notes?.label || "Anything else you'd like us to know?",
    placeholder:
      formFields?.notes?.placeholder ||
      'Share your priorities, questions or areas of interest. Please do not include sensitive financial or personal information.',
  }

  const consentEnabled = formFields?.consent?.enabled ?? true
  const consentLabel =
    formFields?.consent?.consentLabel ||
    'I agree that 316 Group may use these details to send me access to the webinar recording and relevant updates. * See our <a href="/privacy" class="text-blue-600 underline hover:text-blue-800">Privacy Policy</a> for details on how we handle your data.'

  const submitButtonText = formFields?.submitButtonText || 'Access the recording'
  const requiredNoteText = formFields?.requiredNoteText || '* Required field'

  // Styling
  const topHeadingColor = props.topHeaderStyles?.topHeadingColor || 'text-white'
  const topHeadingFontSizeDesktop =
    props.topHeaderStyles?.topHeadingFontSizeDesktop || 'text-3xl md:text-4xl lg:text-5xl'
  const topHeadingFontSizeMobile =
    props.topHeaderStyles?.topHeadingFontSizeMobile || 'text-2xl sm:text-3xl'
  const topHeadingFontWeightDesktop =
    props.topHeaderStyles?.topHeadingFontWeightDesktop || 'font-semibold'
  const topHeadingFontWeightMobile =
    props.topHeaderStyles?.topHeadingFontWeightMobile || 'font-semibold'

  const topMetaColor = props.topHeaderStyles?.topMetaColor || 'text-white'
  const topMetaFontSizeDesktop =
    props.topHeaderStyles?.topMetaFontSizeDesktop || 'text-xs sm:text-sm'
  const topMetaFontSizeMobile = props.topHeaderStyles?.topMetaFontSizeMobile || 'text-xs'

  const topHeaderMarginBottomDesktop =
    props.topHeaderStyles?.topHeaderMarginBottomDesktop || 'mb-4 md:mb-6'
  const topHeaderMarginBottomMobile = props.topHeaderStyles?.topHeaderMarginBottomMobile || 'mb-4'

  const topHrColor = props.topHrStyles?.topHrColor || 'bg-white/30'
  const topHrHeight = props.topHrStyles?.topHrHeight || 'h-px'
  const topHrMarginBottomDesktop =
    props.topHrStyles?.topHrMarginBottomDesktop || 'mb-6 md:mb-8'
  const topHrMarginBottomMobile = props.topHrStyles?.topHrMarginBottomMobile || 'mb-5'

  const leadDescriptionColor =
    props.leadDescriptionStyles?.leadDescriptionColor || 'text-white/90'
  const leadDescriptionFontSizeDesktop =
    props.leadDescriptionStyles?.leadDescriptionFontSizeDesktop || 'text-lg md:text-xl'
  const leadDescriptionFontSizeMobile =
    props.leadDescriptionStyles?.leadDescriptionFontSizeMobile || 'text-base'
  const leadDescriptionMarginBottomDesktop =
    props.leadDescriptionStyles?.leadDescriptionMarginBottomDesktop || 'mb-12 md:mb-16'
  const leadDescriptionMarginBottomMobile =
    props.leadDescriptionStyles?.leadDescriptionMarginBottomMobile || 'mb-8'

  // Left Column Styling
  const kickerSquareColor = props.leftColumnStyles?.kickerSquareColor || 'bg-[#00D2FF]'
  const kickerTextColor = props.leftColumnStyles?.kickerTextColor || 'text-white'
  const headingColor = props.leftColumnStyles?.headingColor || 'text-white'
  const descriptionColor = props.leftColumnStyles?.descriptionColor || 'text-white/90'
  const columnHrColor = props.leftColumnStyles?.columnHrColor || 'bg-white/20'
  const stepsSubheadingColor = props.leftColumnStyles?.stepsSubheadingColor || 'text-white'
  const stepNumberColor = props.leftColumnStyles?.stepNumberColor || 'text-[#38BDF8]'
  const stepTextColor = props.leftColumnStyles?.stepTextColor || 'text-white'
  const matrixColor = props.leftColumnStyles?.matrixColor || 'bg-[#00D2FF]'
  const stepsContainerMarginBottomDesktop =
    props.leftColumnStyles?.stepsContainerMarginBottomDesktop || 'mb-10 md:mb-14'
  const stepsContainerMarginBottomMobile =
    props.leftColumnStyles?.stepsContainerMarginBottomMobile || 'mb-8'

  // Form Card Styling
  const formCardBgColor = props.formCardStyles?.formCardBgColor || 'bg-white'
  const submitButtonBgColor = props.formCardStyles?.submitButtonBgColor || 'bg-[#0000FF]'
  const submitButtonTextColor = props.formCardStyles?.submitButtonTextColor || 'text-white'
  const requiredAsteriskColor = props.formCardStyles?.requiredAsteriskColor || 'text-[#0000FF]'
  const requiredNoteColor = props.formCardStyles?.requiredNoteColor || 'text-gray-500'

  // Section Spacing
  const sectionBgColor = props.sectionBgColor || 'bg-[#0000FF]'
  const matchHeaderPillWidth = props.matchHeaderPillWidth ?? true
  const paddingTopDesktop = props.paddingTopDesktop || '80px'
  const paddingTopMobile = props.paddingTopMobile || '48px'
  const paddingBottomDesktop = props.paddingBottomDesktop || '80px'
  const paddingBottomMobile = props.paddingBottomMobile || '48px'
  const paddingLeftDesktop = props.paddingLeftDesktop || '32px'
  const paddingLeftMobile = props.paddingLeftMobile || '16px'
  const paddingRightDesktop = props.paddingRightDesktop || '32px'
  const paddingRightMobile = props.paddingRightMobile || '16px'

  // Form State
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    workEmail: '',
    organisation: '',
    jobTitle: '',
    sector: '',
    discussionTopic: '',
    viewingTime: '',
    followUpPreference: '',
    notes: '',
    consentAccepted: false,
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMessage(null)

    // Validation for enabled required fields
    if (firstNameConfig.enabled && firstNameConfig.isRequired && !formData.firstName.trim()) {
      setErrorMessage(`Please enter your ${firstNameConfig.label}.`)
      return
    }
    if (lastNameConfig.enabled && lastNameConfig.isRequired && !formData.lastName.trim()) {
      setErrorMessage(`Please enter your ${lastNameConfig.label}.`)
      return
    }
    if (workEmailConfig.enabled && workEmailConfig.isRequired && !formData.workEmail.trim()) {
      setErrorMessage(`Please enter your ${workEmailConfig.label}.`)
      return
    }
    if (orgConfig.enabled && orgConfig.isRequired && !formData.organisation.trim()) {
      setErrorMessage(`Please enter your ${orgConfig.label}.`)
      return
    }
    if (sectorConfig.enabled && sectorConfig.isRequired && !formData.sector.trim()) {
      setErrorMessage(`Please select your ${sectorConfig.label}.`)
      return
    }
    if (topicConfig.enabled && topicConfig.isRequired && !formData.discussionTopic.trim()) {
      setErrorMessage(`Please select your ${topicConfig.label}.`)
      return
    }
    if (consentEnabled && !formData.consentAccepted) {
      setErrorMessage('Please accept the privacy policy agreement to receive recording access.')
      return
    }

    setIsSubmitting(true)

    try {
      const response = await fetch('/api/webinar-recap-submission', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          workEmail: formData.workEmail,
          organisation: formData.organisation,
          jobTitle: formData.jobTitle,
          sector: formData.sector,
          discussionTopic: formData.discussionTopic,
          viewingTime: formData.viewingTime,
          followUpPreference: formData.followUpPreference,
          notes: formData.notes,
          consentAccepted: formData.consentAccepted,
          sourceWebinarTitle: topHeadingText || 'Webinar Replay',
          sourceWebinarSlug:
            typeof window !== 'undefined'
              ? window.location.pathname.split('/').filter(Boolean).pop() || 'webinar-recap'
              : 'webinar-recap',
          formFieldLabels: {
            firstName: firstNameConfig.label,
            lastName: lastNameConfig.label,
            workEmail: workEmailConfig.label,
            organisation: orgConfig.label,
            jobTitle: jobTitleConfig.label,
            sector: sectorConfig.label,
            discussionTopic: topicConfig.label,
            viewingTime: viewingTimeConfig.label,
            followUpPreference: followUpConfig.label,
            notes: notesConfig.label,
          },
        }),
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.error || 'Failed to submit recording access request.')
      }

      setSubmitSuccess(true)
    } catch (err: any) {
      setErrorMessage(err.message || 'Something went wrong. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const sectionStyle: React.CSSProperties = {
    paddingTop: `var(--pad-t, ${paddingTopDesktop})`,
    paddingBottom: `var(--pad-b, ${paddingBottomDesktop})`,
    paddingLeft: matchHeaderPillWidth ? undefined : `var(--pad-l, ${paddingLeftDesktop})`,
    paddingRight: matchHeaderPillWidth ? undefined : `var(--pad-r, ${paddingRightDesktop})`,
  }

  return (
    <section
      id={props.customSectionId || undefined}
      className={cn('w-full relative transition-colors duration-200', sectionBgColor)}
      style={sectionStyle}
    >
      <style jsx>{`
        section {
          --pad-t: ${paddingTopMobile};
          --pad-b: ${paddingBottomMobile};
          --pad-l: ${paddingLeftMobile};
          --pad-r: ${paddingRightMobile};
        }
        @media (min-width: 768px) {
          section {
            --pad-t: ${paddingTopDesktop};
            --pad-b: ${paddingBottomDesktop};
            --pad-l: ${paddingLeftDesktop};
            --pad-r: ${paddingRightDesktop};
          }
        }
      `}</style>

      <div
        className={cn(
          'w-full mx-auto',
          matchHeaderPillWidth ? 'max-w-[1472px] px-4 sm:px-6 lg:px-8' : 'w-full',
        )}
      >
        {/* ── 1. Top Bar: Access the recording | ON DEMAND ─────────────────── */}
        <div
          className={cn(
            'flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 sm:gap-4',
            topHeaderMarginBottomMobile,
            `md:${topHeaderMarginBottomDesktop}`,
          )}
        >
          {topHeadingText && (
            <h2
              className={cn(
                'tracking-tight m-0',
                topHeadingColor,
                topHeadingFontSizeMobile,
                `md:${topHeadingFontSizeDesktop}`,
                topHeadingFontWeightMobile,
                `md:${topHeadingFontWeightDesktop}`,
              )}
            >
              {topHeadingText}
            </h2>
          )}

          {topMetaText && (
            <span
              className={cn(
                'shrink-0 text-left sm:text-right uppercase tracking-wider',
                topMetaColor,
                topMetaFontSizeMobile,
                `md:${topMetaFontSizeDesktop}`,
              )}
            >
              {topMetaText}
            </span>
          )}
        </div>

        {/* ── 2. Top Horizontal Divider Line ───────────────────────────────── */}
        {topHrHeight !== 'h-0' && (
          <div
            className={cn(
              'w-full',
              topHrColor,
              topHrHeight,
              topHrMarginBottomMobile,
              `md:${topHrMarginBottomDesktop}`,
            )}
            role="separator"
          />
        )}

        {/* ── 3. Lead Paragraph Copy ───────────────────────────────────────── */}
        {leadDescriptionText && (
          <p
            className={cn(
              'leading-relaxed max-w-5xl whitespace-pre-line m-0',
              leadDescriptionColor,
              leadDescriptionFontSizeMobile,
              `md:${leadDescriptionFontSizeDesktop}`,
              leadDescriptionMarginBottomMobile,
              `md:${leadDescriptionMarginBottomDesktop}`,
            )}
            dangerouslySetInnerHTML={{ __html: formatInlineHtml(leadDescriptionText) }}
          />
        )}

        {/* ── 4. 2-Column Grid: Context/Roadmap & Form Card ─────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start">
          {/* Left Column (5 Cols) */}
          <div className="lg:col-span-5 text-white">
            {/* Kicker Pill */}
            {kickerText && (
              <div className="flex items-center gap-2.5 mb-3 sm:mb-4">
                <span
                  className={cn('w-2.5 h-2.5 rounded-[1px] shrink-0', kickerSquareColor)}
                  aria-hidden="true"
                />
                <span
                  className={cn(
                    'text-xs sm:text-sm font-semibold tracking-wider uppercase',
                    kickerTextColor,
                  )}
                >
                  {kickerText}
                </span>
              </div>
            )}

            {/* Main Heading */}
            {headingText && (
              <h3
                className={cn(
                  'text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-[1.12] mb-4 md:mb-6 whitespace-pre-line',
                  headingColor,
                )}
                dangerouslySetInnerHTML={{ __html: formatInlineHtml(headingText) }}
              />
            )}

            {/* Narrative Description */}
            {descriptionText && (
              <p
                className={cn(
                  'text-base md:text-lg leading-relaxed text-white/90 mb-6 md:mb-8 max-w-md',
                  descriptionColor,
                )}
                dangerouslySetInnerHTML={{ __html: formatInlineHtml(descriptionText) }}
              />
            )}

            {/* Mid-Column Divider Line */}
            <div
              className={cn('w-full h-px mb-6 md:mb-8', columnHrColor)}
              role="separator"
            />

            {/* Roadmap Subheading */}
            {stepsSubheadingText && (
              <h4
                className={cn(
                  'text-base md:text-lg font-semibold mb-4 sm:mb-5 tracking-tight',
                  stepsSubheadingColor,
                )}
              >
                {stepsSubheadingText}
              </h4>
            )}

            {/* Progressive Steps */}
            {steps && steps.length > 0 && (
              <div
                className={cn(
                  'space-y-3 sm:space-y-4',
                  stepsContainerMarginBottomMobile,
                  `md:${stepsContainerMarginBottomDesktop}`,
                )}
              >
                {steps.map((step, idx) => (
                  <div key={step.id || idx} className="flex items-start gap-3.5">
                    <span
                      className={cn(
                        'text-sm md:text-base font-semibold tracking-wider shrink-0 mt-0.5',
                        stepNumberColor,
                      )}
                    >
                      {step.numberText || `0${idx + 1}`}
                    </span>
                    <span
                      className={cn(
                        'text-sm md:text-base leading-relaxed',
                        stepTextColor,
                      )}
                    >
                      {step.text}
                    </span>
                  </div>
                ))}
              </div>
            )}

            {/* Bottom Graphic: 3x3 Cyan Square Matrix */}
            {showBottomIcon && (
              <div
                className="grid grid-cols-3 gap-1.5 w-12 h-12 mt-2"
                aria-hidden="true"
              >
                {Array.from({ length: 9 }).map((_, i) => (
                  <span
                    key={i}
                    className={cn('w-3 h-3 rounded-[1px] transition-colors', matrixColor)}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Right Column (7 Cols): On-Demand Access Form Card */}
          <div className="lg:col-span-7">
            <div
              className={cn(
                'rounded-2xl shadow-2xl p-6 sm:p-8 lg:p-10 transition-all duration-200 border border-slate-100',
                formCardBgColor,
              )}
            >
              {submitSuccess ? (
                <div className="py-8 text-center space-y-4">
                  <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">Recording Access Sent!</h3>
                  <p className="text-gray-600 max-w-md mx-auto text-sm sm:text-base leading-relaxed">
                    Thank you, <strong>{formData.firstName || 'there'}</strong>. We have sent the
                    on-demand webinar replay link directly to <strong>{formData.workEmail}</strong>.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setSubmitSuccess(false)
                      setFormData({
                        firstName: '',
                        lastName: '',
                        workEmail: '',
                        organisation: '',
                        jobTitle: '',
                        sector: '',
                        discussionTopic: '',
                        viewingTime: '',
                        followUpPreference: '',
                        notes: '',
                        consentAccepted: false,
                      })
                    }}
                    className="mt-4 px-6 py-2.5 bg-blue-600 text-white rounded-lg text-sm font-semibold hover:bg-blue-700 transition-colors cursor-pointer"
                  >
                    Register Another Attendee
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
                  {errorMessage && (
                    <div className="p-3.5 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                      {errorMessage}
                    </div>
                  )}

                  {/* Row 1: First Name & Last Name (Responsive Flex 2-Col) */}
                  {(firstNameConfig.enabled || lastNameConfig.enabled) && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {firstNameConfig.enabled && (
                        <div className={cn(lastNameConfig.enabled ? 'col-span-1' : 'sm:col-span-2')}>
                          <label className="block text-xs sm:text-sm font-semibold text-gray-800 mb-1.5">
                            {firstNameConfig.label}{' '}
                            {firstNameConfig.isRequired && (
                              <span className={requiredAsteriskColor}>*</span>
                            )}
                          </label>
                          <input
                            type="text"
                            required={firstNameConfig.isRequired}
                            placeholder={firstNameConfig.placeholder}
                            value={formData.firstName}
                            onChange={(e) =>
                              setFormData({ ...formData, firstName: e.target.value })
                            }
                            className="w-full px-3.5 py-2.5 border border-gray-300 rounded-md text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
                          />
                        </div>
                      )}

                      {lastNameConfig.enabled && (
                        <div className={cn(firstNameConfig.enabled ? 'col-span-1' : 'sm:col-span-2')}>
                          <label className="block text-xs sm:text-sm font-semibold text-gray-800 mb-1.5">
                            {lastNameConfig.label}{' '}
                            {lastNameConfig.isRequired && (
                              <span className={requiredAsteriskColor}>*</span>
                            )}
                          </label>
                          <input
                            type="text"
                            required={lastNameConfig.isRequired}
                            placeholder={lastNameConfig.placeholder}
                            value={formData.lastName}
                            onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                            className="w-full px-3.5 py-2.5 border border-gray-300 rounded-md text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
                          />
                        </div>
                      )}
                    </div>
                  )}

                  {/* Row 2: Work Email */}
                  {workEmailConfig.enabled && (
                    <div>
                      <label className="block text-xs sm:text-sm font-semibold text-gray-800 mb-1.5">
                        {workEmailConfig.label}{' '}
                        {workEmailConfig.isRequired && (
                          <span className={requiredAsteriskColor}>*</span>
                        )}
                      </label>
                      <input
                        type="email"
                        required={workEmailConfig.isRequired}
                        placeholder={workEmailConfig.placeholder}
                        value={formData.workEmail}
                        onChange={(e) => setFormData({ ...formData, workEmail: e.target.value })}
                        className="w-full px-3.5 py-2.5 border border-gray-300 rounded-md text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
                      />
                    </div>
                  )}

                  {/* Row 3: Organisation & Job Title */}
                  {(orgConfig.enabled || jobTitleConfig.enabled) && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {orgConfig.enabled && (
                        <div className={cn(jobTitleConfig.enabled ? 'col-span-1' : 'sm:col-span-2')}>
                          <label className="block text-xs sm:text-sm font-semibold text-gray-800 mb-1.5">
                            {orgConfig.label}{' '}
                            {orgConfig.isRequired && (
                              <span className={requiredAsteriskColor}>*</span>
                            )}
                          </label>
                          <input
                            type="text"
                            required={orgConfig.isRequired}
                            placeholder={orgConfig.placeholder}
                            value={formData.organisation}
                            onChange={(e) =>
                              setFormData({ ...formData, organisation: e.target.value })
                            }
                            className="w-full px-3.5 py-2.5 border border-gray-300 rounded-md text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
                          />
                        </div>
                      )}

                      {jobTitleConfig.enabled && (
                        <div className={cn(orgConfig.enabled ? 'col-span-1' : 'sm:col-span-2')}>
                          <label className="block text-xs sm:text-sm font-semibold text-gray-800 mb-1.5">
                            {jobTitleConfig.label}{' '}
                            {jobTitleConfig.isRequired && (
                              <span className={requiredAsteriskColor}>*</span>
                            )}
                          </label>
                          <input
                            type="text"
                            required={jobTitleConfig.isRequired}
                            placeholder={jobTitleConfig.placeholder}
                            value={formData.jobTitle}
                            onChange={(e) =>
                              setFormData({ ...formData, jobTitle: e.target.value })
                            }
                            className="w-full px-3.5 py-2.5 border border-gray-300 rounded-md text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
                          />
                        </div>
                      )}
                    </div>
                  )}

                  {/* Row 4: Sector Dropdown */}
                  {sectorConfig.enabled && (
                    <div>
                      <label className="block text-xs sm:text-sm font-semibold text-gray-800 mb-1.5">
                        {sectorConfig.label}{' '}
                        {sectorConfig.isRequired && (
                          <span className={requiredAsteriskColor}>*</span>
                        )}
                      </label>
                      <select
                        required={sectorConfig.isRequired}
                        value={formData.sector}
                        onChange={(e) => setFormData({ ...formData, sector: e.target.value })}
                        className="w-full px-3.5 py-2.5 border border-gray-300 rounded-md text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
                      >
                        <option value="">{sectorConfig.placeholder}</option>
                        {sectorConfig.options?.map((opt, i) => (
                          <option key={opt.id || i} value={opt.label}>
                            {opt.label}
                          </option>
                        ))}
                      </select>
                      {sectorConfig.helperText && (
                        <p className="text-[11.5px] text-gray-500 mt-1">
                          {sectorConfig.helperText}
                        </p>
                      )}
                    </div>
                  )}

                  {/* Row 5: What topics are most relevant to you? */}
                  {topicConfig.enabled && (
                    <div>
                      <label className="block text-xs sm:text-sm font-semibold text-gray-800 mb-1.5">
                        {topicConfig.label}{' '}
                        {topicConfig.isRequired && (
                          <span className={requiredAsteriskColor}>*</span>
                        )}
                      </label>
                      <select
                        required={topicConfig.isRequired}
                        value={formData.discussionTopic}
                        onChange={(e) =>
                          setFormData({ ...formData, discussionTopic: e.target.value })
                        }
                        className="w-full px-3.5 py-2.5 border border-gray-300 rounded-md text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
                      >
                        <option value="">{topicConfig.placeholder}</option>
                        {topicConfig.options?.map((opt, i) => (
                          <option key={opt.id || i} value={opt.label}>
                            {opt.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}

                  {/* Row 6: Preferred viewing time & Follow-up preference */}
                  {(viewingTimeConfig.enabled || followUpConfig.enabled) && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {viewingTimeConfig.enabled && (
                        <div className={cn(followUpConfig.enabled ? 'col-span-1' : 'sm:col-span-2')}>
                          <label className="block text-xs sm:text-sm font-semibold text-gray-800 mb-1.5">
                            {viewingTimeConfig.label}{' '}
                            {viewingTimeConfig.isRequired && (
                              <span className={requiredAsteriskColor}>*</span>
                            )}
                          </label>
                          <select
                            required={viewingTimeConfig.isRequired}
                            value={formData.viewingTime}
                            onChange={(e) =>
                              setFormData({ ...formData, viewingTime: e.target.value })
                            }
                            className="w-full px-3.5 py-2.5 border border-gray-300 rounded-md text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
                          >
                            <option value="">{viewingTimeConfig.placeholder}</option>
                            {viewingTimeConfig.options?.map((opt, i) => (
                              <option key={opt.id || i} value={opt.label}>
                                {opt.label}
                              </option>
                            ))}
                          </select>
                        </div>
                      )}

                      {followUpConfig.enabled && (
                        <div className={cn(viewingTimeConfig.enabled ? 'col-span-1' : 'sm:col-span-2')}>
                          <label className="block text-xs sm:text-sm font-semibold text-gray-800 mb-1.5">
                            {followUpConfig.label}{' '}
                            {followUpConfig.isRequired && (
                              <span className={requiredAsteriskColor}>*</span>
                            )}
                          </label>
                          <select
                            required={followUpConfig.isRequired}
                            value={formData.followUpPreference}
                            onChange={(e) =>
                              setFormData({ ...formData, followUpPreference: e.target.value })
                            }
                            className="w-full px-3.5 py-2.5 border border-gray-300 rounded-md text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
                          >
                            <option value="">{followUpConfig.placeholder}</option>
                            {followUpConfig.options?.map((opt, i) => (
                              <option key={opt.id || i} value={opt.label}>
                                {opt.label}
                              </option>
                            ))}
                          </select>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Row 7: Anything else you'd like us to know? */}
                  {notesConfig.enabled && (
                    <div>
                      <label className="block text-xs sm:text-sm font-semibold text-gray-800 mb-1.5">
                        {notesConfig.label}{' '}
                        {notesConfig.isRequired && (
                          <span className={requiredAsteriskColor}>*</span>
                        )}
                      </label>
                      <textarea
                        rows={3}
                        required={notesConfig.isRequired}
                        placeholder={notesConfig.placeholder}
                        value={formData.notes}
                        onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                        className="w-full px-3.5 py-2.5 border border-gray-300 rounded-md text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
                      />
                    </div>
                  )}

                  {/* Row 8: Consent Checkbox Agreement */}
                  {consentEnabled && (
                    <div className="flex items-start gap-3 pt-1">
                      <input
                        type="checkbox"
                        id="consentAcceptedWebinar"
                        required
                        checked={formData.consentAccepted}
                        onChange={(e) =>
                          setFormData({ ...formData, consentAccepted: e.target.checked })
                        }
                        className="mt-1 h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                      />
                      <label
                        htmlFor="consentAcceptedWebinar"
                        className="text-xs text-gray-600 leading-normal cursor-pointer"
                        dangerouslySetInnerHTML={{ __html: consentLabel }}
                      />
                    </div>
                  )}

                  {/* Row 9: Action Row */}
                  <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={cn(
                        'inline-flex items-center justify-center gap-2 px-7 py-3 rounded-md font-semibold text-sm transition-all duration-200 shadow-md hover:shadow-lg disabled:opacity-60 cursor-pointer',
                        submitButtonBgColor,
                        submitButtonTextColor,
                      )}
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>Processing...</span>
                        </>
                      ) : (
                        <>
                          <span>{submitButtonText}</span>
                          <ArrowUpRight className="w-4 h-4" />
                        </>
                      )}
                    </button>

                    {requiredNoteText && (
                      <span className={cn('text-xs', requiredNoteColor)}>
                        {requiredNoteText}
                      </span>
                    )}
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default WebinarRecapAccessBlock
