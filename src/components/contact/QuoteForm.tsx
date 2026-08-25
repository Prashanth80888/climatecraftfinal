import { useEffect, useRef, useState, type FormEvent } from 'react'
import { useSearchParams } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { AlertCircle, ArrowRight, MessageCircle, Pencil } from 'lucide-react'
import { HOME_PRODUCTS, PRODUCT_FAMILIES, getProductBySlug } from '../../data/homeProducts'
import { whatsappHref } from '../../lib/assets'
import { Select, type SelectGroup } from './Select'

const easeOut: [number, number, number, number] = [0.16, 1, 0.3, 1]

const PROJECT_TYPES = [
  'Residential',
  'Hospitality',
  'Healthcare / Clinic',
  'Office / Corporate',
  'Gallery / Retail',
  'Trade / Wholesale',
  'White-label / OEM',
  'Other',
]

const QUANTITY_OPTIONS = ['1', '2–5', '6–10', '11–25', '26–50', '50+', 'Not sure yet']

const TIMELINE_OPTIONS = ['As soon as possible', 'Within 1 month', '1–3 months', '3–6 months', '6+ months', 'Just exploring']

const FAMILY_PRODUCTS = PRODUCT_FAMILIES.map((family) => ({
  family,
  products: HOME_PRODUCTS.filter((p) => p.familyId === family.id),
}))

const PROJECT_TYPE_GROUPS: SelectGroup[] = [{ options: PROJECT_TYPES.map((t) => ({ value: t, label: t })) }]
const QUANTITY_GROUPS: SelectGroup[] = [{ options: QUANTITY_OPTIONS.map((q) => ({ value: q, label: q })) }]
const TIMELINE_GROUPS: SelectGroup[] = [{ options: TIMELINE_OPTIONS.map((t) => ({ value: t, label: t })) }]

const PRODUCT_GROUPS: SelectGroup[] = [
  ...FAMILY_PRODUCTS.map(({ family, products }) => ({
    label: family.label,
    options: [
      { value: `family:${family.id}`, label: `Any product — ${family.label}` },
      ...products.map((p) => ({ value: p.slug, label: p.name })),
    ],
  })),
  { options: [{ value: 'not-sure', label: 'Not sure — help me choose' }] },
]

interface FormValues {
  name: string
  email: string
  company: string
  phone: string
  projectType: string
  productSlug: string
  quantity: string
  timeline: string
  message: string
}

type FormErrors = Partial<Record<keyof FormValues, string>>

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const PHONE_PATTERN = /^[0-9+()\-\s]{7,20}$/

type ProductSelection =
  | { kind: 'none' }
  | { kind: 'not-sure' }
  | { kind: 'family'; family: (typeof PRODUCT_FAMILIES)[number] }
  | { kind: 'product'; product: ReturnType<typeof getProductBySlug>; family: (typeof PRODUCT_FAMILIES)[number] | undefined }

function resolveProductSelection(productSlug: string): ProductSelection {
  if (!productSlug) return { kind: 'none' }
  if (productSlug === 'not-sure') return { kind: 'not-sure' }
  if (productSlug.startsWith('family:')) {
    const familyId = productSlug.slice('family:'.length)
    const family = PRODUCT_FAMILIES.find((f) => f.id === familyId)
    return family ? { kind: 'family', family } : { kind: 'none' }
  }
  const product = getProductBySlug(productSlug)
  if (!product) return { kind: 'none' }
  const family = PRODUCT_FAMILIES.find((f) => f.id === product.familyId)
  return { kind: 'product', product, family }
}

function productLabelFor(selection: ProductSelection): string {
  switch (selection.kind) {
    case 'product':
      return selection.product ? `${selection.product.name} (${selection.family?.label ?? 'Climate Craft'})` : 'Not specified'
    case 'family':
      return `Any product — ${selection.family.label}`
    case 'not-sure':
      return 'Not sure — help me choose'
    default:
      return 'Not specified'
  }
}

function buildWhatsAppMessage(values: FormValues): string {
  const selection = resolveProductSelection(values.productSlug)

  const lines = [
    'Hello Climate Craft,',
    '',
    'I would like to enquire about a Climate Craft project.',
    '',
    `Name: ${values.name.trim()}`,
    `Email: ${values.email.trim()}`,
    `Company: ${values.company.trim() || 'Not provided'}`,
    `Phone: ${values.phone.trim() || 'Not provided'}`,
    '',
    `Project Type: ${values.projectType}`,
    `Product / Collection: ${productLabelFor(selection)}`,
    `Estimated Quantity: ${values.quantity}`,
    `Preferred Timeline: ${values.timeline || 'Not specified'}`,
    '',
    'Project Details:',
    values.message.trim() || 'Not provided',
    '',
    'Thank you.',
  ]

  return lines.join('\n')
}

const inputClass =
  'mt-2 w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-[14px] text-cream-100 placeholder:text-cream-200/30 outline-none transition-all duration-300 focus:border-gold-400/50 focus:bg-white/[0.05]'
const labelClass = 'text-[11px] font-medium uppercase tracking-widest text-cream-200/60'
const groupHeadingClass = 'text-[11px] font-semibold uppercase tracking-widest text-gold-400/70'

function FieldError({ id, message }: { id: string; message?: string }) {
  return (
    <AnimatePresence initial={false}>
      {message && (
        <motion.p
          id={id}
          initial={{ opacity: 0, y: -4, height: 0 }}
          animate={{ opacity: 1, y: 0, height: 'auto' }}
          exit={{ opacity: 0, y: -4, height: 0 }}
          transition={{ duration: 0.25, ease: easeOut }}
          className="mt-1.5 flex items-center gap-1.5 overflow-hidden text-[12px] text-gold-400"
        >
          <AlertCircle className="h-3.5 w-3.5 flex-none" />
          {message}
        </motion.p>
      )}
    </AnimatePresence>
  )
}

export function QuoteForm() {
  const [searchParams] = useSearchParams()
  const initialSlug = (() => {
    const fromQuery = searchParams.get('product')
    return fromQuery && getProductBySlug(fromQuery) ? fromQuery : ''
  })()

  const [values, setValues] = useState<FormValues>({
    name: '',
    email: '',
    company: '',
    phone: '',
    projectType: '',
    productSlug: initialSlug,
    quantity: '',
    timeline: '',
    message: '',
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [phase, setPhase] = useState<'idle' | 'submitting' | 'success'>('idle')
  const [lastUrl, setLastUrl] = useState<string | null>(null)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
  }, [])

  const selection = resolveProductSelection(values.productSlug)

  function update<K extends keyof FormValues>(key: K, value: FormValues[K]) {
    setValues((v) => ({ ...v, [key]: value }))
    setErrors((e) => ({ ...e, [key]: undefined }))
  }

  function validate(v: FormValues): FormErrors {
    const next: FormErrors = {}
    if (!v.name.trim()) next.name = 'Full name is required.'
    if (!v.email.trim()) next.email = 'Email is required.'
    else if (!EMAIL_PATTERN.test(v.email.trim())) next.email = 'Enter a valid email address.'
    if (v.phone.trim() && !PHONE_PATTERN.test(v.phone.trim())) next.phone = 'Enter a valid phone number.'
    if (!v.projectType) next.projectType = 'Select a project type.'
    if (!v.quantity) next.quantity = 'Select an estimated quantity.'
    return next
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (phase === 'submitting') return

    const validation = validate(values)
    setErrors(validation)
    if (Object.keys(validation).length > 0) return

    setPhase('submitting')
    timeoutRef.current = setTimeout(() => {
      const message = buildWhatsAppMessage(values)
      const url = whatsappHref(message)
      setLastUrl(url)
      window.open(url, '_blank', 'noopener,noreferrer')
      setPhase('success')
    }, 650)
  }

  if (phase === 'success' && lastUrl) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 12, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: easeOut }}
        className="relative overflow-hidden rounded-[24px] border border-white/[0.08] bg-white/[0.02] p-8 text-center sm:p-10"
      >
        <div
          className="pointer-events-none absolute left-1/2 top-0 h-64 w-64 -translate-x-1/2 -translate-y-1/3 rounded-full opacity-[0.18] blur-[90px]"
          style={{ background: 'radial-gradient(circle, #f0a92c 0%, #1d7a6f 55%, transparent 75%)' }}
        />

        <div className="relative mx-auto flex h-16 w-16 items-center justify-center">
          <svg viewBox="0 0 52 52" className="h-16 w-16">
            <motion.circle
              cx="26"
              cy="26"
              r="24"
              fill="none"
              stroke="#f0a92c"
              strokeWidth="1.5"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 0.6, ease: easeOut }}
            />
            <motion.path
              d="M15 27l7 7 15-15"
              fill="none"
              stroke="#f0a92c"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.45, ease: easeOut }}
            />
          </svg>
        </div>

        <h3 className="relative mt-6 font-display text-2xl text-cream-100 sm:text-3xl">Enquiry ready.</h3>
        <p className="relative mx-auto mt-3 max-w-sm text-[14.5px] leading-relaxed text-cream-200/65">
          Your enquiry has been prepared. WhatsApp will open so you can continue the conversation with Climate
          Craft.
        </p>

        <div className="relative mx-auto mt-7 max-w-sm space-y-2.5 rounded-xl border border-white/10 bg-white/[0.02] p-5 text-left">
          <div className="flex items-center justify-between gap-4">
            <span className="text-[11px] uppercase tracking-widest text-cream-200/45">Product / Collection</span>
            <span className="text-[13px] text-cream-100">{productLabelFor(selection)}</span>
          </div>
          <div className="flex items-center justify-between gap-4">
            <span className="text-[11px] uppercase tracking-widest text-cream-200/45">Project Type</span>
            <span className="text-[13px] text-cream-100">{values.projectType}</span>
          </div>
          <div className="flex items-center justify-between gap-4">
            <span className="text-[11px] uppercase tracking-widest text-cream-200/45">Quantity</span>
            <span className="text-[13px] text-cream-100">{values.quantity}</span>
          </div>
        </div>

        <div className="relative mt-8 flex flex-wrap items-center justify-center gap-4">
          <a href={lastUrl} target="_blank" rel="noreferrer" className="group btn-primary">
            Continue on WhatsApp
            <MessageCircle className="h-4 w-4 transition-transform duration-300 group-hover:scale-110" />
          </a>
          <button type="button" onClick={() => setPhase('idle')} className="group btn-outline">
            Edit enquiry
            <Pencil className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5" />
          </button>
        </div>
      </motion.div>
    )
  }

  return (
    <form noValidate onSubmit={handleSubmit} className="space-y-8">
      <div className="space-y-6">
        <p className={groupHeadingClass}>Personal Information</p>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <label htmlFor="name" className={labelClass}>
              Full Name *
            </label>
            <input
              id="name"
              name="name"
              type="text"
              autoComplete="name"
              placeholder="Your full name"
              required
              value={values.name}
              onChange={(e) => update('name', e.target.value)}
              className={inputClass}
              aria-invalid={Boolean(errors.name)}
              aria-describedby={errors.name ? 'name-error' : undefined}
            />
            <FieldError id="name-error" message={errors.name} />
          </div>

          <div>
            <label htmlFor="email" className={labelClass}>
              Email *
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="you@company.com"
              required
              value={values.email}
              onChange={(e) => update('email', e.target.value)}
              className={inputClass}
              aria-invalid={Boolean(errors.email)}
              aria-describedby={errors.email ? 'email-error' : undefined}
            />
            <FieldError id="email-error" message={errors.email} />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <label htmlFor="company" className={labelClass}>
              Company
            </label>
            <input
              id="company"
              name="company"
              type="text"
              autoComplete="organization"
              placeholder="Studio, gallery or business name"
              value={values.company}
              onChange={(e) => update('company', e.target.value)}
              className={inputClass}
            />
          </div>

          <div>
            <label htmlFor="phone" className={labelClass}>
              Phone
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              autoComplete="tel"
              placeholder="+91 00000 00000"
              value={values.phone}
              onChange={(e) => update('phone', e.target.value)}
              className={inputClass}
              aria-invalid={Boolean(errors.phone)}
              aria-describedby={errors.phone ? 'phone-error' : undefined}
            />
            <FieldError id="phone-error" message={errors.phone} />
          </div>
        </div>
      </div>

      <div className="space-y-6 border-t border-white/10 pt-8">
        <p className={groupHeadingClass}>Project Information</p>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <label htmlFor="projectType" className={labelClass}>
              Project Type *
            </label>
            <Select
              id="projectType"
              value={values.projectType}
              onChange={(v) => update('projectType', v)}
              groups={PROJECT_TYPE_GROUPS}
              placeholder="Select project type"
              invalid={Boolean(errors.projectType)}
              describedBy={errors.projectType ? 'projectType-error' : undefined}
              required
            />
            <FieldError id="projectType-error" message={errors.projectType} />
          </div>

          <div>
            <label htmlFor="quantity" className={labelClass}>
              Estimated Quantity *
            </label>
            <Select
              id="quantity"
              value={values.quantity}
              onChange={(v) => update('quantity', v)}
              groups={QUANTITY_GROUPS}
              placeholder="Select quantity"
              invalid={Boolean(errors.quantity)}
              describedBy={errors.quantity ? 'quantity-error' : undefined}
              required
            />
            <FieldError id="quantity-error" message={errors.quantity} />
          </div>
        </div>

        <div>
          <label htmlFor="productSlug" className={labelClass}>
            Product / Collection Interest
          </label>
          <Select
            id="productSlug"
            value={values.productSlug}
            onChange={(v) => update('productSlug', v)}
            groups={PRODUCT_GROUPS}
            placeholder="Select a product or collection"
          />

          {selection.kind === 'product' && selection.product && (
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: easeOut }}
              className="mt-3 flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3"
            >
              <div>
                <p className="text-[13.5px] text-cream-100">{selection.product.name}</p>
                <p className="mt-0.5 text-[11px] uppercase tracking-widest text-cream-200/45">
                  {selection.family?.label} · {selection.product.category}
                </p>
              </div>
              <span className="section-label !gap-0 text-[10px]">{selection.product.operation}</span>
            </motion.div>
          )}
        </div>

        <div>
          <label htmlFor="timeline" className={labelClass}>
            Preferred Timeline
          </label>
          <Select
            id="timeline"
            value={values.timeline}
            onChange={(v) => update('timeline', v)}
            groups={TIMELINE_GROUPS}
            placeholder="Select preferred timeline"
          />
        </div>
      </div>

      <div className="space-y-6 border-t border-white/10 pt-8">
        <p className={groupHeadingClass}>Project Details</p>

        <div>
          <label htmlFor="message" className={labelClass}>
            Tell us about your project
          </label>
          <textarea
            id="message"
            name="message"
            rows={5}
            placeholder="Tell us about the space, preferred configuration, finish direction, quantity, timeline or anything else we should know."
            value={values.message}
            onChange={(e) => update('message', e.target.value)}
            className={`${inputClass} resize-none`}
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={phase === 'submitting'}
        className="group btn-primary w-full justify-center disabled:cursor-wait disabled:opacity-70 sm:w-auto"
      >
        {phase === 'submitting' ? (
          <>
            <motion.span
              className="h-3.5 w-3.5 rounded-full border-[1.5px] border-ink-950/40 border-t-ink-950"
              animate={{ rotate: 360 }}
              transition={{ duration: 0.7, repeat: Infinity, ease: 'linear' }}
            />
            Preparing your enquiry
          </>
        ) : (
          <>
            Request Quote
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </>
        )}
      </button>
    </form>
  )
}
