import { useRef, useState, type FormEvent, type FocusEvent, type ChangeEvent } from 'react'
import { Button } from '@/components/ui/Button'
import {
  ACCEPTED_VIDEO_TYPES,
  MAX_VIDEO_BYTES,
  SUBMIT_URL,
  isSubmitUrlConfigured,
} from '@/data/danceChallenge'

type FieldName =
  | 'parentEmail'
  | 'childFirstName'
  | 'childLastName'
  | 'childEmail'
  | 'digiWalletNumber'
  | 'videoFile'
  | 'consent'

interface FormValues {
  parentEmail: string
  childFirstName: string
  childLastName: string
  childEmail: string
  digiWalletNumber: string
  consent: boolean
  website: string
}

type FormErrors = Partial<Record<FieldName, string>>

type SubmitState = 'idle' | 'submitting' | 'success' | 'error'

const INITIAL_VALUES: FormValues = {
  parentEmail: '',
  childFirstName: '',
  childLastName: '',
  childEmail: '',
  digiWalletNumber: '',
  consent: false,
  website: '',
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const VIDEO_MIME_OK = new Set([
  'video/mp4',
  'video/quicktime',
  'video/webm',
  'video/x-msvideo',
  'video/avi',
])

function formatMb(bytes: number): string {
  return `${Math.round(bytes / (1024 * 1024))} MB`
}

function validateTextField(name: Exclude<FieldName, 'videoFile' | 'consent'>, values: FormValues): string | undefined {
  switch (name) {
    case 'parentEmail':
      if (!values.parentEmail.trim()) return 'Parent/guardian email is required.'
      if (!EMAIL_RE.test(values.parentEmail.trim())) return 'Enter a valid email address.'
      return undefined
    case 'childFirstName':
      if (!values.childFirstName.trim()) return 'Child first name is required.'
      return undefined
    case 'childLastName':
      if (!values.childLastName.trim()) return 'Child last name is required.'
      return undefined
    case 'childEmail':
      if (!values.childEmail.trim()) return 'Child email is required.'
      if (!EMAIL_RE.test(values.childEmail.trim())) return 'Enter a valid email address.'
      return undefined
    case 'digiWalletNumber':
      if (!values.digiWalletNumber.trim()) return 'DigiWallet number is required.'
      return undefined
    default:
      return undefined
  }
}

function validateVideoFile(file: File | null): string | undefined {
  if (!file) return 'Please upload your dance video.'
  if (file.size > MAX_VIDEO_BYTES) {
    return `Video must be ${formatMb(MAX_VIDEO_BYTES)} or smaller.`
  }
  const typeOk =
    VIDEO_MIME_OK.has(file.type) ||
    /\.(mp4|mov|webm|avi)$/i.test(file.name)
  if (!typeOk) return 'Upload an MP4, MOV, WebM, or AVI video.'
  return undefined
}

function validateAll(values: FormValues, videoFile: File | null): FormErrors {
  const next: FormErrors = {}
  for (const field of [
    'parentEmail',
    'childFirstName',
    'childLastName',
    'childEmail',
    'digiWalletNumber',
  ] as const) {
    const error = validateTextField(field, values)
    if (error) next[field] = error
  }
  const videoError = validateVideoFile(videoFile)
  if (videoError) next.videoFile = videoError
  if (!values.consent) next.consent = 'Parent/guardian consent is required.'
  return next
}

function readFileAsBase64(file: File): Promise<{ base64: string; mimeType: string }> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => {
      const result = String(reader.result ?? '')
      const comma = result.indexOf(',')
      const base64 = comma >= 0 ? result.slice(comma + 1) : result
      resolve({ base64, mimeType: file.type || 'video/mp4' })
    }
    reader.onerror = () => reject(reader.error ?? new Error('Could not read video file'))
    reader.readAsDataURL(file)
  })
}

const inputClass =
  'w-full px-4 py-3 rounded-xl bg-white dark:bg-white/5 border border-navy/12 dark:border-white/10 text-sm text-ink dark:text-white placeholder:text-ink-subtle dark:placeholder:text-white/30 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/25 transition-shadow'

const labelClass = 'block text-sm font-semibold text-ink dark:text-white mb-1.5'

export function DanceChallengeSignupForm() {
  const [values, setValues] = useState<FormValues>(INITIAL_VALUES)
  const [videoFile, setVideoFile] = useState<File | null>(null)
  const [errors, setErrors] = useState<FormErrors>({})
  const [submitState, setSubmitState] = useState<SubmitState>('idle')
  const fileInputRef = useRef<HTMLInputElement>(null)

  const setField = <K extends keyof FormValues>(key: K, value: FormValues[K]) => {
    setValues((prev) => ({ ...prev, [key]: value }))
  }

  const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
    const name = e.target.name
    if (name === 'website' || name === 'videoFile' || name === 'consent') return
    if (
      name !== 'parentEmail' &&
      name !== 'childFirstName' &&
      name !== 'childLastName' &&
      name !== 'childEmail' &&
      name !== 'digiWalletNumber'
    ) {
      return
    }
    const error = validateTextField(name, values)
    setErrors((prev) => {
      const next = { ...prev }
      if (error) next[name] = error
      else delete next[name]
      return next
    })
  }

  const handleVideoChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null
    setVideoFile(file)
    const error = validateVideoFile(file)
    setErrors((prev) => {
      const next = { ...prev }
      if (error) next.videoFile = error
      else delete next.videoFile
      return next
    })
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    if (values.website.trim()) {
      setSubmitState('success')
      setValues(INITIAL_VALUES)
      setVideoFile(null)
      if (fileInputRef.current) fileInputRef.current.value = ''
      setErrors({})
      return
    }

    const nextErrors = validateAll(values, videoFile)
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0 || !videoFile) {
      setSubmitState('idle')
      return
    }

    setSubmitState('submitting')

    if (!isSubmitUrlConfigured()) {
      setSubmitState('error')
      setErrors((prev) => ({
        ...prev,
        videoFile:
          'Form is not connected yet — paste your Google Apps Script Web App URL (/exec) into SUBMIT_URL.',
      }))
      return
    }

    try {
      const { base64, mimeType } = await readFileAsBase64(videoFile)

      const payload = {
        parentEmail: values.parentEmail.trim(),
        childFirstName: values.childFirstName.trim(),
        childLastName: values.childLastName.trim(),
        childEmail: values.childEmail.trim(),
        digiWalletNumber: values.digiWalletNumber.trim(),
        videoFileName: videoFile.name,
        videoMimeType: mimeType,
        videoData: base64,
        website: values.website,
      }

      const response = await fetch(SUBMIT_URL, {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      })

      if (!response.ok) throw new Error(`Request failed with status ${response.status}`)

      setSubmitState('success')
      setValues(INITIAL_VALUES)
      setVideoFile(null)
      if (fileInputRef.current) fileInputRef.current.value = ''
      setErrors({})
    } catch {
      setSubmitState('error')
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5" aria-describedby="signup-status">
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          left: '-10000px',
          top: 'auto',
          width: '1px',
          height: '1px',
          overflow: 'hidden',
        }}
      >
        <label htmlFor="dc-website">Website</label>
        <input
          id="dc-website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={values.website}
          onChange={(e) => setField('website', e.target.value)}
        />
      </div>

      <div>
        <label htmlFor="dc-parent-email" className={labelClass}>
          Parent/Guardian Email
        </label>
        <input
          id="dc-parent-email"
          name="parentEmail"
          type="email"
          required
          autoComplete="email"
          className={inputClass}
          value={values.parentEmail}
          onChange={(e) => setField('parentEmail', e.target.value)}
          onBlur={handleBlur}
          aria-invalid={Boolean(errors.parentEmail)}
          aria-describedby={errors.parentEmail ? 'dc-parent-email-error' : undefined}
        />
        {errors.parentEmail && (
          <p id="dc-parent-email-error" className="mt-1.5 text-sm text-red-600 dark:text-red-400" role="alert">
            {errors.parentEmail}
          </p>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="dc-child-first" className={labelClass}>
            Child First Name
          </label>
          <input
            id="dc-child-first"
            name="childFirstName"
            type="text"
            required
            autoComplete="given-name"
            className={inputClass}
            value={values.childFirstName}
            onChange={(e) => setField('childFirstName', e.target.value)}
            onBlur={handleBlur}
            aria-invalid={Boolean(errors.childFirstName)}
            aria-describedby={errors.childFirstName ? 'dc-child-first-error' : undefined}
          />
          {errors.childFirstName && (
            <p id="dc-child-first-error" className="mt-1.5 text-sm text-red-600 dark:text-red-400" role="alert">
              {errors.childFirstName}
            </p>
          )}
        </div>
        <div>
          <label htmlFor="dc-child-last" className={labelClass}>
            Child Last Name
          </label>
          <input
            id="dc-child-last"
            name="childLastName"
            type="text"
            required
            autoComplete="family-name"
            className={inputClass}
            value={values.childLastName}
            onChange={(e) => setField('childLastName', e.target.value)}
            onBlur={handleBlur}
            aria-invalid={Boolean(errors.childLastName)}
            aria-describedby={errors.childLastName ? 'dc-child-last-error' : undefined}
          />
          {errors.childLastName && (
            <p id="dc-child-last-error" className="mt-1.5 text-sm text-red-600 dark:text-red-400" role="alert">
              {errors.childLastName}
            </p>
          )}
        </div>
      </div>

      <div>
        <label htmlFor="dc-child-email" className={labelClass}>
          Child Email (linked to MoneyTykes account)
        </label>
        <input
          id="dc-child-email"
          name="childEmail"
          type="email"
          required
          autoComplete="email"
          className={inputClass}
          value={values.childEmail}
          onChange={(e) => setField('childEmail', e.target.value)}
          onBlur={handleBlur}
          aria-invalid={Boolean(errors.childEmail)}
          aria-describedby={errors.childEmail ? 'dc-child-email-error' : undefined}
        />
        {errors.childEmail && (
          <p id="dc-child-email-error" className="mt-1.5 text-sm text-red-600 dark:text-red-400" role="alert">
            {errors.childEmail}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="dc-digiwallet" className={labelClass}>
          DigiWallet Number
        </label>
        <input
          id="dc-digiwallet"
          name="digiWalletNumber"
          type="text"
          required
          inputMode="numeric"
          className={inputClass}
          value={values.digiWalletNumber}
          onChange={(e) => setField('digiWalletNumber', e.target.value)}
          onBlur={handleBlur}
          aria-invalid={Boolean(errors.digiWalletNumber)}
          aria-describedby={errors.digiWalletNumber ? 'dc-digiwallet-error' : undefined}
        />
        {errors.digiWalletNumber && (
          <p id="dc-digiwallet-error" className="mt-1.5 text-sm text-red-600 dark:text-red-400" role="alert">
            {errors.digiWalletNumber}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="dc-video-file" className={labelClass}>
          Upload your dance video to MoneyTykes Google Drive
        </label>
        <input
          ref={fileInputRef}
          id="dc-video-file"
          name="videoFile"
          type="file"
          required
          accept={ACCEPTED_VIDEO_TYPES}
          className={`${inputClass} file:mr-3 file:rounded-lg file:border-0 file:bg-accent file:px-3 file:py-1.5 file:text-sm file:font-semibold file:text-ink cursor-pointer`}
          onChange={handleVideoChange}
          onBlur={() => {
            const error = validateVideoFile(videoFile)
            setErrors((prev) => {
              const next = { ...prev }
              if (error) next.videoFile = error
              else delete next.videoFile
              return next
            })
          }}
          aria-invalid={Boolean(errors.videoFile)}
          aria-describedby={errors.videoFile ? 'dc-video-file-error dc-video-file-help' : 'dc-video-file-help'}
        />
        <p id="dc-video-file-help" className="mt-1.5 text-xs text-ink-muted dark:text-white/70">
          Upload a 30–60 second video (MP4 or MOV recommended, max {formatMb(MAX_VIDEO_BYTES)}). It will be
          saved to the official MoneyTykes Google Drive when you submit.
          {videoFile ? (
            <>
              {' '}
              Selected: <span className="font-semibold text-ink dark:text-white">{videoFile.name}</span>
            </>
          ) : null}
        </p>
        {errors.videoFile && (
          <p id="dc-video-file-error" className="mt-1.5 text-sm text-red-600 dark:text-red-400" role="alert">
            {errors.videoFile}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="dc-consent" className="flex items-start gap-3 cursor-pointer">
          <input
            id="dc-consent"
            name="consent"
            type="checkbox"
            required
            className="mt-1 w-4 h-4 rounded border-navy/30 text-primary focus:ring-2 focus:ring-primary/40 shrink-0"
            checked={values.consent}
            onChange={(e) => setField('consent', e.target.checked)}
            onBlur={() => {
              const error = !values.consent ? 'Parent/guardian consent is required.' : undefined
              setErrors((prev) => {
                const next = { ...prev }
                if (error) next.consent = error
                else delete next.consent
                return next
              })
            }}
            aria-invalid={Boolean(errors.consent)}
            aria-describedby={errors.consent ? 'dc-consent-error' : undefined}
          />
          <span className="text-sm text-ink-muted dark:text-white/80 leading-relaxed">
            I am this child&apos;s parent/guardian, I consent to their participation, and I confirm they
            are an active MoneyTykes user between ages 5–17.
          </span>
        </label>
        {errors.consent && (
          <p id="dc-consent-error" className="mt-1.5 text-sm text-red-600 dark:text-red-400" role="alert">
            {errors.consent}
          </p>
        )}
      </div>

      <div id="signup-status" aria-live="polite" className="min-h-[1.5rem]">
        {submitState === 'success' && (
          <p className="text-sm font-semibold text-primary-dark dark:text-primary">
            You&apos;re entered! Good luck 🎉
          </p>
        )}
        {submitState === 'error' && (
          <p className="text-sm font-semibold text-red-600 dark:text-red-400">
            Something went wrong. Please try again.
          </p>
        )}
      </div>

      <Button
        type="submit"
        variant="secondary"
        size="lg"
        magnetic={false}
        disabled={submitState === 'submitting'}
        className="w-full sm:w-auto disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {submitState === 'submitting' ? 'Uploading video…' : 'Submit Entry'}
      </Button>
    </form>
  )
}
